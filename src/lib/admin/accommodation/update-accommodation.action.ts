import { revalidatePath } from "next/cache";

import {
  accommodationUpdateSchema,
  type AccommodationUpdateFormValues,
  type AccommodationUpdateImageInput,
  accommodationUpdateImagesSchema,
} from "~/app/admin/logements/schema";

import { deleteUploadThingFiles } from "@/lib/admin/uploadthing/delete-files";
import { prisma } from "@/lib/prisma";

import {
  getAccommodationDraftFileKeys,
  parseAccommodationDraftContent,
} from "./accommodation-draft";
import { revalidateAccommodation } from "./revalidate-accommodation";

export const updateAccommodationAdmin = async (
  id: string,
  values: AccommodationUpdateFormValues,
  images: AccommodationUpdateImageInput[],
) => {
  const submittedFileKeys = images.flatMap((image) =>
    "fileKey" in image && typeof image.fileKey === "string"
      ? [image.fileKey]
      : [],
  );

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

  /*
   * Un fileKey déjà présent dans le brouillon correspond à une image
   * uploadée lors d'une précédente sauvegarde.
   *
   * Elle ne doit donc pas être supprimée si la requête actuelle échoue.
   */
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

  const existingImageIds = new Set(
    accommodation.images.map((image) => image.id),
  );

  const submittedExistingImageIds = finalImages
    .filter(
      (
        image,
      ): image is Extract<AccommodationUpdateImageInput, { id: string }> =>
        "id" in image,
    )
    .map((image) => image.id);

  const invalidExistingImage = submittedExistingImageIds.some(
    (imageId) => !existingImageIds.has(imageId),
  );

  if (invalidExistingImage) {
    await cleanupNewlyUploadedImages();

    return {
      success: false as const,
      message: "Une des images sélectionnées n’appartient pas à ce logement.",
    };
  }

  const submittedImageIds = new Set(submittedExistingImageIds);

  const removedImages = accommodation.images.filter(
    (image) => !submittedImageIds.has(image.id),
  );

  /*
   * Images uniquement présentes dans l'ancien brouillon et qui ne font
   * pas partie de l'enregistrement direct actuel.
   *
   * Une image du brouillon présente dans submittedFileKeys est au contraire
   * promue en AccommodationImage et doit donc être conservée.
   */
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
          status: data.status,
          guestCapacity: data.guestCapacity,
          bedrooms: data.bedrooms,
          beds: data.beds,
          bathrooms: data.bathrooms,
          surface: data.surface,
          publishedAt:
            data.status === "PUBLISHED"
              ? (accommodation.publishedAt ?? new Date())
              : null,
        },
      });

      if (removedImages.length > 0) {
        await tx.accommodationImage.deleteMany({
          where: {
            accommodationId: id,
            id: {
              in: removedImages.map((image) => image.id),
            },
          },
        });
      }

      for (const [index, image] of finalImages.entries()) {
        if ("id" in image) {
          await tx.accommodationImage.update({
            where: {
              id: image.id,
            },
            data: {
              position: index,
              isCover: image.isCover,
            },
          });

          continue;
        }

        await tx.accommodationImage.create({
          data: {
            accommodationId: id,
            url: image.url,
            fileKey: image.fileKey,
            alt: null,
            caption: null,
            position: index,
            isCover: image.isCover,
          },
        });
      }

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
