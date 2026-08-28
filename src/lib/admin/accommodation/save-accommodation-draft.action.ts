import {
  accommodationDraftContentSchema,
  type AccommodationDraftContent,
  type AccommodationUpdateImageInput,
} from "~/app/admin/logements/schema";

import { deleteUploadThingFiles } from "@/lib/admin/uploadthing/delete-files";
import { prisma } from "@/lib/prisma";

import {
  getAccommodationDraftFileKeys,
  parseAccommodationDraftContent,
} from "./accommodation-draft";

type AccommodationDraftValues = AccommodationDraftContent["values"];

export const saveAccommodationDraftAdmin = async (
  accommodationId: string,
  values: AccommodationDraftValues,
  images: AccommodationUpdateImageInput[],
) => {
  const accommodation = await prisma.accommodation.findUnique({
    where: {
      id: accommodationId,
    },

    select: {
      id: true,
      status: true,

      images: {
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
    const incomingFileKeys = images.flatMap((image) =>
      "fileKey" in image ? [image.fileKey] : [],
    );

    await deleteUploadThingFiles(incomingFileKeys);

    throw new Error("Logement introuvable.");
  }

  const previousDraft = accommodation.draft
    ? parseAccommodationDraftContent(accommodation.draft.content)
    : null;

  const previousDraftFileKeys = new Set(
    previousDraft ? getAccommodationDraftFileKeys(previousDraft) : [],
  );

  const incomingFileKeys = images.flatMap((image) =>
    "fileKey" in image ? [image.fileKey] : [],
  );

  const newlyUploadedFileKeys = incomingFileKeys.filter(
    (fileKey) => !previousDraftFileKeys.has(fileKey),
  );

  const contentResult = accommodationDraftContentSchema.safeParse({
    version: 1,
    values,
    images,
  });

  if (!contentResult.success) {
    await deleteUploadThingFiles(newlyUploadedFileKeys);

    return {
      success: false as const,
      message: "Les données du brouillon sont invalides.",
    };
  }

  const content = contentResult.data;

  if (accommodation.status !== "PUBLISHED") {
    await deleteUploadThingFiles(newlyUploadedFileKeys);

    return {
      success: false as const,
      message:
        "Un brouillon de modifications ne peut être créé que pour un logement publié.",
    };
  }

  const accommodationImageIds = new Set(
    accommodation.images.map((image) => image.id),
  );

  const hasForeignImage = content.images.some(
    (image) => "id" in image && !accommodationImageIds.has(image.id),
  );

  if (hasForeignImage) {
    await deleteUploadThingFiles(newlyUploadedFileKeys);

    return {
      success: false as const,
      message: "Une image sélectionnée n'appartient pas à ce logement.",
    };
  }

  try {
    await prisma.accommodationDraft.upsert({
      where: {
        accommodationId,
      },

      create: {
        accommodationId,
        content,
      },

      update: {
        content,
      },
    });
  } catch (error) {
    await deleteUploadThingFiles(newlyUploadedFileKeys);

    throw error;
  }

  const currentDraftFileKeys = new Set(getAccommodationDraftFileKeys(content));

  const obsoleteDraftFileKeys = previousDraft
    ? getAccommodationDraftFileKeys(previousDraft).filter(
        (fileKey) => !currentDraftFileKeys.has(fileKey),
      )
    : [];

  await deleteUploadThingFiles(obsoleteDraftFileKeys);

  return {
    success: true as const,
  };
};
