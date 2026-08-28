import {
  accommodationDraftContentSchema,
  type AccommodationDraftContent,
} from "~/app/admin/logements/schema";

export const parseAccommodationDraftContent = (
  content: unknown,
): AccommodationDraftContent => {
  const result = accommodationDraftContentSchema.safeParse(content);

  if (!result.success) {
    throw new Error("Le brouillon du logement est invalide.");
  }

  return result.data;
};

export const getAccommodationDraftFileKeys = (
  content: AccommodationDraftContent,
) =>
  content.images.flatMap((image) =>
    "fileKey" in image ? [image.fileKey] : [],
  );

export const getAccommodationDraftExistingImageIds = (
  content: AccommodationDraftContent,
) => content.images.flatMap((image) => ("id" in image ? [image.id] : []));
