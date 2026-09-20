"use client";

import { useEffect, useMemo, useState } from "react";

import type { ReviewsPageAdminData } from "@/lib/admin/reviews/queries/get-reviews-page-admin-data";
import type { ReviewsPageImageInput } from "@/lib/reviews/reviews-page.schema";

export type ReviewsPageEditorImage = {
  previewUrl: string;
  persisted: ReviewsPageImageInput | null;
  file: File | null;
};

const createPersistedImage = (
  url: string | null,
  fileKey: string | null,
): ReviewsPageEditorImage | null => {
  if (!url || !fileKey) {
    return null;
  }

  return {
    previewUrl: url,
    persisted: {
      url,
      fileKey,
    },
    file: null,
  };
};

const createLocalImage = (file: File): ReviewsPageEditorImage => ({
  previewUrl: URL.createObjectURL(file),
  persisted: null,
  file,
});

const hasImageChanged = (
  current: ReviewsPageEditorImage | null,
  initial: ReviewsPageEditorImage | null,
) => {
  if (current?.file) {
    return true;
  }

  return (
    (current?.persisted?.fileKey ?? null) !==
    (initial?.persisted?.fileKey ?? null)
  );
};

export const useReviewsPageImages = (
  content: ReviewsPageAdminData["content"],
) => {
  const initialHeroImage = useMemo(
    () => createPersistedImage(content.heroImageUrl, content.heroImageFileKey),
    [content.heroImageFileKey, content.heroImageUrl],
  );

  const initialCtaImage = useMemo(
    () => createPersistedImage(content.ctaImageUrl, content.ctaImageFileKey),
    [content.ctaImageFileKey, content.ctaImageUrl],
  );

  const [heroImage, setHeroImage] = useState<ReviewsPageEditorImage | null>(
    () => createPersistedImage(content.heroImageUrl, content.heroImageFileKey),
  );

  const [ctaImage, setCtaImage] = useState<ReviewsPageEditorImage | null>(() =>
    createPersistedImage(content.ctaImageUrl, content.ctaImageFileKey),
  );

  useEffect(
    () => () => {
      if (heroImage?.file) {
        URL.revokeObjectURL(heroImage.previewUrl);
      }
    },
    [heroImage],
  );

  useEffect(
    () => () => {
      if (ctaImage?.file) {
        URL.revokeObjectURL(ctaImage.previewUrl);
      }
    },
    [ctaImage],
  );

  const setHeroImageFile = (file: File) => {
    setHeroImage(createLocalImage(file));
  };

  const setCtaImageFile = (file: File) => {
    setCtaImage(createLocalImage(file));
  };

  const removeHeroImage = () => {
    setHeroImage(null);
  };

  const removeCtaImage = () => {
    setCtaImage(null);
  };

  const heroImageChanged = hasImageChanged(heroImage, initialHeroImage);

  const ctaImageChanged = hasImageChanged(ctaImage, initialCtaImage);

  return {
    heroImage,
    ctaImage,

    setHeroImageFile,
    setCtaImageFile,

    removeHeroImage,
    removeCtaImage,

    imagesChanged: heroImageChanged || ctaImageChanged,
  };
};
