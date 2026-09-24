"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { MAX_ACCOMMODATION_IMAGES } from "@/lib/accommodations/accommodation-images";
import {
  createAccommodationPreviewImages,
  getAccommodationPreviewFileSelection,
  revokeAccommodationPreviewImage,
  syncAccommodationPreparedImages,
  type AccommodationInitialImage,
  type AccommodationPreviewImage,
} from "@/lib/admin/accommodation/images/accommodation-image-previews";
import type { AccommodationUpdateImageInput } from "@/lib/admin/accommodation/schema";

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

  const previousImagesRef = useRef(images);

  useEffect(() => {
    const currentLocalPreviewUrls = new Set(
      images
        .filter((image) => image.file && image.url.startsWith("blob:"))
        .map((image) => image.url),
    );

    previousImagesRef.current.forEach((image) => {
      if (
        image.file &&
        image.url.startsWith("blob:") &&
        !currentLocalPreviewUrls.has(image.url)
      ) {
        revokeAccommodationPreviewImage(image);
      }
    });

    previousImagesRef.current = images;
  }, [images]);

  useEffect(
    () => () => {
      previousImagesRef.current.forEach(revokeAccommodationPreviewImage);
    },
    [],
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
    (files: File[]) => {
      const availableSlots = MAX_ACCOMMODATION_IMAGES - images.length;

      if (availableSlots <= 0) {
        return;
      }

      const newImages = createAccommodationPreviewImages(files, availableSlots);

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

  const syncPersistedImages = useCallback(
    (persistedImages: AccommodationInitialImage[]) => {
      const nextImages: AccommodationPreviewImage[] = persistedImages.map(
        (image) => ({
          id: image.id,
          url: image.url,
          fileKey: image.fileKey,
          alt: image.alt,
          isExisting: true,
        }),
      );

      const nextCoverImageId =
        persistedImages.find((image) => image.isCover)?.id ??
        persistedImages[0]?.id ??
        null;

      const nextPresentationImageId =
        persistedImages.find((image) => image.isPresentation)?.id ?? null;

      setImages(nextImages);
      setCoverImageId(nextCoverImageId);
      setPresentationImageId(nextPresentationImageId);

      return {
        images: nextImages,
        coverImageId: nextCoverImageId,
        presentationImageId: nextPresentationImageId,
      };
    },
    [],
  );

  const reorderImages = useCallback(
    (fromIndex: number, toIndex: number) => {
      if (
        fromIndex === toIndex ||
        fromIndex < 0 ||
        toIndex < 0 ||
        fromIndex >= images.length ||
        toIndex >= images.length
      ) {
        return;
      }

      const nextImages = [...images];
      const [movedImage] = nextImages.splice(fromIndex, 1);

      nextImages.splice(toIndex, 0, movedImage);

      setImages(nextImages);

      notifyFilesChange(nextImages, coverImageId);
    },
    [coverImageId, images, notifyFilesChange],
  );

  return {
    images,
    coverImageId,
    presentationImageId,

    addFiles,
    removeImage,
    reorderImages,
    setCoverImage,
    setPresentationImage,
    syncPreparedImages,
    syncPersistedImages,
  };
};
