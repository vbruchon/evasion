import type { AccommodationUnavailablePeriodData } from "../availability/accommodation-availability.types";

export const isAccommodationBookingRangeAvailable = (
  checkIn: string,
  checkOut: string,
  unavailablePeriods: AccommodationUnavailablePeriodData[],
) => {
  if (checkOut <= checkIn) {
    return false;
  }

  return !unavailablePeriods.some(
    (period) => period.start < checkOut && period.end > checkIn,
  );
};

export const getAccommodationBookingNights = (
  checkIn: string,
  checkOut: string,
) => {
  const start = new Date(`${checkIn}T00:00:00Z`);
  const end = new Date(`${checkOut}T00:00:00Z`);

  return Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
};

export const isAirbnbBookingUrl = (bookingUrl: string) => {
  try {
    const url = new URL(bookingUrl);

    return url.hostname.toLowerCase().includes("airbnb.");
  } catch {
    return false;
  }
};

export const buildAccommodationBookingUrl = (
  bookingUrl: string,
  checkIn: string,
  checkOut: string,
) => {
  try {
    const url = new URL(bookingUrl);

    if (!["http:", "https:"].includes(url.protocol)) {
      return null;
    }

    if (isAirbnbBookingUrl(bookingUrl)) {
      url.searchParams.set("check_in", checkIn);
      url.searchParams.set("check_out", checkOut);
    }

    return url.toString();
  } catch {
    return null;
  }
};
