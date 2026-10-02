import type { AccommodationStatus } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { getReviewsSummary } from "@/lib/reviews/queries/get-reviews-summary";

export const getAdminDashboardSummary = async () => {
  const [statusCounts, reviewsSummary, latestReviewsImport] = await Promise.all(
    [
      prisma.accommodation.groupBy({
        by: ["status"],

        _count: {
          _all: true,
        },
      }),

      getReviewsSummary(),

      prisma.accommodation.findFirst({
        where: {
          status: "PUBLISHED",

          lastReviewsImportAt: {
            not: null,
          },
        },

        orderBy: {
          lastReviewsImportAt: "desc",
        },

        select: {
          lastReviewsImportAt: true,
        },
      }),
    ],
  );

  const getStatusCount = (status: AccommodationStatus) =>
    statusCounts.find((item) => item.status === status)?._count._all ?? 0;

  return {
    accommodations: {
      published: getStatusCount("PUBLISHED"),
      draft: getStatusCount("DRAFT"),
      archived: getStatusCount("ARCHIVED"),
    },

    reviews: {
      total: reviewsSummary.totalReviews,
      averageRating: reviewsSummary.averageRating,
      lastImportAt: latestReviewsImport?.lastReviewsImportAt ?? null,
    },
  };
};

export type AdminDashboardSummary = Awaited<
  ReturnType<typeof getAdminDashboardSummary>
>;
