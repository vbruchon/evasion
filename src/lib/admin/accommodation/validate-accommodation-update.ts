import {
  accommodationUpdateImagesSchema,
  accommodationUpdateSchema,
  type AccommodationUpdateFormValues,
  type AccommodationUpdateImageInput,
} from "~/app/admin/logements/schema";

import { hasForeignAccommodationImage } from "./sync-accommodation-images";
import { hasForeignAccommodationHighlight } from "./sync-accommodation-highlights";

type ValidateAccommodationUpdateOptions = {
  values: AccommodationUpdateFormValues;
  images: AccommodationUpdateImageInput[];
  existingImageIds: string[];
  existingHighlightIds: string[];
};

type ValidateAccommodationUpdateResult =
  | {
      success: true;
      data: AccommodationUpdateFormValues;
      images: AccommodationUpdateImageInput[];
    }
  | {
      success: false;
      field?: keyof AccommodationUpdateFormValues;
      message: string;
    };

export const validateAccommodationUpdate = ({
  values,
  images,
  existingImageIds,
  existingHighlightIds,
}: ValidateAccommodationUpdateOptions): ValidateAccommodationUpdateResult => {
  const parsedValues = accommodationUpdateSchema.safeParse(values);
  const parsedImages = accommodationUpdateImagesSchema.safeParse(images);

  if (!parsedValues.success) {
    const issue = parsedValues.error.issues[0];

    return {
      success: false,
      field: issue.path[0] as keyof AccommodationUpdateFormValues,
      message: issue.message,
    };
  }

  if (!parsedImages.success) {
    return {
      success: false,
      message: "Les images renseignées sont invalides.",
    };
  }

  const data = parsedValues.data;
  const finalImages = parsedImages.data;

  if (hasForeignAccommodationImage(finalImages, existingImageIds)) {
    return {
      success: false,
      message: "Une des images sélectionnées n’appartient pas à ce logement.",
    };
  }

  if (hasForeignAccommodationHighlight(data.highlights, existingHighlightIds)) {
    return {
      success: false,
      message: "Un point fort n’appartient pas à ce logement.",
    };
  }

  return {
    success: true,
    data,
    images: finalImages,
  };
};
