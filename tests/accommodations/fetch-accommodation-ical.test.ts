import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { lookupMock } = vi.hoisted(() => ({
  lookupMock: vi.fn(),
}));

vi.mock("node:dns/promises", () => ({
  lookup: lookupMock,
}));

import { fetchAccommodationIcal } from "@/lib/accommodations/availability/fetch-accommodation-ical";

const ICAL_CONTENT = `
BEGIN:VCALENDAR
VERSION:2.0
END:VCALENDAR
`;

describe("fetchAccommodationIcal", () => {
  beforeEach(() => {
    vi.stubEnv("VERCEL_URL", "");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "");

    lookupMock.mockResolvedValue([
      {
        address: "93.184.216.34",
        family: 4,
      },
    ]);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
    lookupMock.mockReset();
  });

  it("returns the iCal content when a safe HTTPS request succeeds", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(ICAL_CONTENT, {
        status: 200,
      }),
    );

    await expect(
      fetchAccommodationIcal(
        "https://www.airbnb.com/calendar/ical/123456789.ics?s=test-secret",
      ),
    ).resolves.toBe(ICAL_CONTENT);

    expect(lookupMock).toHaveBeenCalledWith("www.airbnb.com", {
      all: true,
      verbatim: true,
    });

    expect(fetchMock).toHaveBeenCalledWith(
      new URL(
        "https://www.airbnb.com/calendar/ical/123456789.ics?s=test-secret",
      ),
      expect.objectContaining({
        redirect: "manual",
        signal: expect.any(AbortSignal),
        next: {
          revalidate: 300,
        },
      }),
    );
  });

  it("resolves an allowed demo calendar URL against the local site", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(ICAL_CONTENT, {
        status: 200,
      }),
    );

    await expect(
      fetchAccommodationIcal("/api/demo-calendars/cabane.ics"),
    ).resolves.toBe(ICAL_CONTENT);

    expect(lookupMock).not.toHaveBeenCalled();

    expect(fetchMock).toHaveBeenCalledWith(
      new URL("http://localhost:3000/api/demo-calendars/cabane.ics"),
      expect.objectContaining({
        redirect: "manual",
        signal: expect.any(AbortSignal),
        next: {
          revalidate: 300,
        },
      }),
    );
  });

  it("rejects an arbitrary internal relative URL", async () => {
    await expect(fetchAccommodationIcal("/admin")).rejects.toThrow(
      "Le lien du calendrier iCal est invalide.",
    );
  });

  it("rejects protocol-relative URLs", async () => {
    await expect(
      fetchAccommodationIcal("//example.com/calendar.ics"),
    ).rejects.toThrow("Le lien du calendrier iCal est invalide.");
  });

  it("rejects an invalid URL", async () => {
    await expect(fetchAccommodationIcal("not-a-url")).rejects.toThrow(
      "Le lien du calendrier iCal est invalide.",
    );
  });

  it("rejects HTTP external calendars", async () => {
    await expect(
      fetchAccommodationIcal("http://example.com/calendar.ics"),
    ).rejects.toThrow("Le lien du calendrier iCal est invalide.");
  });

  it("rejects unsupported URL protocols", async () => {
    await expect(
      fetchAccommodationIcal("file:///tmp/calendar.ics"),
    ).rejects.toThrow("Le lien du calendrier iCal est invalide.");
  });

  it("rejects URLs containing credentials", async () => {
    await expect(
      fetchAccommodationIcal("https://admin:secret@example.com/calendar.ics"),
    ).rejects.toThrow("Le lien du calendrier iCal est invalide.");
  });

  it("rejects localhost", async () => {
    await expect(
      fetchAccommodationIcal("https://localhost/calendar.ics"),
    ).rejects.toThrow("Le lien du calendrier iCal est invalide.");
  });

  it("rejects a private IPv4 address", async () => {
    await expect(
      fetchAccommodationIcal("https://127.0.0.1/calendar.ics"),
    ).rejects.toThrow("Le lien du calendrier iCal est invalide.");
  });

  it("rejects a hostname resolving to a private address", async () => {
    lookupMock.mockResolvedValue([
      {
        address: "10.0.0.12",
        family: 4,
      },
    ]);

    const fetchMock = vi.spyOn(globalThis, "fetch");

    await expect(
      fetchAccommodationIcal("https://example.com/calendar.ics"),
    ).rejects.toThrow("Le lien du calendrier iCal est invalide.");

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("validates every external redirect before following it", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(
        new Response(null, {
          status: 302,
          headers: {
            location: "https://calendar.example.com/final.ics",
          },
        }),
      )
      .mockResolvedValueOnce(
        new Response(ICAL_CONTENT, {
          status: 200,
        }),
      );

    await expect(
      fetchAccommodationIcal("https://example.com/calendar.ics"),
    ).resolves.toBe(ICAL_CONTENT);

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(lookupMock).toHaveBeenCalledTimes(2);
  });

  it("rejects a redirect to a private address", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(null, {
        status: 302,
        headers: {
          location: "https://127.0.0.1/private.ics",
        },
      }),
    );

    await expect(
      fetchAccommodationIcal("https://example.com/calendar.ics"),
    ).rejects.toThrow("Le lien du calendrier iCal est invalide.");

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("rejects too many redirects", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(null, {
        status: 302,
        headers: {
          location: "/next.ics",
        },
      }),
    );

    await expect(
      fetchAccommodationIcal("https://example.com/calendar.ics"),
    ).rejects.toThrow(
      "Impossible de récupérer le calendrier iCal du logement.",
    );

    expect(globalThis.fetch).toHaveBeenCalledTimes(4);
  });

  it("rejects redirects from internal demo calendars", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(null, {
        status: 302,
        headers: {
          location: "/admin",
        },
      }),
    );

    await expect(
      fetchAccommodationIcal("/api/demo-calendars/cabane.ics"),
    ).rejects.toThrow(
      "Impossible de récupérer le calendrier iCal du logement.",
    );
  });

  it("rejects a failed HTTP response", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("Not found", {
        status: 404,
      }),
    );

    await expect(
      fetchAccommodationIcal("https://example.com/calendar.ics"),
    ).rejects.toThrow(
      "Impossible de récupérer le calendrier iCal du logement.",
    );
  });

  it("rejects a network error", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("Network error"));

    await expect(
      fetchAccommodationIcal("https://example.com/calendar.ics"),
    ).rejects.toThrow(
      "Impossible de récupérer le calendrier iCal du logement.",
    );
  });

  it("rejects an empty response", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("   ", {
        status: 200,
      }),
    );

    await expect(
      fetchAccommodationIcal("https://example.com/calendar.ics"),
    ).rejects.toThrow(
      "Impossible de récupérer le calendrier iCal du logement.",
    );
  });

  it("rejects a response larger than the allowed limit", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("a".repeat(1024 * 1024 + 1), {
        status: 200,
      }),
    );

    await expect(
      fetchAccommodationIcal("https://example.com/calendar.ics"),
    ).rejects.toThrow(
      "Impossible de récupérer le calendrier iCal du logement.",
    );
  });

  it("rejects an oversized declared content length", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(ICAL_CONTENT, {
        status: 200,
        headers: {
          "content-length": String(1024 * 1024 + 1),
        },
      }),
    );

    await expect(
      fetchAccommodationIcal("https://example.com/calendar.ics"),
    ).rejects.toThrow(
      "Impossible de récupérer le calendrier iCal du logement.",
    );
  });

  it("rejects a private IPv6 address", async () => {
    await expect(
      fetchAccommodationIcal("https://[::1]/calendar.ics"),
    ).rejects.toThrow("Le lien du calendrier iCal est invalide.");
  });

  it("rejects an IPv4-mapped IPv6 address", async () => {
    await expect(
      fetchAccommodationIcal("https://[::ffff:127.0.0.1]/calendar.ics"),
    ).rejects.toThrow("Le lien du calendrier iCal est invalide.");
  });
});
