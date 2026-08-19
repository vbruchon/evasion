import { PageHero } from "@/components/layout/page-hero";
import { AccommodationsSection } from "@/components/features/accommodations/accommodations-section";
import { ContactCta } from "@/components/layout/contact-cta";
import { getPublishedAccommodations } from "@/lib/accommodations";

export default async function AccommodationsPage() {
  const accommodations = await getPublishedAccommodations();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <PageHero
        title="Nos logements"
        description="Des lieux singuliers et intimistes, imaginés pour vous offrir une véritable parenthèse à deux."
      />
      <AccommodationsSection accommodations={accommodations} />

      <ContactCta />
    </main>
  );
}
