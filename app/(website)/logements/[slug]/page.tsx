import { notFound } from "next/navigation";

import { AccommodationAmenities } from "@/components/features/accommodations/slug/accommodation-amenities";
import { AccommodationGallery } from "@/components/features/accommodations/slug/accommodation-gallery";
import { AccommodationHero } from "@/components/features/accommodations/slug/accommodation-hero";
import { AccommodationPresentation } from "@/components/features/accommodations/slug/accommodation-presentation";

import { getAccommodationDisplayImages } from "@/lib/accommodations/accommodation-images";
import { getPublishedAccommodationBySlug } from "@/lib/accommodations/accommodations";

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

      <AccommodationGallery
        accommodationName={accommodation.name}
        images={galleryImages}
      />
    </main>
  );
}
