import { prisma } from "@/lib/prisma";
import { mapReviewWithAccommodation } from "@/lib/reviews/map-review-with-accommodation";

import type { ReviewsPageReviewsResult } from "../reviews-page.types";

type GetReviewsPageReviewsOptions = {
  accommodationSlug?: string;
  offset?: number;
  take?: number;
};

export const getReviewsPageReviews = async ({
  accommodationSlug,
  offset = 0,
  take = 6,
}: GetReviewsPageReviewsOptions = {}): Promise<ReviewsPageReviewsResult> => {
  const safeOffset = Number.isFinite(offset)
    ? Math.max(0, Math.floor(offset))
    : 0;

  const safeTake = Number.isFinite(take)
    ? Math.max(1, Math.min(Math.floor(take), 24))
    : 6;

  const reviews = await prisma.accommodationReview.findMany({
    where: {
      accommodation: {
        status: "PUBLISHED",

        ...(accommodationSlug
          ? {
              slug: accommodationSlug,
            }
          : {}),
      },
    },

    orderBy: [
      {
        reviewedAt: "desc",
      },
      {
        id: "desc",
      },
    ],

    skip: safeOffset,
    take: safeTake + 1,

    select: {
      id: true,
      authorName: true,
      rating: true,
      comment: true,
      reviewedAt: true,

      accommodation: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
  });

  const hasMore = reviews.length > safeTake;
  const visibleReviews = reviews.slice(0, safeTake);

  return {
    reviews: visibleReviews.map(mapReviewWithAccommodation),
    hasMore,
    nextOffset: hasMore ? safeOffset + visibleReviews.length : null,
  };
};

export const getReviewsPageAccommodationFilters = async () => {
  return prisma.accommodation.findMany({
    where: {
      status: "PUBLISHED",

      reviews: {
        some: {},
      },
    },

    orderBy: {
      position: "asc",
    },

    select: {
      id: true,
      name: true,
      slug: true,
    },
  });
};
