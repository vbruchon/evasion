import { getAccommodationAvailability } from "@/lib/accommodations/availability/get-accommodation-availability";
import { serializeAccommodationUnavailablePeriods } from "@/lib/accommodations/availability/serialize-accommodation-unavailable-periods";

export const checkAccommodationAvailabilityCalendarAdmin = async (
  calendarUrl: string,
) => {
  try {
    const unavailablePeriods = await getAccommodationAvailability(
      calendarUrl.trim(),
    );

    return {
      success: true as const,
      unavailablePeriods:
        serializeAccommodationUnavailablePeriods(unavailablePeriods),
    };
  } catch (error) {
    return {
      success: false as const,
      message:
        error instanceof Error
          ? error.message
          : "Impossible de vérifier le calendrier iCal.",
    };
  }
};
