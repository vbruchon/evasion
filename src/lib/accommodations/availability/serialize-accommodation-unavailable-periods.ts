import type {
  AccommodationUnavailablePeriod,
  AccommodationUnavailablePeriodData,
} from "./accommodation-availability.types";

export const serializeAccommodationUnavailablePeriods = (
  periods: AccommodationUnavailablePeriod[],
): AccommodationUnavailablePeriodData[] =>
  periods.map((period) => ({
    start: period.start.toISOString().slice(0, 10),
    end: period.end.toISOString().slice(0, 10),
  }));
