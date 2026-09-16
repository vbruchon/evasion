import { afterAll, beforeEach, describe, expect, it } from "vitest";

import { prisma } from "@/lib/prisma";
import { getReviewsPageContent } from "@/lib/reviews/queries/get-reviews-page-content";
import {
  getReviewsPageAccommodationFilters,
  getReviewsPageRecentReviews,
  getReviewsPageReviews,
} from "@/lib/reviews/queries/get-reviews-page-reviews";
import { getReviewsPageSummary } from "@/lib/reviews/queries/get-reviews-page-summary";
import { reviewsPageContentDefaults } from "@/lib/reviews/reviews-page-defaults";

import { createAccommodationFixture } from "../helpers/create-accommodation-fixture";

let reviewSequence = 0;

type CreateReviewOptions = {
  accommodationId: string;
  authorName?: string;
  rating?: number;
  comment?: string;
  reviewedAt: Date;
};

const createReview = async ({
  accommodationId,
  authorName,
  rating = 5,
  comment,
  reviewedAt,
}: CreateReviewOptions) => {
  reviewSequence += 1;

  return prisma.accommodationReview.create({
    data: {
      accommodationId,
      importKey: `review-test-${reviewSequence}`,
      authorName: authorName ?? `Voyageur ${reviewSequence}`,
      rating,
      comment: comment ?? `Avis de test ${reviewSequence}`,
      reviewedAt,
    },
  });
};

const resetReviewsDatabase = async () => {
  await prisma.accommodation.deleteMany();
  await prisma.reviewsPageContent.deleteMany();

  reviewSequence = 0;
};

describe("reviews page queries", () => {
  beforeEach(async () => {
    await resetReviewsDatabase();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("returns the default page content when no persisted content exists", async () => {
    const content = await getReviewsPageContent();

    expect(content).toEqual({
      ...reviewsPageContentDefaults,

      heroImageUrl: null,
      heroImageFileKey: null,

      ctaImageUrl: null,
      ctaImageFileKey: null,
    });
  });

  it("computes the review summary from published accommodations only", async () => {
    const publishedAccommodation = await createAccommodationFixture({
      status: "PUBLISHED",
      slug: "published-accommodation",
    });

    const draftAccommodation = await createAccommodationFixture({
      status: "DRAFT",
      slug: "draft-accommodation",
    });

    const archivedAccommodation = await createAccommodationFixture({
      status: "ARCHIVED",
      slug: "archived-accommodation",
    });

    await createReview({
      accommodationId: publishedAccommodation.id,
      rating: 5,
      reviewedAt: new Date("2026-09-01T10:00:00.000Z"),
    });

    await createReview({
      accommodationId: publishedAccommodation.id,
      rating: 3,
      reviewedAt: new Date("2026-09-02T10:00:00.000Z"),
    });

    await createReview({
      accommodationId: draftAccommodation.id,
      rating: 1,
      reviewedAt: new Date("2026-09-03T10:00:00.000Z"),
    });

    await createReview({
      accommodationId: archivedAccommodation.id,
      rating: 2,
      reviewedAt: new Date("2026-09-04T10:00:00.000Z"),
    });

    const summary = await getReviewsPageSummary();

    expect(summary).toEqual({
      averageRating: 4,
      totalReviews: 2,
    });
  });

  it("returns only the 10 most recent reviews from published accommodations", async () => {
    const accommodation = await createAccommodationFixture({
      status: "PUBLISHED",
      slug: "published-accommodation",
    });

    for (let index = 1; index <= 12; index += 1) {
      await createReview({
        accommodationId: accommodation.id,
        authorName: `Voyageur ${index}`,
        reviewedAt: new Date(
          `2026-09-${String(index).padStart(2, "0")}T10:00:00.000Z`,
        ),
      });
    }

    const draftAccommodation = await createAccommodationFixture({
      status: "DRAFT",
      slug: "draft-accommodation",
    });

    await createReview({
      accommodationId: draftAccommodation.id,
      authorName: "Voyageur draft",
      reviewedAt: new Date("2026-10-01T10:00:00.000Z"),
    });

    const reviews = await getReviewsPageRecentReviews();

    expect(reviews).toHaveLength(10);

    expect(reviews.map((review) => review.authorName)).toEqual([
      "Voyageur 12",
      "Voyageur 11",
      "Voyageur 10",
      "Voyageur 9",
      "Voyageur 8",
      "Voyageur 7",
      "Voyageur 6",
      "Voyageur 5",
      "Voyageur 4",
      "Voyageur 3",
    ]);
  });

  it("filters reviews by accommodation and paginates them", async () => {
    const firstAccommodation = await createAccommodationFixture({
      status: "PUBLISHED",
      name: "Premier logement",
      slug: "premier-logement",
      position: 1,
    });

    const secondAccommodation = await createAccommodationFixture({
      status: "PUBLISHED",
      name: "Second logement",
      slug: "second-logement",
      position: 2,
    });

    for (let index = 1; index <= 4; index += 1) {
      await createReview({
        accommodationId: firstAccommodation.id,
        authorName: `Premier ${index}`,
        reviewedAt: new Date(
          `2026-09-${String(index).padStart(2, "0")}T10:00:00.000Z`,
        ),
      });
    }

    await createReview({
      accommodationId: secondAccommodation.id,
      authorName: "Second",
      reviewedAt: new Date("2026-09-10T10:00:00.000Z"),
    });

    const firstPage = await getReviewsPageReviews({
      accommodationSlug: firstAccommodation.slug,
      offset: 0,
      take: 2,
    });

    expect(firstPage.reviews.map((review) => review.authorName)).toEqual([
      "Premier 4",
      "Premier 3",
    ]);

    expect(firstPage.hasMore).toBe(true);
    expect(firstPage.nextOffset).toBe(2);

    const secondPage = await getReviewsPageReviews({
      accommodationSlug: firstAccommodation.slug,
      offset: firstPage.nextOffset ?? 0,
      take: 2,
    });

    expect(secondPage.reviews.map((review) => review.authorName)).toEqual([
      "Premier 2",
      "Premier 1",
    ]);

    expect(secondPage.hasMore).toBe(false);
    expect(secondPage.nextOffset).toBeNull();
  });

  it("returns only published accommodations containing reviews as filters", async () => {
    const publishedWithReviews = await createAccommodationFixture({
      status: "PUBLISHED",
      name: "Avec avis",
      slug: "avec-avis",
      position: 2,
    });

    await createAccommodationFixture({
      status: "PUBLISHED",
      name: "Sans avis",
      slug: "sans-avis",
      position: 1,
    });

    const draftWithReviews = await createAccommodationFixture({
      status: "DRAFT",
      name: "Brouillon",
      slug: "brouillon",
      position: 3,
    });

    await createReview({
      accommodationId: publishedWithReviews.id,
      reviewedAt: new Date("2026-09-01T10:00:00.000Z"),
    });

    await createReview({
      accommodationId: draftWithReviews.id,
      reviewedAt: new Date("2026-09-02T10:00:00.000Z"),
    });

    const filters = await getReviewsPageAccommodationFilters();

    expect(filters).toEqual([
      {
        id: publishedWithReviews.id,
        name: "Avec avis",
        slug: "avec-avis",
      },
    ]);
  });
});
