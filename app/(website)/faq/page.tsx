import { FaqPageCta } from "@/components/features/faq/faq-page-cta";
import { FaqPageHero } from "@/components/features/faq/faq-page-hero";
import { FaqPageQuestions } from "@/components/features/faq/faq-page-questions";
import { getFaqPageContent } from "@/lib/faq/queries/get-faq-page-content";

export const dynamic = "force-dynamic";

export default async function FaqPage() {
  const content = await getFaqPageContent();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <FaqPageHero
        eyebrow={content.heroEyebrow}
        title={content.heroTitle}
        description={content.heroDescription}
      />

      <FaqPageQuestions
        eyebrow={content.questionsEyebrow}
        title={content.questionsTitle}
        description={content.questionsDescription}
        items={content.items}
      />

      <FaqPageCta
        eyebrow={content.ctaEyebrow}
        title={content.ctaTitle}
        description={content.ctaDescription}
        buttonLabel={content.ctaButtonLabel}
      />
    </main>
  );
}
