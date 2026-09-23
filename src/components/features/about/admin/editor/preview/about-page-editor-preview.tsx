"use client";

import { useFormContext, useWatch } from "react-hook-form";

import type { AboutPageEditorNavigation } from "@/hooks/about/admin/editor/use-about-page-editor-navigation";
import type { AboutPageEditorImage } from "@/hooks/about/admin/editor/use-about-page-images";
import type { AboutPageAdminData } from "@/lib/admin/about/queries/get-about-page-admin-data";
import type { AboutPageContentValues } from "@/lib/about/about-page.schema";

import { AboutPageEditorPreviewCta } from "./about-page-editor-preview-cta";
import { AboutPageEditorPreviewHero } from "./about-page-editor-preview-hero";
import { AboutPageEditorPreviewPhilosophy } from "./about-page-editor-preview-philosophy";
import { AboutPageEditorPreviewSpirit } from "./about-page-editor-preview-spirit";
import { AboutPageEditorPreviewStats } from "./about-page-editor-preview-stats";

type AboutPageEditorPreviewProps = {
  data: AboutPageAdminData;
  navigation: AboutPageEditorNavigation;
  spiritImage: AboutPageEditorImage | null;
  ctaImage: AboutPageEditorImage | null;
};

export const AboutPageEditorPreview = ({
  data,
  navigation,
  spiritImage,
  ctaImage,
}: AboutPageEditorPreviewProps) => {
  const { control } = useFormContext<AboutPageContentValues>();

  const values = useWatch({
    control,
  });

  return (
    <div className="min-h-full bg-background text-foreground">
      <AboutPageEditorPreviewHero
        eyebrow={values.heroEyebrow ?? ""}
        title={values.heroTitle ?? ""}
        description={values.heroDescription ?? ""}
        buttonLabel={values.heroButtonLabel ?? ""}
        images={data.heroImages}
        activeSection={navigation.activeSection}
        onSectionChange={navigation.handleSectionChange}
      />

      <AboutPageEditorPreviewSpirit
        eyebrow={values.spiritEyebrow ?? ""}
        title={values.spiritTitle ?? ""}
        firstParagraph={values.spiritFirstParagraph ?? ""}
        secondParagraph={values.spiritSecondParagraph ?? ""}
        handwritten={values.spiritHandwritten ?? ""}
        imageUrl={spiritImage?.previewUrl ?? null}
        activeSection={navigation.activeSection}
        activeSpiritSection={navigation.activeSpiritSection}
        onSectionChange={navigation.handleSectionChange}
        onSpiritSectionChange={navigation.handleSpiritSectionChange}
      />

      <AboutPageEditorPreviewPhilosophy
        eyebrow={values.philosophyEyebrow ?? ""}
        title={values.philosophyTitle ?? ""}
        description={values.philosophyDescription ?? ""}
        firstTitle={values.philosophyFirstTitle ?? ""}
        firstDescription={values.philosophyFirstDescription ?? ""}
        secondTitle={values.philosophySecondTitle ?? ""}
        secondDescription={values.philosophySecondDescription ?? ""}
        thirdTitle={values.philosophyThirdTitle ?? ""}
        thirdDescription={values.philosophyThirdDescription ?? ""}
        fourthTitle={values.philosophyFourthTitle ?? ""}
        fourthDescription={values.philosophyFourthDescription ?? ""}
        activeSection={navigation.activeSection}
        activePhilosophySection={navigation.activePhilosophySection}
        onSectionChange={navigation.handleSectionChange}
        onPhilosophySectionChange={navigation.handlePhilosophySectionChange}
      />

      <AboutPageEditorPreviewStats
        eyebrow={values.statsEyebrow ?? ""}
        title={values.statsTitle ?? ""}
        totalAccommodations={data.stats.totalAccommodations}
        totalReviews={data.stats.totalReviews}
        averageRating={data.stats.averageRating}
        activeSection={navigation.activeSection}
        onSectionChange={navigation.handleSectionChange}
      />

      <AboutPageEditorPreviewCta
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
