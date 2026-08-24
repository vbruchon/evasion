import { revalidatePath } from "next/cache";

import { deleteUploadThingFiles } from "@/lib/admin/uploadthing/delete-files";
import { prisma } from "@/lib/prisma";

import { revalidateAccommodation } from "./revalidate-accommodation";
import {
  AccommodationFormValues,
  AccommodationUpdateImageInput,
  accommodationsSchema,
  accommodationUpdateImagesSchema,
} from "~/app/admin/logements/schema";

export const updateAccommodationAdmin = async (
  id: string,
  values: AccommodationFormValues,
  images: AccommodationUpdateImageInput[],
) => {
  const parsedValues = accommodationsSchema.safeParse(values);

  const parsedImages = accommodationUpdateImagesSchema.safeParse(images);

  const uploadedFileKeys = images.flatMap((image) => {
    if ("fileKey" in image && typeof image.fileKey === "string") {
      return [image.fileKey];
    }

    return [];
  });

  const cleanupUploadedImages = async () => {
    await deleteUploadThingFiles(uploadedFileKeys);
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

    await deleteUploadThingFiles(removedImages.map((image) => image.fileKey));

    revalidateAccommodation();

    revalidatePath(`/logements/${accommodation.slug}`);

    if (accommodation.slug !== data.slug) {
      revalidatePath(`/logements/${data.slug}`);
    }

    return {
      success: true as const,
    };
  } catch {
    await cleanupUploadedImages();

    return {
      success: false as const,
      message: "Une erreur est survenue pendant la modification du logement.",
    };
  }
};
