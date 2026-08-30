import type { Prisma } from "@/generated/prisma/client";

import type { AccommodationUpdateImageInput } from "~/app/admin/logements/schema";

type ExistingAccommodationImage = {
  id: string;
  fileKey: string;
};

export const getAccommodationUpdateImageFileKeys = (
  images: AccommodationUpdateImageInput[],
) => images.flatMap((image) => ("fileKey" in image ? [image.fileKey] : []));

export const getAccommodationUpdateExistingImageIds = (
  images: AccommodationUpdateImageInput[],
) => images.flatMap((image) => ("id" in image ? [image.id] : []));

export const hasForeignAccommodationImage = (
  images: AccommodationUpdateImageInput[],
  existingImageIds: Iterable<string>,
) => {
  const existingIds = new Set(existingImageIds);

  return getAccommodationUpdateExistingImageIds(images).some(
    (imageId) => !existingIds.has(imageId),
  );
};

export const getRemovedAccommodationImages = (
  existingImages: ExistingAccommodationImage[],
  images: AccommodationUpdateImageInput[],
) => {
  const submittedImageIds = new Set(
    getAccommodationUpdateExistingImageIds(images),
  );

  return existingImages.filter((image) => !submittedImageIds.has(image.id));
};

export const syncAccommodationImages = async (
  tx: Prisma.TransactionClient,
  accommodationId: string,
  images: AccommodationUpdateImageInput[],
) => {
  const existingImageIds = getAccommodationUpdateExistingImageIds(images);

  await tx.accommodationImage.deleteMany({
    where: {
      accommodationId,

      ...(existingImageIds.length > 0
        ? {
            id: {
              notIn: existingImageIds,
            },
          }
        : {}),
    },
  });

  for (const [position, image] of images.entries()) {
    if ("id" in image) {
      await tx.accommodationImage.update({
        where: {
          id: image.id,
        },

        data: {
          position,
          isCover: image.isCover,
        },
      });

      continue;
    }

    await tx.accommodationImage.create({
      data: {
        accommodationId,
        url: image.url,
        fileKey: image.fileKey,
        alt: null,
        caption: null,
        position,
        isCover: image.isCover,
      },
    });
  }
};
