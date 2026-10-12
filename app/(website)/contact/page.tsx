import { ContactPageInteractive } from "@/components/features/contact/contact-page-interactive";
import { ContactPagePanel } from "@/components/features/contact/contact-page-panel";
import { ContactPageVisual } from "@/components/features/contact/contact-page-visual";
import { getContactPageAccommodations } from "@/lib/contact/queries/get-contact-page-accommodations";
import { getContactPageContent } from "@/lib/contact/queries/get-contact-page-content";
import { createPageMetadata } from "@/lib/seo/create-page-metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Une question sur un logement, une réservation ou votre séjour ? Contactez Évasion et obtenez les informations dont vous avez besoin.",
  path: "/contact",
});

export default async function ContactPage() {
  const [content, accommodations] = await Promise.all([
    getContactPageContent(),
    getContactPageAccommodations(),
  ]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="grid min-h-115 bg-background text-foreground lg:h-svh lg:min-h-0 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:grid-cols-[minmax(450px,0.92fr)_minmax(620px,1.08fr)]">
        <ContactPageVisual
          eyebrow={content.eyebrow}
          handwritten={content.handwritten}
          title={content.title}
          description={content.description}
          reassuranceFirstLabel={content.reassuranceFirstLabel}
          reassuranceSecondLabel={content.reassuranceSecondLabel}
          reassuranceThirdLabel={content.reassuranceThirdLabel}
          variant="page"
          animated
        />

        <ContactPagePanel variant="page" animated>
          <ContactPageInteractive
            content={content}
            accommodations={accommodations}
            animated
          />
        </ContactPagePanel>
      </section>
    </main>
  );
}
