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

const isAirbnbBookingUrl = (bookingUrl: string) => {
  try {
    const hostname = new URL(bookingUrl).hostname.toLowerCase();

    return (
      hostname === "airbnb.com" ||
      hostname.endsWith(".airbnb.com") ||
      hostname === "airbnb.fr" ||
      hostname.endsWith(".airbnb.fr")
    );
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

    if (url.protocol !== "https:" || url.username || url.password) {
      return null;
    }

    if (isAirbnbBookingUrl(bookingUrl)) {
      url.searchParams.set("check_in", checkIn);
      url.searchParams.set("check_out", checkOut);
      url.searchParams.set("adults", "2");
    }

    return url.toString();
  } catch {
    return null;
  }
};
