export const MAX_ACCOMMODATION_IMAGES = 15;

type AccommodationDisplayImage = {
  id: string;
  isCover?: boolean;
};

export const getAccommodationDisplayImages = <
  T extends AccommodationDisplayImage,
>(
  images: T[],
  coverImageId?: string | null,
) => {
  const coverImage =
    (coverImageId
      ? images.find((image) => image.id === coverImageId)
      : images.find((image) => image.isCover)) ?? images[0];

  const galleryImages = images.filter((image) => image.id !== coverImage?.id);

  const presentationImage = galleryImages[0] ?? coverImage;

  return {
    coverImage,
    galleryImages,
    presentationImage,
  };
};
