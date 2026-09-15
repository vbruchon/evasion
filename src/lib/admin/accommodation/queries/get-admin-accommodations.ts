import { prisma } from "@/lib/prisma";

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
