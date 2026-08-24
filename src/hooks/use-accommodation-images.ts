"use client";

import { useCallback, useState } from "react";

export const MAX_ACCOMMODATION_IMAGES = 15;

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export type AccommodationInitialImage = {
  id: string;
  url: string;
  fileKey: string;
  alt?: string | null;
  isCover: boolean;
};

export type AccommodationPreviewImage = {
  id: string;
  url: string;
  alt?: string | null;
  file?: File;
  fileKey?: string;
  isExisting: boolean;
};

type UseAccommodationImagesOptions = {
  initialImages?: AccommodationInitialImage[];
  onFilesChange?: (files: File[], coverImageIndex: number) => void;
};

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
      reject(new Error("Impossible de lire l’image."));
    };

    reader.readAsDataURL(file);
  });

export const useAccommodationImages = ({
  initialImages = [],
  onFilesChange,
}: UseAccommodationImagesOptions = {}) => {
  const [images, setImages] = useState<AccommodationPreviewImage[]>(() =>
    initialImages.map((image) => ({
      id: image.id,
      url: image.url,
      fileKey: image.fileKey,
      alt: image.alt,
      isExisting: true,
    })),
  );

  const [coverImageId, setCoverImageId] = useState<string | null>(
    () =>
      initialImages.find((image) => image.isCover)?.id ??
      initialImages[0]?.id ??
      null,
  );

  const notifyFilesChange = useCallback(
    (
      nextImages: AccommodationPreviewImage[],
      nextCoverImageId: string | null,
    ) => {
      if (!onFilesChange) {
        return;
      }

      const newImages = nextImages.filter(
        (
          image,
        ): image is AccommodationPreviewImage & {
          file: File;
        } => Boolean(image.file),
      );

      const files = newImages.map((image) => image.file);

      const coverImageIndex = newImages.findIndex(
        (image) => image.id === nextCoverImageId,
      );

      onFilesChange(files, coverImageIndex >= 0 ? coverImageIndex : 0);
    },
    [onFilesChange],
  );

  const addFiles = useCallback(
    async (files: File[]) => {
      const availableSlots = MAX_ACCOMMODATION_IMAGES - images.length;

      if (availableSlots <= 0) {
        return;
      }

      const acceptedFiles = files
        .filter((file) => ACCEPTED_IMAGE_TYPES.includes(file.type))
        .slice(0, availableSlots);

      if (acceptedFiles.length === 0) {
        return;
      }

      const newImages = await Promise.all(
        acceptedFiles.map(async (file) => ({
          id: crypto.randomUUID(),
          file,
          url: await readFileAsDataUrl(file),
          isExisting: false,
        })),
      );

      const nextImages = [...images, ...newImages];

      const nextCoverImageId = coverImageId ?? nextImages[0]?.id ?? null;

      setImages(nextImages);
      setCoverImageId(nextCoverImageId);

      notifyFilesChange(nextImages, nextCoverImageId);
    },
    [images, coverImageId, notifyFilesChange],
  );

  const removeImage = useCallback(
    (imageId: string) => {
      const nextImages = images.filter((image) => image.id !== imageId);

      const nextCoverImageId =
        coverImageId === imageId ? (nextImages[0]?.id ?? null) : coverImageId;

      setImages(nextImages);
      setCoverImageId(nextCoverImageId);

      notifyFilesChange(nextImages, nextCoverImageId);
    },
    [images, coverImageId, notifyFilesChange],
  );

  const setCoverImage = useCallback(
    (imageId: string) => {
      const imageExists = images.some((image) => image.id === imageId);

      if (!imageExists) {
        return;
      }

      setCoverImageId(imageId);

      notifyFilesChange(images, imageId);
    },
    [images, notifyFilesChange],
  );

  return {
    images,
    coverImageId,
    addFiles,
    removeImage,
    setCoverImage,
  };
};
