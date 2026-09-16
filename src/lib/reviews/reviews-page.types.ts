export type ReviewsPageReview = {
  id: string;
  authorName: string;
  rating: number;
  comment: string;
  reviewedAt: string;
  accommodation: {
    name: string;
    slug: string;
  };
};

export type ReviewsPageReviewsResult = {
  reviews: ReviewsPageReview[];
  hasMore: boolean;
  nextOffset: number | null;
};
