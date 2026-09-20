"use client";

import { useFormContext, useWatch } from "react-hook-form";

import type { ReviewsPageEditorNavigation } from "@/hooks/reviews/admin/editor/use-reviews-page-editor-navigation";
import type { ReviewsPageEditorImage } from "@/hooks/reviews/admin/editor/use-reviews-page-images";
import type { ReviewsPageAdminData } from "@/lib/admin/reviews/queries/get-reviews-page-admin-data";
import type { ReviewsPageContentValues } from "@/lib/reviews/reviews-page.schema";

import { ReviewsPageEditorPreviewCta } from "./reviews-page-editor-preview-cta";
import { ReviewsPageEditorPreviewHero } from "./reviews-page-editor-preview-hero";
import { ReviewsPageEditorPreviewReviews } from "./reviews-page-editor-preview-reviews";

type ReviewsPageEditorPreviewProps = {
  data: ReviewsPageAdminData;
  navigation: ReviewsPageEditorNavigation;
  heroImage: ReviewsPageEditorImage | null;
  ctaImage: ReviewsPageEditorImage | null;
};

export const ReviewsPageEditorPreview = ({
  data,
  navigation,
  heroImage,
  ctaImage,
}: ReviewsPageEditorPreviewProps) => {
  const { control } = useFormContext<ReviewsPageContentValues>();

  const values = useWatch({
    control,
  });

  return (
    <div className="min-h-full bg-background text-foreground">
      <ReviewsPageEditorPreviewHero
        eyebrow={values.heroEyebrow ?? ""}
        title={values.heroTitle ?? ""}
        description={values.heroDescription ?? ""}
        handwrittenFirstLine={values.heroHandwrittenFirstLine ?? ""}
        handwrittenSecondLine={values.heroHandwrittenSecondLine ?? ""}
        imageUrl={heroImage?.previewUrl ?? null}
        averageRating={data.summary.averageRating}
        totalReviews={data.summary.totalReviews}
        activeSection={navigation.activeSection}
        activeHeroSection={navigation.activeHeroSection}
        onSectionChange={navigation.handleSectionChange}
        onHeroSectionChange={navigation.handleHeroSectionChange}
      />

      <ReviewsPageEditorPreviewReviews
        data={data}
        recentReviewsEyebrow={values.recentReviewsEyebrow ?? ""}
        recentReviewsTitle={values.recentReviewsTitle ?? ""}
        recentReviewsDescription={values.recentReviewsDescription ?? ""}
        allReviewsTitle={values.allReviewsTitle ?? ""}
        allReviewsDescription={values.allReviewsDescription ?? ""}
        activeSection={navigation.activeSection}
        activeReviewsSection={navigation.activeReviewsSection}
        onSectionChange={navigation.handleSectionChange}
        onReviewsSectionChange={navigation.handleReviewsSectionChange}
      />

      <ReviewsPageEditorPreviewCta
        eyebrow={values.ctaEyebrow ?? ""}
        title={values.ctaTitle ?? ""}
        description={values.ctaDescription ?? ""}
        handwrittenPrefix={values.ctaHandwrittenPrefix ?? ""}
        handwrittenHighlight={values.ctaHandwrittenHighlight ?? ""}
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
