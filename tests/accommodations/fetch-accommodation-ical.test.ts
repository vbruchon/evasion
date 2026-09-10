import { afterEach, describe, expect, it, vi } from "vitest";

import { fetchAccommodationIcal } from "@/lib/accommodations/availability/fetch-accommodation-ical";

describe("fetchAccommodationIcal", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns the iCal content when the request succeeds", async () => {
    const content = `
BEGIN:VCALENDAR
VERSION:2.0
END:VCALENDAR
`;

    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(content, {
        status: 200,
      }),
    );

    await expect(
      fetchAccommodationIcal(
        "https://www.airbnb.com/calendar/ical/123456789.ics?s=test-secret",
      ),
    ).resolves.toBe(content);

    expect(fetchMock).toHaveBeenCalledWith(
      new URL(
        "https://www.airbnb.com/calendar/ical/123456789.ics?s=test-secret",
      ),
      {
        next: {
          revalidate: 300,
        },
      },
    );
  });

  it("rejects an invalid URL", async () => {
    await expect(fetchAccommodationIcal("not-a-url")).rejects.toThrow(
      "Le lien du calendrier iCal est invalide.",
    );
  });

  it("rejects unsupported URL protocols", async () => {
    await expect(
      fetchAccommodationIcal("file:///tmp/calendar.ics"),
    ).rejects.toThrow("Le lien du calendrier iCal est invalide.");
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
});
