"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import {
  accommodationImagesSchema,
  accommodationsSchema,
  AccommodationUpdateImageInput,
  accommodationUpdateImagesSchema,
  type AccommodationFormValues,
  type AccommodationImageInput,
} from "./schema";

import type { AccommodationStatus } from "@/generated/prisma/client";
import { deleteUploadThingFiles } from "@/lib/admin/uploadthing/delete-files";
import { revalidateAccommodation } from "@/lib/admin/accommodation/revalidate-accommodation";
import { requireAdmin } from "@/lib/admin/require-admin";

type AccommodationPosition = {
  id: string;
  position: number;
};

type CreateAccommodationResult =
  | {
      success: true;
      slug: string;
    }
  | {
      success: false;
      field?: keyof AccommodationFormValues;
      message: string;
    };

export const updateAccommodationStatus = async (
  id: string,
  status: AccommodationStatus,
) => {
  await requireAdmin();

  const accommodation = await prisma.accommodation.findUnique({
    where: {
      id,
    },
    select: {
      publishedAt: true,
    },
  });

  if (!accommodation) {
    throw new Error("Logement introuvable.");
  }

  await prisma.accommodation.update({
    where: {
      id,
    },
    data: {
      status,
      publishedAt:
        status === "PUBLISHED"
          ? (accommodation.publishedAt ?? new Date())
          : null,
    },
  });

  revalidateAccommodation();
};

export const reorderAccommodations = async (
  accommodations: AccommodationPosition[],
) => {
  await requireAdmin();

  await prisma.$transaction(
    accommodations.map(({ id, position }) =>
      prisma.accommodation.update({
        where: { id },
        data: { position },
      }),
    ),
  );

  revalidateAccommodation();
};

export const deleteAccommodation = async (id: string) => {
  await requireAdmin();

  const accommodation = await prisma.accommodation.findUnique({
    where: { id },
    select: {
      position: true,
      images: {
        select: {
          fileKey: true,
        },
      },
    },
  });

  if (!accommodation) {
    throw new Error("Logement introuvable.");
  }

  const fileKeys = accommodation.images.map((image) => image.fileKey);

  await prisma.$transaction([
    prisma.accommodation.delete({
      where: { id },
    }),

    prisma.accommodation.updateMany({
      where: {
        position: {
          gt: accommodation.position,
        },
      },
      data: {
        position: {
          decrement: 1,
        },
      },
    }),
  ]);

  await deleteUploadThingFiles(
    fileKeys,
    "Impossible de supprimer les fichiers UploadThing du logement.",
  );

  revalidateAccommodation();
};

export const createAccommodation = async (
  values: AccommodationFormValues,
  images: AccommodationImageInput[] = [],
): Promise<CreateAccommodationResult> => {
  await requireAdmin();

  const result = accommodationsSchema.safeParse(values);
  const imagesResult = accommodationImagesSchema.safeParse(images);

  const cleanupImages = async () => {
    await deleteUploadThingFiles(
      images.map((image) => image.fileKey).filter(Boolean),
      "Impossible de supprimer les fichiers UploadThing après l'échec de création.",
    );
  };

  if (!result.success || !imagesResult.success) {
    await cleanupImages();

    return {
      success: false,
      message: "Les informations renseignées sont invalides.",
    };
  }

  const data = result.data;
  const uploadedImages = imagesResult.data;

  if (data.status === "ARCHIVED") {
    await cleanupImages();

    return {
      success: false,
      field: "status",
      message: "Un logement ne peut pas être créé avec le statut archivé.",
    };
  }

  const existingAccommodation = await prisma.accommodation.findUnique({
    where: {
      slug: data.slug,
    },
    select: {
      id: true,
    },
  });

  if (existingAccommodation) {
    await cleanupImages();

    return {
      success: false,
      field: "slug",
      message: "Ce slug est déjà utilisé par un autre logement.",
    };
  }

  try {
    const accommodation = await prisma.$transaction(async (tx) => {
      const highestPosition = await tx.accommodation.aggregate({
        _max: {
          position: true,
        },
      });

      return tx.accommodation.create({
        data: {
          name: data.name,
          slug: data.slug,
          type: data.type || null,
          subtitle: data.subtitle || null,
          shortDescription: data.shortDescription || null,
          description: data.description || null,
          status: data.status,
          position: (highestPosition._max.position ?? 0) + 1,
          publishedAt: data.status === "PUBLISHED" ? new Date() : null,

          images: {
            create: uploadedImages.map((image, index) => ({
              url: image.url,
              fileKey: image.fileKey,
              alt: null,
              caption: null,
              position: index + 1,
              isCover: image.isCover,
            })),
          },
        },
      });
    });

    revalidateAccommodation();

    return {
      success: true,
      slug: accommodation.slug,
    };
  } catch (error) {
    await cleanupImages();

    console.error("Erreur lors de la création du logement.", error);

    return {
      success: false,
      message: "Impossible de créer le logement.",
    };
  }
};

