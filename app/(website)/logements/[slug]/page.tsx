import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { AccommodationAmenities } from "@/components/features/accommodations/detail/amenities/accommodation-amenities";
import { AccommodationAvailability } from "@/components/features/accommodations/detail/availability/accommodation-availability";
import { AccommodationGallery } from "@/components/features/accommodations/detail/gallery/accommodation-gallery";
import { AccommodationHero } from "@/components/features/accommodations/detail/hero/accommodation-hero";
import { AccommodationLocation } from "@/components/features/accommodations/detail/location/accommodation-location";
import { AccommodationPresentation } from "@/components/features/accommodations/detail/accommodation-presentation";
import { AccommodationReviews } from "@/components/features/accommodations/detail/reviews/accommodation-reviews";
import { getAccommodationDisplayImages } from "@/lib/accommodations/accommodation-images";
import { getPublishedAccommodationBySlug } from "@/lib/accommodations/accommodations";
import { createPageMetadata } from "@/lib/seo/create-page-metadata";
import { AccommodationAvailabilityLoader } from "@/components/features/accommodations/detail/availability/accommodation-availability-loader";
type AccommodationPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const getAccommodationMetadataDescription = (accommodation: {
  name: string;
  shortDescription: string | null;
  subtitle: string | null;
}) =>
  accommodation.shortDescription?.trim() ||
  accommodation.subtitle?.trim() ||
  `Découvrez ${accommodation.name}, un hébergement Évasion pensé pour une parenthèse à deux.`;

export const generateMetadata = async ({
  params,
}: AccommodationPageProps): Promise<Metadata> => {
  const { slug } = await params;

  const accommodation = await getPublishedAccommodationBySlug(slug);

  if (!accommodation) {
    return {
      title: "Logement introuvable",

      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const { coverImage } = getAccommodationDisplayImages(accommodation.images);

  const title = accommodation.type?.trim()
    ? `${accommodation.name} — ${accommodation.type}`
    : accommodation.name;

  return createPageMetadata({
    title,
    description: getAccommodationMetadataDescription(accommodation),
    path: `/logements/${accommodation.slug}`,
    image: coverImage?.url,
  });
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

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <AccommodationHero
        accommodation={accommodation}
        coverImage={coverImage}
        hasGallery={accommodation.images.length > 0}
        highlights={accommodation.highlights}
        animated
      />

      <AccommodationPresentation
        accommodation={accommodation}
        image={presentationImage}
        animated
      />

      <AccommodationAmenities amenities={accommodation.amenities} animated />

      <AccommodationLocation
        accommodation={accommodation}
        accesses={accommodation.accesses}
        animated
      />

      {accommodation.availabilityCalendarUrl ? (
        <Suspense
          fallback={
            <AccommodationAvailability
              unavailablePeriods={[]}
              hasCalendar
              availabilityTitle={accommodation.availabilityTitle}
              availabilityDescription={accommodation.availabilityDescription}
              bookingButtonLabel={accommodation.bookingButtonLabel}
              bookingUrl={accommodation.bookingUrl}
              loading
            />
          }
        >
          <AccommodationAvailabilityLoader
            calendarUrl={accommodation.availabilityCalendarUrl}
            availabilityTitle={accommodation.availabilityTitle}
            availabilityDescription={accommodation.availabilityDescription}
            bookingButtonLabel={accommodation.bookingButtonLabel}
            bookingUrl={accommodation.bookingUrl}
            animated
          />
        </Suspense>
      ) : null}

      <AccommodationReviews
        reviews={accommodation.reviews}
        title={accommodation.reviewsTitle}
        description={accommodation.reviewsDescription}
        animated
      />

      <AccommodationGallery
        accommodationName={accommodation.name}
        images={galleryImages}
        animated
      />
    </main>
  );
}
