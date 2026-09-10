import type { AccommodationUnavailablePeriodData } from "./accommodation-availability.types";

export const getCalendarMonth = (date: Date, offset: number) =>
  new Date(date.getFullYear(), date.getMonth() + offset, 1);

export const getCurrentCalendarMonth = (date = new Date()) =>
  new Date(date.getFullYear(), date.getMonth(), 1);

export const isSameCalendarMonth = (first: Date, second: Date) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth();

export const formatCalendarDateKey = (
  year: number,
  month: number,
  day: number,
) =>
  `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(
    2,
    "0",
  )}`;

export const isCalendarDateUnavailable = (
  date: string,
  periods: AccommodationUnavailablePeriodData[],
) => periods.some((period) => date >= period.start && date < period.end);

export const getCalendarMonthCells = (month: Date) => {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();

  const firstDay = new Date(year, monthIndex, 1);
  const firstWeekDay = (firstDay.getDay() + 6) % 7;

  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  const totalCells = Math.ceil((firstWeekDay + daysInMonth) / 7) * 7;

  return Array.from({ length: totalCells }, (_, index) => {
    const day = index - firstWeekDay + 1;

    return day >= 1 && day <= daysInMonth ? day : null;
  });
};

type GetCalendarDayStateOptions = {
  date: string;
  index: number;
  today: string;
  checkIn: string | null;
  checkOut: string | null;
  unavailablePeriods: AccommodationUnavailablePeriodData[];
  interactive: boolean;
};

export const getCalendarDayState = ({
  date,
  index,
  today,
  checkIn,
  checkOut,
  unavailablePeriods,
  interactive,
}: GetCalendarDayStateOptions) => {
  const unavailable = isCalendarDateUnavailable(date, unavailablePeriods);

  const isToday = date === today;
  const isPast = date < today;

  const isCheckIn = date === checkIn;
  const isCheckOut = date === checkOut;

  const isInSelectedRange =
    Boolean(checkIn) &&
    Boolean(checkOut) &&
    date > checkIn! &&
    date < checkOut!;

  const isSelectedRange = isCheckIn || isCheckOut || isInSelectedRange;

  const isFirstColumn = index % 7 === 0;
  const isLastColumn = index % 7 === 6;

  const selectable = interactive && !isPast && !unavailable;

  return {
    unavailable,
    isToday,
    isPast,
    isCheckIn,
    isCheckOut,
    isInSelectedRange,
    isSelectedRange,
    isFirstColumn,
    isLastColumn,
    selectable,
  };
};
