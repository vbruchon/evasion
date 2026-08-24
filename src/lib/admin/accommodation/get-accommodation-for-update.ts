import { prisma } from "@/lib/prisma";

export const getAccommodationForUpdate = async (id: string) =>
  prisma.accommodation.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      type: true,
      subtitle: true,
      shortDescription: true,
      description: true,
      status: true,

      images: {
        orderBy: {
          position: "asc",
        },
        select: {
          id: true,
          url: true,
          fileKey: true,
          alt: true,
          isCover: true,
        },
      },
    },
  });

export type AccommodationUpdateData = NonNullable<
  Awaited<ReturnType<typeof getAccommodationForUpdate>>
>;
