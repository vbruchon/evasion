import { prisma } from "@/lib/prisma";

export const getPublishedAccommodations = async () => {
  return prisma.accommodation.findMany({
    where: {
      status: "PUBLISHED",
    },
    orderBy: {
      position: "asc",
    },
    include: {
      images: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });
};

export const getPublishedAccommodationBySlug = async (slug: string) => {
  return prisma.accommodation.findFirst({
    where: {
      slug,
      status: "PUBLISHED",
    },
    include: {
      images: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });
};
