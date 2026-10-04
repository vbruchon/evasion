import { AccommodationsPageHero } from "@/components/features/accommodations/list/accommodations-page-hero";
import { AccommodationsSection } from "@/components/features/accommodations/list/accommodations-section";
import { getPublishedAccommodations } from "@/lib/accommodations/accommodations";
import { getAccommodationsPageContent } from "@/lib/accommodations-page/queries/get-accommodations-page-content";
import { AccommodationsContactCta } from "@/components/features/accommodations/list/accommodations-contact-cta";

export default async function AccommodationsPage() {
  const [content, accommodations] = await Promise.all([
    getAccommodationsPageContent(),
    getPublishedAccommodations(),
  ]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <AccommodationsPageHero
        eyebrow={content.heroEyebrow}
        title={content.heroTitle}
        description={content.heroDescription}
        imageUrl={content.heroImageUrl}
        animated
      />

      <AccommodationsSection accommodations={accommodations} />

      <AccommodationsContactCta
        eyebrow={content.ctaEyebrow}
        title={content.ctaTitle}
        buttonLabel={content.ctaButtonLabel}
        imageUrl={content.ctaImageUrl}
        animated
      />
    </main>
  );
}
