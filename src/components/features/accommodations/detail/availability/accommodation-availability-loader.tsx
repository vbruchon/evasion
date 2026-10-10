import { AccommodationAvailability } from "@/components/features/accommodations/detail/availability/accommodation-availability";
import type { AccommodationUnavailablePeriodData } from "@/lib/accommodations/availability/accommodation-availability.types";
import { getAccommodationAvailability } from "@/lib/accommodations/availability/get-accommodation-availability";
import { serializeAccommodationUnavailablePeriods } from "@/lib/accommodations/availability/serialize-accommodation-unavailable-periods";

type AccommodationAvailabilityLoaderProps = {
  calendarUrl: string;
  availabilityTitle: string;
  availabilityDescription: string;
  bookingButtonLabel: string;
  bookingUrl?: string | null;
  animated?: boolean;
};

export const AccommodationAvailabilityLoader = async ({
  calendarUrl,
  availabilityTitle,
  availabilityDescription,
  bookingButtonLabel,
  bookingUrl = null,
  animated = false,
}: AccommodationAvailabilityLoaderProps) => {
  let unavailablePeriods: AccommodationUnavailablePeriodData[] = [];
  let error: string | null = null;

  try {
    const periods = await getAccommodationAvailability(calendarUrl);

    unavailablePeriods = serializeAccommodationUnavailablePeriods(periods);
  } catch {
    error = "Impossible de récupérer les disponibilités du logement.";
  }

  return (
    <AccommodationAvailability
      unavailablePeriods={unavailablePeriods}
      hasCalendar
      availabilityTitle={availabilityTitle}
      availabilityDescription={availabilityDescription}
      bookingButtonLabel={bookingButtonLabel}
      bookingUrl={bookingUrl}
      error={error}
      animated={animated}
    />
  );
};
