import { revalidatePath } from "next/cache";

import {
  accommodationUpdateImagesSchema,
  accommodationUpdateSchema,
  type AccommodationUpdateFormValues,
  type AccommodationUpdateImageInput,
} from "~/app/admin/logements/schema";

import { deleteUploadThingFiles } from "@/lib/admin/uploadthing/delete-files";
import { prisma } from "@/lib/prisma";

import {
  getAccommodationDraftFileKeys,
  parseAccommodationDraftContent,
} from "./accommodation-draft";
import { revalidateAccommodation } from "./revalidate-accommodation";
import {
  getAccommodationUpdateImageFileKeys,
  getRemovedAccommodationImages,
  hasForeignAccommodationImage,
  syncAccommodationImages,
} from "./sync-accommodation-images";
import {
  hasForeignAccommodationHighlight,
  syncAccommodationHighlights,
} from "./sync-accommodation-highlights";

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

  // Only delete uploads created by this request if it fails.
  const newlyUploadedFileKeys = submittedFileKeys.filter(
    (fileKey) => !draftFileKeys.has(fileKey),
  );

  const cleanupNewlyUploadedImages = async () => {
    await deleteUploadThingFiles(newlyUploadedFileKeys);
  };

  const parsedValues = accommodationUpdateSchema.safeParse(values);
  const parsedImages = accommodationUpdateImagesSchema.safeParse(images);

  if (!parsedValues.success || !parsedImages.success) {
    await cleanupNewlyUploadedImages();

    if (!parsedValues.success) {
      const issue = parsedValues.error.issues[0];

      return {
        success: false as const,
        field: issue.path[0] as keyof AccommodationUpdateFormValues,
        message: issue.message,
      };
    }

    return {
      success: false as const,
      message: "Les images renseignées sont invalides.",
    };
  }

  const data = parsedValues.data;
  const finalImages = parsedImages.data;

  const invalidExistingImage = hasForeignAccommodationImage(
    finalImages,
    accommodation.images.map((image) => image.id),
  );

  if (invalidExistingImage) {
    await cleanupNewlyUploadedImages();

    return {
      success: false as const,
      message: "Une des images sélectionnées n’appartient pas à ce logement.",
    };
  }

  const invalidExistingHighlight = hasForeignAccommodationHighlight(
    data.highlights,
    accommodation.highlights.map((highlight) => highlight.id),
  );

  if (invalidExistingHighlight) {
    await cleanupNewlyUploadedImages();

    return {
      success: false as const,
      message: "Un point fort n’appartient pas à ce logement.",
    };
  }

  const removedImages = getRemovedAccommodationImages(
    accommodation.images,
    finalImages,
  );

  // Delete draft files that are not kept by the direct update.
  const submittedFileKeySet = new Set(submittedFileKeys);

  const abandonedDraftFileKeys = [...draftFileKeys].filter(
    (fileKey) => !submittedFileKeySet.has(fileKey),
  );

  try {
    await prisma.$transaction(async (tx) => {
      await tx.accommodation.update({
        where: {
          id,
        },

        data: {
          name: data.name,
          type: data.type || null,
          subtitle: data.subtitle || null,
          shortDescription: data.shortDescription || null,
          description: data.description || null,

          guestCapacity: data.guestCapacity,
          bedrooms: data.bedrooms,
          beds: data.beds,
          bathrooms: data.bathrooms,
          surface: data.surface,

          status: data.status,

          publishedAt:
            data.status === "PUBLISHED"
              ? (accommodation.publishedAt ?? new Date())
              : null,
        },
      });

      await syncAccommodationImages(tx, id, finalImages);

      await syncAccommodationHighlights(tx, id, data.highlights);

      await tx.accommodationDraft.deleteMany({
        where: {
          accommodationId: id,
        },
      });
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

  revalidateAccommodation();
  revalidatePath(`/logements/${accommodation.slug}`);

  return {
    success: true as const,
  };
};
