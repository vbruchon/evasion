import { prisma } from "@/lib/prisma";
import { mapReviewWithAccommodation } from "@/lib/reviews/map-review-with-accommodation";

const RECENT_REVIEWS_PER_ACCOMMODATION = 4;

export const getRecentReviewCandidates = async () => {
  const accommodations = await prisma.accommodation.findMany({
    where: {
      status: "PUBLISHED",

      reviews: {
        some: {},
      },
    },

    orderBy: [
      {
        position: "asc",
      },
      {
        id: "asc",
      },
    ],

    select: {
      name: true,
      slug: true,

      reviews: {
        orderBy: [
          {
            reviewedAt: "desc",
          },
          {
            id: "desc",
          },
        ],

        take: RECENT_REVIEWS_PER_ACCOMMODATION,

        select: {
          id: true,
          authorName: true,
          rating: true,
          comment: true,
          reviewedAt: true,
        },
      },
    },
  });

  return accommodations.flatMap(({ reviews, ...accommodation }) =>
    reviews.map((review) =>
      mapReviewWithAccommodation({
        ...review,
        accommodation,
      }),
    ),
  );
};
