import type { AccommodationUpdateImageInput } from "@/lib/admin/accommodation/schema";
import { isValidAdminImageFile } from "@/lib/admin/images/image-upload";

export type AccommodationInitialImage = {
  id: string;
  url: string;
  fileKey: string;
  alt?: string | null;
  isCover: boolean;
  isPresentation?: boolean;
  isExisting?: boolean;
};

export type AccommodationPreviewImage = {
  id: string;
  url: string;
  alt?: string | null;
  file?: File;
  fileKey?: string;
  isExisting: boolean;
};

export const createAccommodationPreviewImages = (
  files: File[],
  availableSlots: number,
): AccommodationPreviewImage[] => {
  const acceptedFiles = files
    .filter(isValidAdminImageFile)
    .slice(0, availableSlots);

  return acceptedFiles.map((file) => ({
    id: crypto.randomUUID(),
    file,
    url: URL.createObjectURL(file),
    isExisting: false,
  }));
};

export const revokeAccommodationPreviewImage = (
  image: AccommodationPreviewImage,
) => {
  if (image.file && image.url.startsWith("blob:")) {
    URL.revokeObjectURL(image.url);
  }
};

export const getAccommodationPreviewFileSelection = (
  images: AccommodationPreviewImage[],
  coverImageId: string | null,
) => {
  const newImages = images.filter(
    (
      image,
    ): image is AccommodationPreviewImage & {
      file: File;
    } => Boolean(image.file),
  );

  const files = newImages.map((image) => image.file);

  const coverImageIndex = newImages.findIndex(
    (image) => image.id === coverImageId,
  );

  return {
    files,
    coverImageIndex: coverImageIndex >= 0 ? coverImageIndex : 0,
  };
};

export const syncAccommodationPreparedImages = (
  currentImages: AccommodationPreviewImage[],
  sourceImages: AccommodationPreviewImage[],
  preparedImages: AccommodationUpdateImageInput[],
) => {
  const preparedImagesById = new Map<
    string,
    {
      url: string;
      fileKey: string;
    }
  >();

  sourceImages.forEach((image, index) => {
    if (image.isExisting) {
      return;
    }

    const preparedImage = preparedImages[index];

    if (!preparedImage || "id" in preparedImage) {
      return;
    }

    preparedImagesById.set(image.id, {
      url: preparedImage.url,
      fileKey: preparedImage.fileKey,
    });
  });

  return currentImages.map((image) => {
    const preparedImage = preparedImagesById.get(image.id);

    if (!preparedImage) {
      return image;
    }

    return {
      ...image,
      url: preparedImage.url,
      fileKey: preparedImage.fileKey,
      file: undefined,
    };
  });
};
