import type { ReviewWithAccommodation } from "./review.types";

type ReviewWithAccommodationSource = {
  id: string;
  authorName: string;
  rating: number;
  comment: string;
  reviewedAt: Date;

  accommodation: {
    name: string;
    slug: string;
  };
};

export const mapReviewWithAccommodation = (
  review: ReviewWithAccommodationSource,
): ReviewWithAccommodation => ({
  ...review,
  reviewedAt: review.reviewedAt.toISOString(),
});
