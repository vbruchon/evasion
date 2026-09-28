import type { ReviewWithAccommodation } from "./review.types";

export type ReviewsPageReviewsResult = {
  reviews: ReviewWithAccommodation[];
  hasMore: boolean;
  nextOffset: number | null;
};
