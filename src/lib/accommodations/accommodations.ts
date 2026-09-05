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

      highlights: {
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

      highlights: {
        orderBy: {
          position: "asc",
        },
      },

      amenities: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });
};

export const getAdminAccommodations = async () => {
  return prisma.accommodation.findMany({
    orderBy: {
      position: "asc",
    },

    include: {
      images: {
        orderBy: {
          position: "asc",
        },
      },

      draft: {
        select: {
          id: true,
          updatedAt: true,
        },
      },
    },
  });
};
