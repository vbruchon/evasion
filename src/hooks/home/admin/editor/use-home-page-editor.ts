"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { HomePageAdminData } from "@/lib/admin/home/queries/get-home-page-admin-data";
import {
  homePageContentSchema,
  type HomePageContentValues,
} from "@/lib/home/home-page.schema";

import { useHomePageEditorSubmit } from "./use-home-page-editor-submit";
import { useHomePageImages } from "./use-home-page-images";

const getHomePageDefaultValues = (
  content: HomePageAdminData["content"],
): HomePageContentValues => ({
  heroEyebrow: content.heroEyebrow,
  heroTitle: content.heroTitle,
  heroDescription: content.heroDescription,
  heroButtonLabel: content.heroButtonLabel,

  accommodationsEyebrow: content.accommodationsEyebrow,
  accommodationsTitle: content.accommodationsTitle,
  accommodationsDescription: content.accommodationsDescription,

  escapeEyebrow: content.escapeEyebrow,
  escapeTitle: content.escapeTitle,
  escapeDescription: content.escapeDescription,
  escapeHandwritten: content.escapeHandwritten,

  reviewsEyebrow: content.reviewsEyebrow,

  ctaEyebrow: content.ctaEyebrow,
  ctaTitle: content.ctaTitle,
  ctaDescription: content.ctaDescription,
  ctaButtonLabel: content.ctaButtonLabel,
});

export const useHomePageEditor = (data: HomePageAdminData) => {
  const form = useForm<HomePageContentValues>({
    resolver: zodResolver(homePageContentSchema),
    defaultValues: getHomePageDefaultValues(data.content),
    mode: "onSubmit",
  });

  const {
    escapeImage,
    ctaImage,
    setEscapeImageFile,
    setCtaImageFile,
    removeEscapeImage,
    removeCtaImage,
    imagesChanged,
  } = useHomePageImages(data.content);

  const { handleSubmit, isSaving } = useHomePageEditorSubmit({
    form,
    escapeImage,
    ctaImage,
  });

  const hasCurrentChanges = form.formState.isDirty || imagesChanged;

  const disabled = form.formState.isSubmitting || isSaving;

  return {
    form,

    escapeImage,
    ctaImage,

    setEscapeImageFile,
    setCtaImageFile,
    removeEscapeImage,
    removeCtaImage,

    hasCurrentChanges,
    disabled,

    handleSubmit,
    isSaving,
  };
};
