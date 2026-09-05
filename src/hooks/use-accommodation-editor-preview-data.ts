import { useFormContext, useWatch } from "react-hook-form";

import type { AccommodationUpdateFormValues } from "~/app/admin/logements/schema";

import type { AccommodationPreviewImage } from "@/hooks/use-accommodation-images";
import { getAccommodationDisplayImages } from "@/lib/accommodations/accommodation-images";

type UseAccommodationEditorPreviewDataOptions = {
  images: AccommodationPreviewImage[];
  coverImageId: string | null;
  presentationImageId: string | null;
};

export const useAccommodationEditorPreviewData = ({
  images,
  coverImageId,
  presentationImageId,
}: UseAccommodationEditorPreviewDataOptions) => {
  const { control } = useFormContext<AccommodationUpdateFormValues>();

  const [
    name,
    type,
    subtitle,
    shortDescription,
    description,
    guestCapacity,
    bedrooms,
    beds,
    bathrooms,
    surface,
    highlights,
    amenities,
  ] = useWatch({
    control,
    name: [
      "name",
      "type",
      "subtitle",
      "shortDescription",
      "description",
      "guestCapacity",
      "bedrooms",
      "beds",
      "bathrooms",
      "surface",
      "highlights",
      "amenities",
    ],
  });

  const accommodation = {
    name,
    type,
    subtitle,
    shortDescription,
    description,
    guestCapacity,
    bedrooms,
    beds,
    bathrooms,
    surface,
  };

  const previewImages = images.map((image) => ({
    id: image.id,
    url: image.url,
    alt: image.alt ?? null,
  }));

  const { coverImage, presentationImage } = getAccommodationDisplayImages(
    previewImages,
    coverImageId,
    presentationImageId,
  );

  return {
    accommodation,
    amenities,
    coverImage,
    highlights,
    name,
    presentationImage,
    previewImages,
  };
};
