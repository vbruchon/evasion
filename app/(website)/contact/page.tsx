import { ContactPageInteractive } from "@/components/features/contact/contact-page-interactive";
import { ContactPagePanel } from "@/components/features/contact/contact-page-panel";
import { ContactPageVisual } from "@/components/features/contact/contact-page-visual";
import { getContactPageAccommodations } from "@/lib/contact/queries/get-contact-page-accommodations";
import { getContactPageContent } from "@/lib/contact/queries/get-contact-page-content";

export const dynamic = "force-dynamic";

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
          variant="page"
        />

        <ContactPagePanel variant="page">
          <ContactPageInteractive
            content={content}
            accommodations={accommodations}
          />
        </ContactPagePanel>
      </section>
    </main>
  );
}
