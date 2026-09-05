import type {
  AccommodationUpdateFormValues,
  AccommodationUpdateImageInput,
} from "~/app/admin/logements/schema";

import { deleteUploadThingFiles } from "@/lib/admin/uploadthing/delete-files";
import { prisma } from "@/lib/prisma";

import {
  getAccommodationDraftFileKeys,
  parseAccommodationDraftContent,
} from "./accommodation-draft";
import { persistAccommodationUpdate } from "./persist-accommodation-update";
import { revalidateAccommodation } from "./revalidate-accommodation";
import {
  getAccommodationUpdateImageFileKeys,
  getRemovedAccommodationImages,
} from "./sync-accommodation-images";
import { validateAccommodationUpdate } from "./validate-accommodation-update";

export const updateAccommodationAdmin = async (
  id: string,
  values: AccommodationUpdateFormValues,
  images: AccommodationUpdateImageInput[],
) => {
  const submittedFileKeys = getAccommodationUpdateImageFileKeys(images);

  const accommodation = await prisma.accommodation.findUnique({
    where: {
      id,
    },

    select: {
      id: true,
      slug: true,
      publishedAt: true,

      images: {
        select: {
          id: true,
          fileKey: true,
        },
      },

      highlights: {
        select: {
          id: true,
        },
      },

      draft: {
        select: {
          content: true,
        },
      },
    },
  });

  if (!accommodation) {
    await deleteUploadThingFiles(submittedFileKeys);

    return {
      success: false as const,
      message: "Le logement est introuvable.",
    };
  }

  const draftContent = accommodation.draft
    ? parseAccommodationDraftContent(accommodation.draft.content)
    : null;

  const draftFileKeys = new Set(
    draftContent ? getAccommodationDraftFileKeys(draftContent) : [],
  );

  const newlyUploadedFileKeys = submittedFileKeys.filter(
    (fileKey) => !draftFileKeys.has(fileKey),
  );

  const cleanupNewlyUploadedImages = async () => {
    await deleteUploadThingFiles(newlyUploadedFileKeys);
  };

  const validation = validateAccommodationUpdate({
    values,
    images,
    existingImageIds: accommodation.images.map((image) => image.id),
    existingHighlightIds: accommodation.highlights.map(
      (highlight) => highlight.id,
    ),
  });

  if (!validation.success) {
    await cleanupNewlyUploadedImages();

    return validation;
  }

  const data = validation.data;
  const finalImages = validation.images;

  const removedImages = getRemovedAccommodationImages(
    accommodation.images,
    finalImages,
  );

  const submittedFileKeySet = new Set(submittedFileKeys);

  const abandonedDraftFileKeys = [...draftFileKeys].filter(
    (fileKey) => !submittedFileKeySet.has(fileKey),
  );

  let persistedImages;

  try {
    persistedImages = await persistAccommodationUpdate({
      accommodationId: id,
      publishedAt: accommodation.publishedAt,
      data,
      images: finalImages,
    });
  } catch {
    await cleanupNewlyUploadedImages();

    return {
      success: false as const,
      message: "Une erreur est survenue pendant la modification du logement.",
    };
  }

  const filesToDelete = [
    ...new Set([
      ...removedImages.map((image) => image.fileKey),
      ...abandonedDraftFileKeys,
    ]),
  ];

  await deleteUploadThingFiles(filesToDelete);

  revalidateAccommodation({
    slug: accommodation.slug,
    id: accommodation.id,
  });

  return {
    success: true as const,
    images: persistedImages,
  };
};
