"use server";

import type { AccommodationStatus } from "@/generated/prisma/client";

import {
  createAccommodationImagesSchema,
  createAccommodationSchema,
  type CreateAccommodationFormValues,
  type CreateAccommodationImageInput,
} from "./nouveau/schema";

import { deleteUploadThingFiles } from "@/lib/admin/uploadthing/delete-files";
import { revalidateAccommodation } from "@/lib/admin/accommodation/revalidate-accommodation";
import { requireAdmin } from "@/lib/admin/require-admin";
import { prisma } from "@/lib/prisma";

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
      field?: keyof CreateAccommodationFormValues;
      message: string;
    };

export const updateAccommodationStatus = async (
  id: string,
  status: AccommodationStatus,
) => {
  await requireAdmin();

  await prisma.accommodation.update({
    where: { id },
    data: {
      status,
      publishedAt: status === "PUBLISHED" ? new Date() : null,
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
  values: CreateAccommodationFormValues,
  images: CreateAccommodationImageInput[] = [],
): Promise<CreateAccommodationResult> => {
  await requireAdmin();

  const result = createAccommodationSchema.safeParse(values);
  const imagesResult = createAccommodationImagesSchema.safeParse(images);

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
