type RecentReviewCandidate = {
  id: string;
  reviewedAt: string;

  accommodation: {
    slug: string;
  };
};

const compareReviewsByDate = <TReview extends RecentReviewCandidate>(
  firstReview: TReview,
  secondReview: TReview,
) => {
  const dateComparison = secondReview.reviewedAt.localeCompare(
    firstReview.reviewedAt,
  );

  if (dateComparison !== 0) {
    return dateComparison;
  }

  return secondReview.id.localeCompare(firstReview.id);
};

export const selectRecentDiverseReviews = <
  TReview extends RecentReviewCandidate,
>(
  reviews: readonly TReview[],
  count: number,
) => {
  const safeCount = Number.isFinite(count) ? Math.max(0, Math.floor(count)) : 0;

  if (safeCount === 0) {
    return [];
  }

  const orderedReviews = [...reviews].sort(compareReviewsByDate);
  const selectedReviews: TReview[] = [];

  const selectedReviewIds = new Set<string>();
  const selectedAccommodationSlugs = new Set<string>();

  for (const review of orderedReviews) {
    if (selectedAccommodationSlugs.has(review.accommodation.slug)) {
      continue;
    }

    selectedReviews.push(review);
    selectedReviewIds.add(review.id);
    selectedAccommodationSlugs.add(review.accommodation.slug);

    if (selectedReviews.length === safeCount) {
      return selectedReviews;
    }
  }

  for (const review of orderedReviews) {
    if (selectedReviewIds.has(review.id)) {
      continue;
    }

    selectedReviews.push(review);

    if (selectedReviews.length === safeCount) {
      break;
    }
  }

  return selectedReviews.sort(compareReviewsByDate);
};
