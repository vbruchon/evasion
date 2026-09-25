"use client";

import { useFormContext, useWatch } from "react-hook-form";

import type { FaqPageEditorNavigation } from "@/hooks/faq/admin/editor/use-faq-page-editor-navigation";
import type { AdminEditorImage } from "@/lib/admin/images/admin-editor-image.types";
import type { FaqPageContentValues } from "@/lib/faq/faq-page.schema";

import { FaqPageEditorPreviewCta } from "./faq-page-editor-preview-cta";
import { FaqPageEditorPreviewHero } from "./faq-page-editor-preview-hero";
import { FaqPageEditorPreviewQuestions } from "./faq-page-editor-preview-questions";

type FaqPageEditorPreviewProps = {
  navigation: FaqPageEditorNavigation;
  heroImage: AdminEditorImage | null;
  ctaImage: AdminEditorImage | null;
};

export const FaqPageEditorPreview = ({
  navigation,
  heroImage,
  ctaImage,
}: FaqPageEditorPreviewProps) => {
  const { control } = useFormContext<FaqPageContentValues>();

  const values = useWatch({
    control,
  });

  return (
    <div className="min-h-full bg-background text-foreground">
      <FaqPageEditorPreviewHero
        eyebrow={values.heroEyebrow ?? ""}
        title={values.heroTitle ?? ""}
        description={values.heroDescription ?? ""}
        handwrittenFirstLine={values.heroHandwrittenFirstLine ?? ""}
        handwrittenSecondLine={values.heroHandwrittenSecondLine ?? ""}
        imageUrl={heroImage?.previewUrl ?? null}
        activeSection={navigation.activeSection}
        activeHeroSection={navigation.activeHeroSection}
        onSectionChange={navigation.handleSectionChange}
        onHeroSectionChange={navigation.handleHeroSectionChange}
      />

      <FaqPageEditorPreviewQuestions
        eyebrow={values.questionsEyebrow ?? ""}
        title={values.questionsTitle ?? ""}
        description={values.questionsDescription ?? ""}
        items={(values.items ?? []).map((item) => ({
          itemId: item.itemId ?? null,
          question: item.question ?? "",
          answer: item.answer ?? "",
        }))}
        activeSection={navigation.activeSection}
        activeQuestionsSection={navigation.activeQuestionsSection}
        onSectionChange={navigation.handleSectionChange}
        onQuestionsSectionChange={navigation.handleQuestionsSectionChange}
      />

      <FaqPageEditorPreviewCta
        eyebrow={values.ctaEyebrow ?? ""}
        title={values.ctaTitle ?? ""}
        description={values.ctaDescription ?? ""}
        buttonLabel={values.ctaButtonLabel ?? ""}
        imageUrl={ctaImage?.previewUrl ?? null}
        activeSection={navigation.activeSection}
        activeCtaSection={navigation.activeCtaSection}
        onSectionChange={navigation.handleSectionChange}
        onCtaSectionChange={navigation.handleCtaSectionChange}
      />
    </div>
  );
};
