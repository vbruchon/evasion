import { FaqPageCta } from "@/components/features/faq/faq-page-cta";
import { FaqPageHero } from "@/components/features/faq/faq-page-hero";
import { FaqPageQuestions } from "@/components/features/faq/faq-page-questions";
import { getFaqPageContent } from "@/lib/faq/queries/get-faq-page-content";
import { createPageMetadata } from "@/lib/seo/create-page-metadata";

export const metadata = createPageMetadata({
  title: "FAQ",
  description:
    "Réservation, disponibilités, localisation, équipements : retrouvez les réponses aux questions fréquentes pour préparer votre séjour Évasion.",
  path: "/faq",
});

export default async function FaqPage() {
  const content = await getFaqPageContent();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <FaqPageHero
        eyebrow={content.heroEyebrow}
        title={content.heroTitle}
        description={content.heroDescription}
        handwrittenFirstLine={content.heroHandwrittenFirstLine}
        handwrittenSecondLine={content.heroHandwrittenSecondLine}
        imageUrl={content.heroImageUrl}
        animated
      />

      <FaqPageQuestions
        eyebrow={content.questionsEyebrow}
        title={content.questionsTitle}
        description={content.questionsDescription}
        items={content.items}
        animated
      />

      <FaqPageCta
        eyebrow={content.ctaEyebrow}
        title={content.ctaTitle}
        description={content.ctaDescription}
        buttonLabel={content.ctaButtonLabel}
        imageUrl={content.ctaImageUrl}
        animated
      />
    </main>
  );
}
