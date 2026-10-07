const DAY_IN_MS = 24 * 60 * 60 * 1000;

type DemoReservation = {
  offsetDays: number;
  nights: number;
};

type DemoCalendar = {
  name: string;
  reservations: DemoReservation[];
};

const demoCalendars: Record<string, DemoCalendar> = {
  "cabane.ics": {
    name: "La Cabane",
    reservations: [
      { offsetDays: 4, nights: 3 },
      { offsetDays: 13, nights: 2 },
      { offsetDays: 24, nights: 3 },
      { offsetDays: 39, nights: 2 },
      { offsetDays: 58, nights: 3 },
      { offsetDays: 84, nights: 2 },
    ],
  },

  "chalet.ics": {
    name: "Le Chalet",
    reservations: [
      { offsetDays: 6, nights: 3 },
      { offsetDays: 17, nights: 3 },
      { offsetDays: 31, nights: 2 },
      { offsetDays: 48, nights: 4 },
      { offsetDays: 67, nights: 3 },
      { offsetDays: 92, nights: 3 },
    ],
  },

  "bergerie.ics": {
    name: "La Bergerie",
    reservations: [
      { offsetDays: 3, nights: 2 },
      { offsetDays: 11, nights: 3 },
      { offsetDays: 27, nights: 4 },
      { offsetDays: 44, nights: 2 },
      { offsetDays: 63, nights: 3 },
      { offsetDays: 88, nights: 3 },
    ],
  },

  "belvedere.ics": {
    name: "Le Belvédère",
    reservations: [
      { offsetDays: 5, nights: 2 },
      { offsetDays: 15, nights: 3 },
      { offsetDays: 29, nights: 2 },
      { offsetDays: 42, nights: 3 },
      { offsetDays: 61, nights: 2 },
      { offsetDays: 81, nights: 4 },
    ],
  },
};

const getUtcDay = (date: Date) =>
  new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );

const addDays = (date: Date, days: number) =>
  new Date(date.getTime() + days * DAY_IN_MS);

const formatIcalDate = (date: Date) => {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}${month}${day}`;
};

export const getDemoAccommodationIcal = (
  filename: string,
  now = new Date(),
): string | null => {
  const calendar = demoCalendars[filename];

  if (!calendar) {
    return null;
  }

  const today = getUtcDay(now);

  const events = calendar.reservations.flatMap(
    ({ offsetDays, nights }, index) => {
      const start = addDays(today, offsetDays);
      const end = addDays(start, nights);

      return [
        "BEGIN:VEVENT",
        `UID:${filename}-${index}-${formatIcalDate(start)}@evasion.demo`,
        `DTSTART;VALUE=DATE:${formatIcalDate(start)}`,
        `DTEND;VALUE=DATE:${formatIcalDate(end)}`,
        `SUMMARY:Réservé — ${calendar.name}`,
        "END:VEVENT",
      ];
    },
  );

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Evasion Demo//Availability//FR",
    "CALSCALE:GREGORIAN",
    ...events,
    "END:VCALENDAR",
    "",
  ].join("\r\n");
};
