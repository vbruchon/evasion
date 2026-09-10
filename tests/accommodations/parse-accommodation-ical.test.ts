import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { parseAccommodationIcal } from "@/lib/accommodations/availability/parse-accommodation-ical";

const airbnbCalendarFixture = readFileSync(
  new URL(
    "../helpers/fixtures/accommodations/availability/airbnb-calendar.ics",
    import.meta.url,
  ),
  "utf8",
);

describe("parseAccommodationIcal", () => {
  it("parses unavailable periods from an Airbnb calendar", () => {
    const periods = parseAccommodationIcal(airbnbCalendarFixture);

    expect(periods).toEqual([
      {
        start: new Date("2026-09-12T00:00:00.000Z"),
        end: new Date("2026-09-15T00:00:00.000Z"),
      },
      {
        start: new Date("2026-09-21T00:00:00.000Z"),
        end: new Date("2026-09-23T00:00:00.000Z"),
      },
      {
        start: new Date("2026-09-29T00:00:00.000Z"),
        end: new Date("2026-10-03T00:00:00.000Z"),
      },
    ]);
  });

  it("keeps DTEND as the exclusive end of the unavailable period", () => {
    const periods = parseAccommodationIcal(`
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
`);

    expect(periods).toEqual([
      {
        start: new Date("2026-09-12T00:00:00.000Z"),
        end: new Date("2026-09-15T00:00:00.000Z"),
      },
    ]);
  });

  it("sorts unavailable periods chronologically", () => {
    const periods = parseAccommodationIcal(`
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Evasion//Test//FR
BEGIN:VEVENT
UID:reservation-2@test
DTSTART;VALUE=DATE:20261010
DTEND;VALUE=DATE:20261012
SUMMARY:Reserved
END:VEVENT
BEGIN:VEVENT
UID:reservation-1@test
DTSTART;VALUE=DATE:20260920
DTEND;VALUE=DATE:20260922
SUMMARY:Reserved
END:VEVENT
END:VCALENDAR
`);

    expect(periods.map((period) => period.start.toISOString())).toEqual([
      "2026-09-20T00:00:00.000Z",
      "2026-10-10T00:00:00.000Z",
    ]);
  });

  it("returns an empty list when the calendar contains no event", () => {
    const periods = parseAccommodationIcal(`
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Evasion//Test//FR
END:VCALENDAR
`);

    expect(periods).toEqual([]);
  });

  it("rejects an invalid iCal calendar", () => {
    expect(() => parseAccommodationIcal("invalid calendar")).toThrow(
      "Le calendrier iCal est invalide.",
    );
  });

  it("rejects date-time events", () => {
    expect(() =>
      parseAccommodationIcal(`
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Evasion//Test//FR
BEGIN:VEVENT
UID:reservation-1@test
DTSTART:20260912T140000Z
DTEND:20260915T100000Z
SUMMARY:Reserved
END:VEVENT
END:VCALENDAR
`),
    ).toThrow(
      "Le calendrier iCal doit contenir des périodes définies par dates entières.",
    );
  });

  it("rejects a period whose end is not after its start", () => {
    expect(() =>
      parseAccommodationIcal(`
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Evasion//Test//FR
BEGIN:VEVENT
UID:reservation-1@test
DTSTART;VALUE=DATE:20260915
DTEND;VALUE=DATE:20260912
SUMMARY:Reserved
END:VEVENT
END:VCALENDAR
`),
    ).toThrow(
      "Le calendrier iCal contient une période de disponibilité invalide.",
    );
  });
});
