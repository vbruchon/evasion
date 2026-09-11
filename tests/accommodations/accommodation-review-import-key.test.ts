import { describe, expect, it } from "vitest";

import { createAccommodationReviewImportKey } from "@/lib/accommodations/reviews/accommodation-review-import-key";

describe("createAccommodationReviewImportKey", () => {
  const reviewedAt = new Date("2026-08-17T09:37:30Z");

  it("returns the same key for the same review", () => {
    const firstKey = createAccommodationReviewImportKey("Mathilde", reviewedAt);

    const secondKey = createAccommodationReviewImportKey(
      "Mathilde",
      reviewedAt,
    );

    expect(firstKey).toBe(secondKey);
  });

  it("normalizes the author name", () => {
    const referenceKey = createAccommodationReviewImportKey(
      "Clément",
      reviewedAt,
    );

    expect(createAccommodationReviewImportKey("clément", reviewedAt)).toBe(
      referenceKey,
    );

    expect(createAccommodationReviewImportKey("CLEMENT", reviewedAt)).toBe(
      referenceKey,
    );

    expect(createAccommodationReviewImportKey("  Clément  ", reviewedAt)).toBe(
      referenceKey,
    );

    expect(createAccommodationReviewImportKey("Clé ment", reviewedAt)).not.toBe(
      referenceKey,
    );
  });

  it("returns a different key when the review date changes", () => {
    const firstKey = createAccommodationReviewImportKey("Mathilde", reviewedAt);

    const secondKey = createAccommodationReviewImportKey(
      "Mathilde",
      new Date("2026-08-18T09:37:30Z"),
    );

    expect(secondKey).not.toBe(firstKey);
  });
});
