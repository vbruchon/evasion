import { prisma } from "@/lib/prisma";

export const getReviewsSummary = async () => {
  const summary = await prisma.accommodationReview.aggregate({
    where: {
      accommodation: {
        status: "PUBLISHED",
      },
    },

    _avg: {
      rating: true,
    },

    _count: {
      _all: true,
    },
  });

  return {
    averageRating: summary._avg.rating ?? 0,
    totalReviews: summary._count._all,
  };
};
