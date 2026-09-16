import { useState, useTransition } from "react";

import { loadReviewsPageReviews } from "~/app/(website)/avis/action";
import type {
  ReviewsPageReview,
  ReviewsPageReviewsResult,
} from "@/lib/reviews/reviews-page.types";

const ALL_ACCOMMODATIONS_VALUE = "all";

type UseReviewsPageListOptions = {
  initialResult: ReviewsPageReviewsResult;
  reviewsPerPage: number;
};

export const useReviewsPageList = ({
  initialResult,
  reviewsPerPage,
}: UseReviewsPageListOptions) => {
  const [reviews, setReviews] = useState<ReviewsPageReview[]>(
    initialResult.reviews,
  );

  const [hasMore, setHasMore] = useState(initialResult.hasMore);
  const [nextOffset, setNextOffset] = useState(initialResult.nextOffset);

  const [selectedAccommodation, setSelectedAccommodation] = useState(
    ALL_ACCOMMODATIONS_VALUE,
  );

  const [isPending, startTransition] = useTransition();

  const handleAccommodationChange = (value: string | null) => {
    const nextValue = value ?? ALL_ACCOMMODATIONS_VALUE;

    setSelectedAccommodation(nextValue);

    startTransition(async () => {
      const result = await loadReviewsPageReviews({
        accommodationSlug:
          nextValue === ALL_ACCOMMODATIONS_VALUE ? undefined : nextValue,
        offset: 0,
        take: reviewsPerPage,
      });

      setReviews(result.reviews);
      setHasMore(result.hasMore);
      setNextOffset(result.nextOffset);
    });
  };

  const handleLoadMore = () => {
    if (nextOffset === null || isPending) {
      return;
    }

    startTransition(async () => {
      const result = await loadReviewsPageReviews({
        accommodationSlug:
          selectedAccommodation === ALL_ACCOMMODATIONS_VALUE
            ? undefined
            : selectedAccommodation,
        offset: nextOffset,
        take: reviewsPerPage,
      });

      setReviews((currentReviews) => [...currentReviews, ...result.reviews]);
      setHasMore(result.hasMore);
      setNextOffset(result.nextOffset);
    });
  };

  return {
    reviews,
    hasMore,
    selectedAccommodation,
    isPending,
    handleAccommodationChange,
    handleLoadMore,
  };
};
