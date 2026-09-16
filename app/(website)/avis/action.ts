"use server";

import { getReviewsPageReviews } from "@/lib/reviews/queries/get-reviews-page-reviews";

type LoadReviewsPageReviewsOptions = {
  accommodationSlug?: string;
  offset?: number;
  take?: number;
};

export const loadReviewsPageReviews = async (
  options: LoadReviewsPageReviewsOptions,
) => {
  return getReviewsPageReviews(options);
};
