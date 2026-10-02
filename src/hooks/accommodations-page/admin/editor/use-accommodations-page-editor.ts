"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  accommodationsPageContentSchema,
  type AccommodationsPageContentValues,
} from "@/lib/accommodations-page/accommodations-page.schema";
import type { AccommodationsPageAdminData } from "@/lib/admin/accommodations-page/queries/get-accommodations-page-admin-data";

import { useAccommodationsPageEditorSubmit } from "./use-accommodations-page-editor-submit";
import { useAccommodationsPageImages } from "./use-accommodations-page-images";

const getAccommodationsPageDefaultValues = (
  content: AccommodationsPageAdminData["content"],
): AccommodationsPageContentValues => ({
  heroEyebrow: content.heroEyebrow,
  heroTitle: content.heroTitle,
  heroDescription: content.heroDescription,

  ctaEyebrow: content.ctaEyebrow,
  ctaTitle: content.ctaTitle,
  ctaButtonLabel: content.ctaButtonLabel,
});

export const useAccommodationsPageEditor = (
  data: AccommodationsPageAdminData,
) => {
  const form = useForm<AccommodationsPageContentValues>({
    resolver: zodResolver(accommodationsPageContentSchema),
    defaultValues: getAccommodationsPageDefaultValues(data.content),
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
  } = useAccommodationsPageImages(data.content);

  const { handleSubmit, isSaving } = useAccommodationsPageEditorSubmit({
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
