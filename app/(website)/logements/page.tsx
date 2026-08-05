import { prisma } from "@/lib/prisma";
import { PageHero } from "@/components/layout/page-hero";
import { AccommodationsSection } from "@/components/features/accomodations/accommodations-section";
import { ContactCta } from "@/components/layout/contact-cta";

export default async function AccommodationsPage() {
  const accommodations = await prisma.accommodation.findMany({
    where: {
      status: "PUBLISHED",
    },
    orderBy: {
      position: "asc",
    },
    include: {
      images: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });

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
