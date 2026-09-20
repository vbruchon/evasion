"use client";

import { useCallback, useState } from "react";
import type { UseFormReturn } from "react-hook-form";

import { updateReviewsPageContent } from "~/app/admin/avis/action";
import { uploadFiles } from "@/lib/admin/uploadthing/client";
import type {
  ReviewsPageContentValues,
  ReviewsPageImageInput,
} from "@/lib/reviews/reviews-page.schema";

import type { ReviewsPageEditorImage } from "./use-reviews-page-images";

type ReviewsPageImageSlot = "hero" | "cta";

type PendingImageUpload = {
  slot: ReviewsPageImageSlot;
  file: File;
};

type UseReviewsPageEditorSubmitOptions = {
  form: UseFormReturn<ReviewsPageContentValues>;
  heroImage: ReviewsPageEditorImage | null;
  ctaImage: ReviewsPageEditorImage | null;
};

const prepareReviewsPageImages = async (
  heroImage: ReviewsPageEditorImage | null,
  ctaImage: ReviewsPageEditorImage | null,
) => {
  const pendingUploads: PendingImageUpload[] = [];

  if (heroImage?.file) {
    pendingUploads.push({
      slot: "hero",
      file: heroImage.file,
    });
  }

  if (ctaImage?.file) {
    pendingUploads.push({
      slot: "cta",
      file: ctaImage.file,
    });
  }

  const uploadedFiles =
    pendingUploads.length > 0
      ? await uploadFiles("reviewsPageImages", {
          files: pendingUploads.map(({ file }) => file),
        })
      : [];

  if (uploadedFiles.length !== pendingUploads.length) {
    throw new Error("Une image n’a pas pu être envoyée.");
  }

  const uploadedImages = new Map<ReviewsPageImageSlot, ReviewsPageImageInput>();

  pendingUploads.forEach(({ slot }, index) => {
    const uploadedFile = uploadedFiles[index];

    if (!uploadedFile?.key || !uploadedFile.ufsUrl) {
      throw new Error("Une image n’a pas pu être envoyée.");
    }

    uploadedImages.set(slot, {
      fileKey: uploadedFile.key,
      url: uploadedFile.ufsUrl,
    });
  });

  const resolveImage = (
    slot: ReviewsPageImageSlot,
    image: ReviewsPageEditorImage | null,
  ): ReviewsPageImageInput | null => {
    if (!image) {
      return null;
    }

    if (image.persisted) {
      return image.persisted;
    }

    const uploadedImage = uploadedImages.get(slot);

    if (!uploadedImage) {
      throw new Error("Une image n’a pas pu être envoyée.");
    }

    return uploadedImage;
  };

  return {
    heroImage: resolveImage("hero", heroImage),
    ctaImage: resolveImage("cta", ctaImage),
  };
};

export const useReviewsPageEditorSubmit = ({
  form,
  heroImage,
  ctaImage,
}: UseReviewsPageEditorSubmitOptions) => {
  const [isSaving, setIsSaving] = useState(false);

  const setRootError = useCallback(
    (message: string) => {
      form.setError("root", {
        message,
      });
    },
    [form],
  );

  const saveReviewsPage = useCallback(
    async (values: ReviewsPageContentValues) => {
      form.clearErrors("root");
      setIsSaving(true);

      try {
        const preparedImages = await prepareReviewsPageImages(
          heroImage,
          ctaImage,
        );

        const result = await updateReviewsPageContent(
          values,
          preparedImages.heroImage,
          preparedImages.ctaImage,
        );

        if (!result.success) {
          setRootError(result.message);
          return;
        }

        window.location.reload();
      } catch {
        setRootError(
          "Une erreur est survenue pendant l’enregistrement de la page Avis.",
        );
      } finally {
        setIsSaving(false);
      }
    },
    [ctaImage, form, heroImage, setRootError],
  );

  const handleSubmit = form.handleSubmit(saveReviewsPage);

  return {
    handleSubmit,
    isSaving,
  };
};
