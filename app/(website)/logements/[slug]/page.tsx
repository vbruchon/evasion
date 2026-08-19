import { notFound } from "next/navigation";

import { AccommodationHero } from "@/components/features/accommodations/slug/accommodation-hero";
import { AccommodationPresentation } from "@/components/features/accommodations/slug/accommodation-presentation";
import { AccommodationGallery } from "@/components/features/accommodations/slug/accommodation-gallery";
import { getPublishedAccommodationBySlug } from "@/lib/accommodations";

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

  const coverImage =
    accommodation.images.find((image) => image.isCover) ??
    accommodation.images[0];

  const galleryImages = accommodation.images.filter(
    (image) => image.id !== coverImage?.id,
  );

  const presentationImage = galleryImages[0] ?? coverImage;

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
