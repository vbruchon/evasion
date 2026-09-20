"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { ReviewsPageAdminData } from "@/lib/admin/reviews/queries/get-reviews-page-admin-data";
import {
  reviewsPageContentSchema,
  type ReviewsPageContentValues,
} from "@/lib/reviews/reviews-page.schema";

import { useReviewsPageEditorSubmit } from "./use-reviews-page-editor-submit";
import { useReviewsPageImages } from "./use-reviews-page-images";

const getReviewsPageDefaultValues = (
  content: ReviewsPageAdminData["content"],
): ReviewsPageContentValues => ({
  heroEyebrow: content.heroEyebrow,
  heroTitle: content.heroTitle,
  heroDescription: content.heroDescription,

  recentReviewsEyebrow: content.recentReviewsEyebrow,
  recentReviewsTitle: content.recentReviewsTitle,
  recentReviewsDescription: content.recentReviewsDescription,

  allReviewsTitle: content.allReviewsTitle,
  allReviewsDescription: content.allReviewsDescription,

  ctaEyebrow: content.ctaEyebrow,
  ctaTitle: content.ctaTitle,
  ctaDescription: content.ctaDescription,
  ctaButtonLabel: content.ctaButtonLabel,
});

export const useReviewsPageEditor = (data: ReviewsPageAdminData) => {
  const form = useForm<ReviewsPageContentValues>({
    resolver: zodResolver(reviewsPageContentSchema),
    defaultValues: getReviewsPageDefaultValues(data.content),
    mode: "onSubmit",
  });

  const {
    heroImage,
    ctaImage,
    setHeroImageFile,
    setCtaImageFile,
    removeHeroImage,
    removeCtaImage,
    imagesChanged,
  } = useReviewsPageImages(data.content);

  const { handleSubmit, isSaving } = useReviewsPageEditorSubmit({
    form,
    heroImage,
    ctaImage,
  });

  const hasCurrentChanges = form.formState.isDirty || imagesChanged;

  const disabled = form.formState.isSubmitting || isSaving;

  return {
    form,

    heroImage,
    ctaImage,

    setHeroImageFile,
    setCtaImageFile,
    removeHeroImage,
    removeCtaImage,

    hasCurrentChanges,
    disabled,

    handleSubmit,
    isSaving,
  };
};