export const updateAccommodation = async (
  id: string,
  values: AccommodationFormValues,
  images: AccommodationUpdateImageInput[],
) => {
  await requireAdmin();

  const parsedValues = accommodationsSchema.safeParse(values);

  const parsedImages = accommodationUpdateImagesSchema.safeParse(images);

  const uploadedFileKeys = images.flatMap((image) => {
    if ("fileKey" in image && typeof image.fileKey === "string") {
      return [image.fileKey];
    }

    return [];
  });

  const cleanupUploadedImages = async () => {
    await deleteUploadThingFiles(
      uploadedFileKeys,
      "Impossible de supprimer les fichiers UploadThing après l'échec de modification.",
    );
  };

  if (!parsedValues.success || !parsedImages.success) {
    await cleanupUploadedImages();

    if (!parsedValues.success) {
      const issue = parsedValues.error.issues[0];

      return {
        success: false as const,
        field: issue.path[0] as keyof AccommodationFormValues,
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
    },
  });

  if (!accommodation) {
    await cleanupUploadedImages();

    return {
      success: false as const,
      message: "Le logement est introuvable.",
    };
  }

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
    await cleanupUploadedImages();

    return {
      success: false as const,
      message: "Une des images sélectionnées n’appartient pas à ce logement.",
    };
  }

  const slugAlreadyExists = await prisma.accommodation.findFirst({
    where: {
      slug: data.slug,
      id: {
        not: id,
      },
    },
    select: {
      id: true,
    },
  });

  if (slugAlreadyExists) {
    await cleanupUploadedImages();

    return {
      success: false as const,
      field: "slug" as const,
      message: "Cette URL est déjà utilisée par un autre logement.",
    };
  }

  const submittedImageIds = new Set(submittedExistingImageIds);

  const removedImages = accommodation.images.filter(
    (image) => !submittedImageIds.has(image.id),
  );

  try {
    await prisma.$transaction(async (tx) => {
      await tx.accommodation.update({
        where: {
          id,
        },
        data: {
          name: data.name,
          slug: data.slug,
          type: data.type || null,
          subtitle: data.subtitle || null,
          shortDescription: data.shortDescription || null,
          description: data.description || null,
          status: data.status,
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
    });

    await deleteUploadThingFiles(
      removedImages.map((image) => image.fileKey),
      "Impossible de supprimer les anciennes images UploadThing du logement.",
    );

    revalidateAccommodation();

    revalidatePath(`/logements/${accommodation.slug}`);

    if (accommodation.slug !== data.slug) {
      revalidatePath(`/logements/${data.slug}`);
    }

    return {
      success: true as const,
    };
  } catch (error) {
    await cleanupUploadedImages();

    console.error("Erreur pendant la modification du logement :", error);

    return {
      success: false as const,
      message: "Une erreur est survenue pendant la modification du logement.",
    };
  }
};
