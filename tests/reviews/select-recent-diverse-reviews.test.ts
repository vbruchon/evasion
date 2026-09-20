import { describe, expect, it } from "vitest";

import { selectRecentDiverseReviews } from "@/lib/reviews/select-recent-diverse-reviews";

const createReview = (
  id: string,
  accommodationSlug: string,
  reviewedAt: string,
) => ({
  id,
  reviewedAt,

  accommodation: {
    slug: accommodationSlug,
  },
});

describe("selectRecentDiverseReviews", () => {
  it("selects the most recent review from different accommodations first", () => {
    const reviews = [
      createReview("accommodation-a-older", "accommodation-a", "2026-09-09"),
      createReview("accommodation-c", "accommodation-c", "2026-09-07"),
      createReview("accommodation-a-latest", "accommodation-a", "2026-09-10"),
      createReview("accommodation-d", "accommodation-d", "2026-09-06"),
      createReview("accommodation-b", "accommodation-b", "2026-09-08"),
    ];

    const selectedReviews = selectRecentDiverseReviews(reviews, 4);

    expect(selectedReviews.map((review) => review.id)).toEqual([
      "accommodation-a-latest",
      "accommodation-b",
      "accommodation-c",
      "accommodation-d",
    ]);

    expect(reviews.map((review) => review.id)).toEqual([
      "accommodation-a-older",
      "accommodation-c",
      "accommodation-a-latest",
      "accommodation-d",
      "accommodation-b",
    ]);
  });

  it("fills the selection with the most recent remaining reviews", () => {
    const reviews = [
      createReview("accommodation-a-third", "accommodation-a", "2026-09-08"),
      createReview("accommodation-b", "accommodation-b", "2026-09-07"),
      createReview("accommodation-a-latest", "accommodation-a", "2026-09-10"),
      createReview("accommodation-a-second", "accommodation-a", "2026-09-09"),
    ];

    const selectedReviews = selectRecentDiverseReviews(reviews, 4);

    expect(selectedReviews.map((review) => review.id)).toEqual([
      "accommodation-a-latest",
      "accommodation-a-second",
      "accommodation-a-third",
      "accommodation-b",
    ]);
  });

  it("does not return more reviews than available", () => {
    const reviews = [
      createReview("review-1", "accommodation-a", "2026-09-10"),
      createReview("review-2", "accommodation-b", "2026-09-09"),
    ];

    expect(selectRecentDiverseReviews(reviews, 5)).toHaveLength(2);
  });

  it("returns an empty array when count is zero", () => {
    const reviews = [createReview("review-1", "accommodation-a", "2026-09-10")];

    expect(selectRecentDiverseReviews(reviews, 0)).toEqual([]);
  });
});
