import { notFound } from "next/navigation";

import { AccommodationHero } from "@/components/features/accommodations/slug/accommodation-hero";
import { AccommodationPresentation } from "@/components/features/accommodations/slug/accommodation-presentation";
import { AccommodationGallery } from "@/components/features/accommodations/slug/accommodation-gallery";
import { getPublishedAccommodationBySlug } from "@/lib/accommodations/accommodations";
import { getAccommodationDisplayImages } from "@/lib/accommodations/accommodation-images";

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
        hasGallery={galleryImages.length > 0}
      />

      <AccommodationPresentation
        accommodation={accommodation}
        image={presentationImage}
      />

      <AccommodationGallery
        accommodationName={accommodation.name}
        images={galleryImages}
      />
    </main>
  );
}
