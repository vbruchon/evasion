import { prisma } from "@/lib/prisma";

export const getContactPageAccommodations = async () => {
  const accommodations = await prisma.accommodation.findMany({
    where: {
      status: "PUBLISHED",
    },

    orderBy: {
      position: "asc",
    },

    select: {
      id: true,
      name: true,

      images: {
        orderBy: [
          {
            isCover: "desc",
          },
          {
            position: "asc",
          },
        ],

        take: 1,

        select: {
          url: true,
        },
      },
    },
  });

  return accommodations.map((accommodation) => ({
    id: accommodation.id,
    name: accommodation.name,
    imageUrl: accommodation.images[0]?.url ?? null,
  }));
};

export type ContactPageAccommodation = Awaited<
  ReturnType<typeof getContactPageAccommodations>
>[number];
