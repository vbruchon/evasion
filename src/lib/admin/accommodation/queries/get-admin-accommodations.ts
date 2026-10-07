import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin/require-admin";

export const getAdminAccommodations = async () => {
  await requireAdmin();

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
