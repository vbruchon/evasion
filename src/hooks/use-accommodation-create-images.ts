"use client";

import { useState } from "react";

export type AccommodationPreviewImage = {
  id: string;
  file: File;
  url: string;
};

type UseAccommodationCreateImagesProps = {
  onFilesChange: (files: File[], coverIndex: number) => void;
  disabled?: boolean;
};

export const MAX_ACCOMMODATION_IMAGES = 15;

const acceptedImageTypes = ["image/jpeg", "image/png", "image/webp"];

const readFileAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }

      reject(new Error("Impossible de lire l’image."));
    };

    reader.onerror = () => {
      reject(reader.error);
    };

    reader.readAsDataURL(file);
  });

export const useAccommodationCreateImages = ({
  onFilesChange,
  disabled = false,
}: UseAccommodationCreateImagesProps) => {
  const [images, setImages] = useState<AccommodationPreviewImage[]>([]);
  const [coverImageId, setCoverImageId] = useState<string | null>(null);

  const updateImages = (
    nextImages: AccommodationPreviewImage[],
    nextCoverImageId: string | null,
  ) => {
    const validCoverImageId =
      nextCoverImageId &&
      nextImages.some((image) => image.id === nextCoverImageId)
        ? nextCoverImageId
        : (nextImages[0]?.id ?? null);

    setImages(nextImages);
    setCoverImageId(validCoverImageId);

    const coverIndex = validCoverImageId
      ? nextImages.findIndex((image) => image.id === validCoverImageId)
      : 0;

    onFilesChange(
      nextImages.map((image) => image.file),
      Math.max(coverIndex, 0),
    );
  };

  const addFiles = async (files: File[]) => {
    if (disabled) {
      return;
    }

    const remainingSlots = MAX_ACCOMMODATION_IMAGES - images.length;

    if (remainingSlots <= 0) {
      return;
    }

    const imageFiles = files
      .filter((file) => acceptedImageTypes.includes(file.type))
      .slice(0, remainingSlots);

    const previews = await Promise.all(
      imageFiles.map(async (file) => ({
        id: crypto.randomUUID(),
        file,
        url: await readFileAsDataUrl(file),
      })),
    );

    const nextImages = [...images, ...previews];

    updateImages(nextImages, coverImageId ?? nextImages[0]?.id ?? null);
  };

  const removeImage = (id: string) => {
    if (disabled) {
      return;
    }

    const nextImages = images.filter((image) => image.id !== id);

    const nextCoverImageId =
      coverImageId === id ? (nextImages[0]?.id ?? null) : coverImageId;

    updateImages(nextImages, nextCoverImageId);
  };

  const setCoverImage = (id: string) => {
    if (disabled) {
      return;
    }

    updateImages(images, id);
  };

  return {
    images,
    coverImageId,
    addFiles,
    removeImage,
    setCoverImage,
  };
};
