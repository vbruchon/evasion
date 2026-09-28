import { prisma } from "@/lib/prisma";

export type AccommodationHeroImage = {
  src: string;
  alt: string;
};

export const getAccommodationHeroImages = async (): Promise<
  AccommodationHeroImage[]
> => {
  const accommodations = await prisma.accommodation.findMany({
    where: {
      status: "PUBLISHED",
    },

    orderBy: {
      position: "asc",
    },

    select: {
      name: true,

      images: {
        take: 1,

        orderBy: [
          {
            isCover: "desc",
          },
          {
            position: "asc",
          },
        ],

        select: {
          url: true,
          alt: true,
        },
      },
    },
  });

  return accommodations.flatMap((accommodation) => {
    const image = accommodation.images[0];

    if (!image) {
      return [];
    }

    return [
      {
        src: image.url,
        alt: image.alt?.trim() || `${accommodation.name}, hébergement Évasion`,
      },
    ];
  });
};
