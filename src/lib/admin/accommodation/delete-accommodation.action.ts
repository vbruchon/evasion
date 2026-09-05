import { deleteUploadThingFiles } from "@/lib/admin/uploadthing/delete-files";
import { prisma } from "@/lib/prisma";

import { revalidateAccommodation } from "./revalidate-accommodation";

export const deleteAccommodationAdmin = async (id: string) => {
  const accommodation = await prisma.accommodation.findUnique({
    where: {
      id,
    },

    select: {
      id: true,
      slug: true,
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
      where: {
        id,
      },
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

  await deleteUploadThingFiles(fileKeys);

  revalidateAccommodation({
    id: accommodation.id,
    slug: accommodation.slug,
  });
};
