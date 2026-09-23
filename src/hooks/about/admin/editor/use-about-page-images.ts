"use client";

import { useEffect, useMemo, useState } from "react";

import type { AboutPageAdminData } from "@/lib/admin/about/queries/get-about-page-admin-data";
import type { AboutPageImageInput } from "@/lib/about/about-page.schema";

export type AboutPageEditorImage = {
  previewUrl: string;
  persisted: AboutPageImageInput | null;
  file: File | null;
};

const createPersistedImage = (
  url: string | null,
  fileKey: string | null,
): AboutPageEditorImage | null => {
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

const createLocalImage = (file: File): AboutPageEditorImage => ({
  previewUrl: URL.createObjectURL(file),
  persisted: null,
  file,
});

const hasImageChanged = (
  current: AboutPageEditorImage | null,
  initial: AboutPageEditorImage | null,
) => {
  if (current?.file) {
    return true;
  }

  return (
    (current?.persisted?.fileKey ?? null) !==
    (initial?.persisted?.fileKey ?? null)
  );
};

export const useAboutPageImages = (content: AboutPageAdminData["content"]) => {
  const initialSpiritImage = useMemo(
    () =>
      createPersistedImage(content.spiritImageUrl, content.spiritImageFileKey),
    [content.spiritImageFileKey, content.spiritImageUrl],
  );

  const initialCtaImage = useMemo(
    () => createPersistedImage(content.ctaImageUrl, content.ctaImageFileKey),
    [content.ctaImageFileKey, content.ctaImageUrl],
  );

  const [spiritImage, setSpiritImage] = useState<AboutPageEditorImage | null>(
    () =>
      createPersistedImage(content.spiritImageUrl, content.spiritImageFileKey),
  );

  const [ctaImage, setCtaImage] = useState<AboutPageEditorImage | null>(() =>
    createPersistedImage(content.ctaImageUrl, content.ctaImageFileKey),
  );

  useEffect(
    () => () => {
      if (spiritImage?.file) {
        URL.revokeObjectURL(spiritImage.previewUrl);
      }
    },
    [spiritImage],
  );

  useEffect(
    () => () => {
      if (ctaImage?.file) {
        URL.revokeObjectURL(ctaImage.previewUrl);
      }
    },
    [ctaImage],
  );

  const setSpiritImageFile = (file: File) => {
    setSpiritImage(createLocalImage(file));
  };

  const setCtaImageFile = (file: File) => {
    setCtaImage(createLocalImage(file));
  };

  const removeSpiritImage = () => {
    setSpiritImage(null);
  };

  const removeCtaImage = () => {
    setCtaImage(null);
  };

  const spiritImageChanged = hasImageChanged(spiritImage, initialSpiritImage);

  const ctaImageChanged = hasImageChanged(ctaImage, initialCtaImage);

  return {
    spiritImage,
    ctaImage,

    setSpiritImageFile,
    setCtaImageFile,

    removeSpiritImage,
    removeCtaImage,

    imagesChanged: spiritImageChanged || ctaImageChanged,
  };
};
