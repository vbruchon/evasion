import type { AccommodationUnavailablePeriod } from "./accommodation-availability.types";
import { fetchAccommodationIcal } from "./fetch-accommodation-ical";
import { parseAccommodationIcal } from "./parse-accommodation-ical";

export const getAccommodationAvailability = async (
  calendarUrl: string,
): Promise<AccommodationUnavailablePeriod[]> => {
  const content = await fetchAccommodationIcal(calendarUrl);

  return parseAccommodationIcal(content);
};
