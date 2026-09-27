import { prisma } from "@/lib/prisma";
import { getRecentReviewCandidates } from "@/lib/reviews/queries/get-recent-review-candidates";
import { getReviewsPageContent } from "@/lib/reviews/queries/get-reviews-page-content";
import {
  getReviewsPageAccommodationFilters,
  getReviewsPageReviews,
} from "@/lib/reviews/queries/get-reviews-page-reviews";
import { getReviewsSummary } from "@/lib/reviews/queries/get-reviews-summary";
import { selectRecentDiverseReviews } from "@/lib/reviews/select-recent-diverse-reviews";

const RECENT_REVIEWS_COUNT = 4;

export const getReviewsPageAdminData = async () => {
  const [
    content,
    summary,
    recentCandidates,
    initialReviews,
    accommodations,
    latestImport,
  ] = await Promise.all([
    getReviewsPageContent(),
    getReviewsSummary(),
    getRecentReviewCandidates(),
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

    recentReviews: selectRecentDiverseReviews(
      recentCandidates,
      RECENT_REVIEWS_COUNT,
    ),

    initialReviews,
    accommodations,

    lastReviewsImportAt:
      latestImport?.lastReviewsImportAt?.toISOString() ?? null,
  };
};

export type ReviewsPageAdminData = Awaited<
  ReturnType<typeof getReviewsPageAdminData>
>;
