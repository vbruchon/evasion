import type { AccommodationUpdateImageInput } from "~/app/admin/logements/schema";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

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

export const createAccommodationPreviewImages = async (
  files: File[],
  availableSlots: number,
): Promise<AccommodationPreviewImage[]> => {
  const acceptedFiles = files
    .filter((file) => ACCEPTED_IMAGE_TYPES.includes(file.type))
    .slice(0, availableSlots);

  return Promise.all(
    acceptedFiles.map(async (file) => ({
      id: crypto.randomUUID(),
      file,
      url: await readFileAsDataUrl(file),
      isExisting: false,
    })),
  );
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
