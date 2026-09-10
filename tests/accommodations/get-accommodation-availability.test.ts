import { afterEach, describe, expect, it, vi } from "vitest";

import { getAccommodationAvailability } from "@/lib/accommodations/availability/get-accommodation-availability";

describe("getAccommodationAvailability", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches and parses the unavailable periods", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Evasion//Test//FR
BEGIN:VEVENT
UID:reservation-1@test
DTSTART;VALUE=DATE:20260912
DTEND;VALUE=DATE:20260915
SUMMARY:Reserved
END:VEVENT
END:VCALENDAR
`,
        {
          status: 200,
        },
      ),
    );

    const periods = await getAccommodationAvailability(
      "https://example.com/calendar.ics",
    );

    expect(periods).toEqual([
      {
        start: new Date("2026-09-12T00:00:00.000Z"),
        end: new Date("2026-09-15T00:00:00.000Z"),
      },
    ]);
  });

  it("propagates an error when the calendar cannot be fetched", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("Not found", {
        status: 404,
      }),
    );

    await expect(
      getAccommodationAvailability("https://example.com/calendar.ics"),
    ).rejects.toThrow(
      "Impossible de récupérer le calendrier iCal du logement.",
    );
  });

  it("propagates an error when the calendar content is invalid", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("invalid calendar", {
        status: 200,
      }),
    );

    await expect(
      getAccommodationAvailability("https://example.com/calendar.ics"),
    ).rejects.toThrow("Le calendrier iCal est invalide.");
  });
});
