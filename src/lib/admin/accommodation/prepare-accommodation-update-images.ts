"use client";

import type { AccommodationUpdateImageInput } from "~/app/admin/logements/schema";

import type { AccommodationPreviewImage } from "@/hooks/use-accommodation-images";
import { uploadAccommodationImageFiles } from "@/lib/admin/uploadthing/upload-accommodation-image-files";

const isNewImage = (
  image: AccommodationPreviewImage,
): image is AccommodationPreviewImage & {
  file: File;
} => !image.isExisting && image.file instanceof File;

const isUploadedDraftImage = (
  image: AccommodationPreviewImage,
): image is AccommodationPreviewImage & {
  fileKey: string;
} =>
  !image.isExisting &&
  !image.file &&
  typeof image.fileKey === "string" &&
  image.fileKey.length > 0;

export const prepareAccommodationUpdateImages = async (
  images: AccommodationPreviewImage[],
  coverImageId: string | null,
  presentationImageId: string | null,
): Promise<AccommodationUpdateImageInput[]> => {
  const newImages = images.filter(isNewImage);

  const uploadedImages = await uploadAccommodationImageFiles(
    newImages.map((image) => image.file),
  );

  const uploadedImagesById = new Map(
    newImages.map((image, index) => [image.id, uploadedImages[index]]),
  );

  return images.map((image) => {
    const isCover = image.id === coverImageId;
    const isPresentation = image.id === presentationImageId;

    if (image.isExisting) {
      return {
        id: image.id,
        isCover,
        isPresentation,
      };
    }

    if (isUploadedDraftImage(image)) {
      return {
        url: image.url,
        fileKey: image.fileKey,
        isCover,
        isPresentation,
      };
    }

    const uploadedImage = uploadedImagesById.get(image.id);

    if (!uploadedImage) {
      throw new Error("Une image n’a pas pu être envoyée.");
    }

    return {
      url: uploadedImage.url,
      fileKey: uploadedImage.fileKey,
      isCover,
      isPresentation,
    };
  });
};
