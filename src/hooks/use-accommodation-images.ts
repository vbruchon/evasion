"use client";

import { useCallback, useState } from "react";

import type { AccommodationUpdateImageInput } from "~/app/admin/logements/schema";

import { MAX_ACCOMMODATION_IMAGES } from "@/lib/accommodations/accommodation-images";
import {
  createAccommodationPreviewImages,
  getAccommodationPreviewFileSelection,
  syncAccommodationPreparedImages,
  type AccommodationInitialImage,
  type AccommodationPreviewImage,
} from "@/lib/admin/accommodation/accommodation-image-previews";

export type {
  AccommodationInitialImage,
  AccommodationPreviewImage,
} from "@/lib/admin/accommodation/accommodation-image-previews";

type UseAccommodationImagesOptions = {
  initialImages?: AccommodationInitialImage[];
  onFilesChange?: (files: File[], coverImageIndex: number) => void;
};

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
      isExisting: image.isExisting ?? true,
    })),
  );

  const [coverImageId, setCoverImageId] = useState<string | null>(
    () =>
      initialImages.find((image) => image.isCover)?.id ??
      initialImages[0]?.id ??
      null,
  );

  const [presentationImageId, setPresentationImageId] = useState<string | null>(
    () => initialImages.find((image) => image.isPresentation)?.id ?? null,
  );

  const notifyFilesChange = useCallback(
    (
      nextImages: AccommodationPreviewImage[],
      nextCoverImageId: string | null,
    ) => {
      if (!onFilesChange) {
        return;
      }

      const { files, coverImageIndex } = getAccommodationPreviewFileSelection(
        nextImages,
        nextCoverImageId,
      );

      onFilesChange(files, coverImageIndex);
    },
    [onFilesChange],
  );

  const addFiles = useCallback(
    async (files: File[]) => {
      const availableSlots = MAX_ACCOMMODATION_IMAGES - images.length;

      if (availableSlots <= 0) {
        return;
      }

      const newImages = await createAccommodationPreviewImages(
        files,
        availableSlots,
      );

      if (newImages.length === 0) {
        return;
      }

      const nextImages = [...images, ...newImages];

      const nextCoverImageId = coverImageId ?? nextImages[0]?.id ?? null;

      setImages(nextImages);
      setCoverImageId(nextCoverImageId);

      notifyFilesChange(nextImages, nextCoverImageId);
    },
    [coverImageId, images, notifyFilesChange],
  );

  const removeImage = useCallback(
    (imageId: string) => {
      const nextImages = images.filter((image) => image.id !== imageId);

      const nextCoverImageId =
        coverImageId === imageId ? (nextImages[0]?.id ?? null) : coverImageId;

      const nextPresentationImageId =
        presentationImageId === imageId ? null : presentationImageId;

      setImages(nextImages);
      setCoverImageId(nextCoverImageId);
      setPresentationImageId(nextPresentationImageId);

      notifyFilesChange(nextImages, nextCoverImageId);
    },
    [coverImageId, images, notifyFilesChange, presentationImageId],
  );

  const setCoverImage = useCallback(
    (imageId: string) => {
      if (!images.some((image) => image.id === imageId)) {
        return;
      }

      setCoverImageId(imageId);
      notifyFilesChange(images, imageId);
    },
    [images, notifyFilesChange],
  );

  const setPresentationImage = useCallback(
    (imageId: string) => {
      if (!images.some((image) => image.id === imageId)) {
        return;
      }

      setPresentationImageId(imageId);
    },
    [images],
  );

  const syncPreparedImages = useCallback(
    (
      sourceImages: AccommodationPreviewImage[],
      preparedImages: AccommodationUpdateImageInput[],
    ) => {
      setImages((currentImages) =>
        syncAccommodationPreparedImages(
          currentImages,
          sourceImages,
          preparedImages,
        ),
      );
    },
    [],
  );

  return {
    images,
    coverImageId,
    presentationImageId,

    addFiles,
    removeImage,
    setCoverImage,
    setPresentationImage,
    syncPreparedImages,
  };
};
