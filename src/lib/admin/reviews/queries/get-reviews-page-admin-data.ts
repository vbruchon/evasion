import { prisma } from "@/lib/prisma";
import { getReviewsPageContent } from "@/lib/reviews/queries/get-reviews-page-content";
import {
  getReviewsPageAccommodationFilters,
  getReviewsPageRecentReviews,
  getReviewsPageReviews,
} from "@/lib/reviews/queries/get-reviews-page-reviews";
import { getReviewsPageSummary } from "@/lib/reviews/queries/get-reviews-page-summary";
import { selectRandomReviews } from "@/lib/reviews/select-random-reviews";

const RECENT_REVIEWS_COUNT = 4;

export const getReviewsPageAdminData = async () => {
  const [
    content,
    summary,
    recentPool,
    initialReviews,
    accommodations,
    latestImport,
  ] = await Promise.all([
    getReviewsPageContent(),
    getReviewsPageSummary(),
    getReviewsPageRecentReviews(),
    getReviewsPageReviews(),
    getReviewsPageAccommodationFilters(),

    prisma.accommodation.findFirst({
      where: {
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
  ]);

  return {
    content,
    summary,

    recentReviews: selectRandomReviews(recentPool, RECENT_REVIEWS_COUNT),

    initialReviews,
    accommodations,

    lastReviewsImportAt:
      latestImport?.lastReviewsImportAt?.toISOString() ?? null,
  };
};

export type ReviewsPageAdminData = Awaited<
  ReturnType<typeof getReviewsPageAdminData>
>;
