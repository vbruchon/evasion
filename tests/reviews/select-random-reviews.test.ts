import { describe, expect, it } from "vitest";

import { selectRandomReviews } from "@/lib/reviews/select-random-reviews";

describe("selectRandomReviews", () => {
  it("returns the requested number of reviews without mutating the source", () => {
    const reviews = [1, 2, 3, 4, 5];

    const selected = selectRandomReviews(reviews, 3, () => 0.5);

    expect(selected).toHaveLength(3);
    expect(new Set(selected).size).toBe(3);
    expect(reviews).toEqual([1, 2, 3, 4, 5]);
  });

  it("does not return more reviews than available", () => {
    expect(selectRandomReviews([1, 2], 5)).toHaveLength(2);
  });

  it("returns an empty array when count is zero", () => {
    expect(selectRandomReviews([1, 2, 3], 0)).toEqual([]);
  });
});
