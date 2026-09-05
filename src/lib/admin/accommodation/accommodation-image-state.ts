import type { AccommodationPreviewImage } from "./accommodation-image-previews";

type AccommodationImageSelection = {
  id: string;
  isCover?: boolean;
  isPresentation?: boolean;
};

export const haveAccommodationImagesChanged = (
  initialImages: AccommodationImageSelection[],
  currentImages: AccommodationPreviewImage[],
  coverImageId: string | null,
  presentationImageId: string | null,
) => {
  const initialSignature = JSON.stringify(
    initialImages.map((image) => ({
      id: image.id,
      isCover: image.isCover ?? false,
      isPresentation: image.isPresentation ?? false,
    })),
  );

  const currentSignature = JSON.stringify(
    currentImages.map((image) => ({
      id: image.id,
      isCover: image.id === coverImageId,
      isPresentation: image.id === presentationImageId,
    })),
  );

  return initialSignature !== currentSignature;
};
