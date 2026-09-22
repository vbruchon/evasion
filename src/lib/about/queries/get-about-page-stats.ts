import { prisma } from "@/lib/prisma";

export const getAboutPageStats = async () => {
  const [totalAccommodations, reviewsSummary] = await Promise.all([
    prisma.accommodation.count({
      where: {
        status: "PUBLISHED",
      },
    }),

    prisma.accommodationReview.aggregate({
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
    }),
  ]);

  return {
    totalAccommodations,
    totalReviews: reviewsSummary._count._all,
    averageRating: reviewsSummary._avg.rating ?? 0,
  };
};
