import { notFound } from "next/navigation";

import { getAccommodationAvailability } from "@/lib/accommodations/availability/get-accommodation-availability";
import { serializeAccommodationUnavailablePeriods } from "@/lib/accommodations/availability/serialize-accommodation-unavailable-periods";
import { getAccommodationDisplayImages } from "@/lib/accommodations/accommodation-images";
import { getPublishedAccommodationBySlug } from "@/lib/accommodations/accommodations";
import type { AccommodationUnavailablePeriodData } from "@/lib/accommodations/availability/accommodation-availability.types";

import { AccommodationAmenities } from "@/components/features/accommodations/slug/amenities/accommodation-amenities";
import { AccommodationAvailability } from "@/components/features/accommodations/slug/availability/accommodation-availability";
import { AccommodationGallery } from "@/components/features/accommodations/slug/accommodation-gallery";
import { AccommodationHero } from "@/components/features/accommodations/slug/accommodation-hero";
import { AccommodationLocation } from "@/components/features/accommodations/slug/accommodation-location";
import { AccommodationPresentation } from "@/components/features/accommodations/slug/accommodation-presentation";

type AccommodationPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function AccommodationPage({
  params,
}: AccommodationPageProps) {
  const { slug } = await params;

  const accommodation = await getPublishedAccommodationBySlug(slug);

  if (!accommodation) {
    notFound();
  }

  const { coverImage, galleryImages, presentationImage } =
    getAccommodationDisplayImages(accommodation.images);

  const hasAvailabilityCalendar = Boolean(
    accommodation.availabilityCalendarUrl,
  );

  let unavailablePeriods: AccommodationUnavailablePeriodData[] = [];
  let availabilityError: string | null = null;

  if (accommodation.availabilityCalendarUrl) {
    try {
      const periods = await getAccommodationAvailability(
        accommodation.availabilityCalendarUrl,
      );

      unavailablePeriods = serializeAccommodationUnavailablePeriods(periods);
    } catch {
      availabilityError =
        "Impossible de récupérer les disponibilités du logement.";
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <AccommodationHero
        accommodation={accommodation}
        coverImage={coverImage}
        hasGallery={accommodation.images.length > 0}
        highlights={accommodation.highlights}
      />

      <AccommodationPresentation
        accommodation={accommodation}
        image={presentationImage}
      />

      <AccommodationAmenities amenities={accommodation.amenities} />

      <AccommodationLocation
        accommodation={accommodation}
        accesses={accommodation.accesses}
      />

      <AccommodationAvailability
        unavailablePeriods={unavailablePeriods}
        hasCalendar={hasAvailabilityCalendar}
        bookingUrl={accommodation.bookingUrl}
        availabilityTitle={accommodation.availabilityTitle}
        availabilityDescription={accommodation.availabilityDescription}
        bookingButtonLabel={accommodation.bookingButtonLabel}
        error={availabilityError}
      />

      <AccommodationGallery
        accommodationName={accommodation.name}
        images={galleryImages}
      />
    </main>
  );
}
