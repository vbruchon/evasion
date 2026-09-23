"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { AboutPageAdminData } from "@/lib/admin/about/queries/get-about-page-admin-data";
import {
  aboutPageContentSchema,
  type AboutPageContentValues,
} from "@/lib/about/about-page.schema";

import { useAboutPageEditorSubmit } from "./use-about-page-editor-submit";
import { useAboutPageImages } from "./use-about-page-images";

const getAboutPageDefaultValues = (
  content: AboutPageAdminData["content"],
): AboutPageContentValues => ({
  heroEyebrow: content.heroEyebrow,
  heroTitle: content.heroTitle,
  heroDescription: content.heroDescription,
  heroButtonLabel: content.heroButtonLabel,

  spiritEyebrow: content.spiritEyebrow,
  spiritTitle: content.spiritTitle,
  spiritFirstParagraph: content.spiritFirstParagraph,
  spiritSecondParagraph: content.spiritSecondParagraph,
  spiritHandwritten: content.spiritHandwritten,

  philosophyEyebrow: content.philosophyEyebrow,
  philosophyTitle: content.philosophyTitle,
  philosophyDescription: content.philosophyDescription,

  philosophyFirstTitle: content.philosophyFirstTitle,
  philosophyFirstDescription: content.philosophyFirstDescription,

  philosophySecondTitle: content.philosophySecondTitle,
  philosophySecondDescription: content.philosophySecondDescription,

  philosophyThirdTitle: content.philosophyThirdTitle,
  philosophyThirdDescription: content.philosophyThirdDescription,

  philosophyFourthTitle: content.philosophyFourthTitle,
  philosophyFourthDescription: content.philosophyFourthDescription,

  statsEyebrow: content.statsEyebrow,
  statsTitle: content.statsTitle,

  ctaEyebrow: content.ctaEyebrow,
  ctaTitle: content.ctaTitle,
  ctaDescription: content.ctaDescription,
  ctaButtonLabel: content.ctaButtonLabel,
});

export const useAboutPageEditor = (data: AboutPageAdminData) => {
  const form = useForm<AboutPageContentValues>({
    resolver: zodResolver(aboutPageContentSchema),
    defaultValues: getAboutPageDefaultValues(data.content),
    mode: "onSubmit",
  });

  const {
    spiritImage,
    ctaImage,
    setSpiritImageFile,
    setCtaImageFile,
    removeSpiritImage,
    removeCtaImage,
    imagesChanged,
  } = useAboutPageImages(data.content);

  const { handleSubmit, isSaving } = useAboutPageEditorSubmit({
    form,
    spiritImage,
    ctaImage,
  });

  const hasCurrentChanges = form.formState.isDirty || imagesChanged;

  const disabled = form.formState.isSubmitting || isSaving;

  return {
    form,

    spiritImage,
    ctaImage,

    setSpiritImageFile,
    setCtaImageFile,
    removeSpiritImage,
    removeCtaImage,

    hasCurrentChanges,
    disabled,

    handleSubmit,
    isSaving,
  };
};
