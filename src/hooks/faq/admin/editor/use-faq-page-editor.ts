"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { FaqPageAdminData } from "@/lib/admin/faq/queries/get-faq-page-admin-data";
import {
  faqPageContentSchema,
  type FaqPageContentValues,
} from "@/lib/faq/faq-page.schema";

import { useFaqPageEditorSubmit } from "./use-faq-page-editor-submit";
import { useFaqPageImages } from "./use-faq-page-images";

const getFaqPageDefaultValues = (
  content: FaqPageAdminData["content"],
): FaqPageContentValues => ({
  heroEyebrow: content.heroEyebrow,
  heroTitle: content.heroTitle,
  heroDescription: content.heroDescription,
  heroHandwrittenFirstLine: content.heroHandwrittenFirstLine,
  heroHandwrittenSecondLine: content.heroHandwrittenSecondLine,

  questionsEyebrow: content.questionsEyebrow,
  questionsTitle: content.questionsTitle,
  questionsDescription: content.questionsDescription,

  items: content.items.map((item) => ({
    itemId: item.itemId,
    question: item.question,
    answer: item.answer,
  })),

  ctaEyebrow: content.ctaEyebrow,
  ctaTitle: content.ctaTitle,
  ctaDescription: content.ctaDescription,
  ctaButtonLabel: content.ctaButtonLabel,
});

export const useFaqPageEditor = (data: FaqPageAdminData) => {
  const form = useForm<FaqPageContentValues>({
    resolver: zodResolver(faqPageContentSchema),
    defaultValues: getFaqPageDefaultValues(data.content),
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
  } = useFaqPageImages(data.content);

  const { handleSubmit, isSaving } = useFaqPageEditorSubmit({
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
