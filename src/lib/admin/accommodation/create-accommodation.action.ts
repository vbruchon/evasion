import { deleteUploadThingFiles } from "@/lib/admin/uploadthing/delete-files";
import { prisma } from "@/lib/prisma";

import { revalidateAccommodation } from "./revalidate-accommodation";
import {
  AccommodationFormValues,
  AccommodationImageInput,
  accommodationsSchema,
  accommodationImagesSchema,
} from "~/app/admin/logements/schema";

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

export const createAccommodationAdmin = async (
  values: AccommodationFormValues,
  images: AccommodationImageInput[] = [],
): Promise<CreateAccommodationResult> => {
  const result = accommodationsSchema.safeParse(values);
  const imagesResult = accommodationImagesSchema.safeParse(images);

  const cleanupImages = async () => {
    await deleteUploadThingFiles(
      images.map((image) => image.fileKey).filter(Boolean),
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
  } catch {
    await cleanupImages();

    return {
      success: false,
      message: "Impossible de créer le logement.",
    };
  }
};
