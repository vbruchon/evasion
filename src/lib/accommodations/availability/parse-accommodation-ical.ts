import ICAL from "ical.js";

import type { AccommodationUnavailablePeriod } from "./accommodation-availability.types";

const INVALID_CALENDAR_MESSAGE = "Le calendrier iCal est invalide.";

const INVALID_EVENT_MESSAGE =
  "Le calendrier iCal contient une période de disponibilité invalide.";

const UNSUPPORTED_DATE_MESSAGE =
  "Le calendrier iCal doit contenir des périodes définies par dates entières.";

const toUtcDate = ({
  year,
  month,
  day,
}: {
  year: number;
  month: number;
  day: number;
}) => new Date(Date.UTC(year, month - 1, day));

export const parseAccommodationIcal = (
  content: string,
): AccommodationUnavailablePeriod[] => {
  if (!content.trim()) {
    throw new Error(INVALID_CALENDAR_MESSAGE);
  }

  let calendar: ICAL.Component;

  try {
    calendar = new ICAL.Component(ICAL.parse(content));
  } catch {
    throw new Error(INVALID_CALENDAR_MESSAGE);
  }

  if (calendar.name !== "vcalendar") {
    throw new Error(INVALID_CALENDAR_MESSAGE);
  }

  const periods = calendar.getAllSubcomponents("vevent").map((component) => {
    const event = new ICAL.Event(component);

    const startDate = event.startDate;
    const endDate = event.endDate;

    if (!startDate || !endDate) {
      throw new Error(INVALID_EVENT_MESSAGE);
    }

    if (!startDate.isDate || !endDate.isDate) {
      throw new Error(UNSUPPORTED_DATE_MESSAGE);
    }

    const start = toUtcDate(startDate);
    const end = toUtcDate(endDate);

    if (end.getTime() <= start.getTime()) {
      throw new Error(INVALID_EVENT_MESSAGE);
    }

    return {
      start,
      end,
    };
  });

  return periods.sort(
    (first, second) => first.start.getTime() - second.start.getTime(),
  );
};
