"use client";

import { useFormContext, useWatch } from "react-hook-form";

import type { HomePageEditorNavigation } from "@/hooks/home/admin/editor/use-home-page-editor-navigation";
import type { HomePageAdminData } from "@/lib/admin/home/queries/get-home-page-admin-data";
import type { AdminEditorImage } from "@/lib/admin/images/admin-editor-image.types";
import type { HomePageContentValues } from "@/lib/home/home-page.schema";

import { HomePageEditorPreviewAccommodations } from "./home-page-editor-preview-accommodations";
import { HomePageEditorPreviewCta } from "./home-page-editor-preview-cta";
import { HomePageEditorPreviewEscape } from "./home-page-editor-preview-escape";
import { HomePageEditorPreviewHero } from "./home-page-editor-preview-hero";
import { HomePageEditorPreviewReviews } from "./home-page-editor-preview-reviews";

type HomePageEditorPreviewProps = {
  data: HomePageAdminData;
  navigation: HomePageEditorNavigation;
  escapeImage: AdminEditorImage | null;
  ctaImage: AdminEditorImage | null;
};

export const HomePageEditorPreview = ({
  data,
  navigation,
  escapeImage,
  ctaImage,
}: HomePageEditorPreviewProps) => {
  const { control } = useFormContext<HomePageContentValues>();

  const values = useWatch({
    control,
  });

  return (
    <div className="min-h-full bg-background text-foreground">
      <HomePageEditorPreviewHero
        eyebrow={values.heroEyebrow ?? ""}
        title={values.heroTitle ?? ""}
        description={values.heroDescription ?? ""}
        buttonLabel={values.heroButtonLabel ?? ""}
        images={data.heroImages}
        totalAccommodations={data.accommodations.length}
        activeSection={navigation.activeSection}
        onSectionChange={navigation.handleSectionChange}
      />

      <HomePageEditorPreviewAccommodations
        eyebrow={values.accommodationsEyebrow ?? ""}
        title={values.accommodationsTitle ?? ""}
        description={values.accommodationsDescription ?? ""}
        accommodations={data.accommodations}
        activeSection={navigation.activeSection}
        onSectionChange={navigation.handleSectionChange}
      />

      <HomePageEditorPreviewEscape
        eyebrow={values.escapeEyebrow ?? ""}
        title={values.escapeTitle ?? ""}
        description={values.escapeDescription ?? ""}
        handwritten={values.escapeHandwritten ?? ""}
        imageUrl={escapeImage?.previewUrl ?? null}
        activeSection={navigation.activeSection}
        activeEscapeSection={navigation.activeEscapeSection}
        onSectionChange={navigation.handleSectionChange}
        onEscapeSectionChange={navigation.handleEscapeSectionChange}
      />

      <HomePageEditorPreviewReviews
        eyebrow={values.reviewsEyebrow ?? ""}
        averageRating={data.summary.averageRating}
        totalReviews={data.summary.totalReviews}
        reviews={data.recentReviews}
        activeSection={navigation.activeSection}
        onSectionChange={navigation.handleSectionChange}
      />

      <HomePageEditorPreviewCta
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
