import { AccommodationsPageHero } from "@/components/features/accommodations/list/accommodations-page-hero";
import { AccommodationsSection } from "@/components/features/accommodations/list/accommodations-section";
import { getPublishedAccommodations } from "@/lib/accommodations/accommodations";
import { getAccommodationsPageContent } from "@/lib/accommodations-page/queries/get-accommodations-page-content";
import { AccommodationsContactCta } from "@/components/features/accommodations/list/accommodations-contact-cta";
import { createPageMetadata } from "@/lib/seo/create-page-metadata";

export const metadata = createPageMetadata({
  title: "Nos logements en Drôme et Vercors",
  description:
    "Découvrez les hébergements Évasion : des lieux singuliers et intimistes en Drôme et Vercors, pensés pour une parenthèse à deux.",
  path: "/logements",
});

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
