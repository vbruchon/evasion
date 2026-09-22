import { afterAll, beforeEach, describe, expect, it } from "vitest";

import { getAboutPageContent } from "@/lib/about/queries/get-about-page-content";
import { getAboutPageStats } from "@/lib/about/queries/get-about-page-stats";
import { aboutPageContentDefaults } from "@/lib/about/about-page-defaults";
import { prisma } from "@/lib/prisma";

import { createAccommodationFixture } from "../helpers/create-accommodation-fixture";

let reviewSequence = 0;

const resetAboutPageDatabase = async () => {
  await prisma.accommodation.deleteMany();
  await prisma.aboutPageContent.deleteMany();

  reviewSequence = 0;
};

const createReview = async (accommodationId: string, rating: number) => {
  reviewSequence += 1;

  return prisma.accommodationReview.create({
    data: {
      accommodationId,
      importKey: `about-review-${reviewSequence}`,
      authorName: `Auteur ${reviewSequence}`,
      rating,
      comment: `Avis ${reviewSequence}`,
      reviewedAt: new Date(`2026-09-0${reviewSequence}T10:00:00.000Z`),
    },
  });
};

describe("about page queries", () => {
  beforeEach(async () => {
    await resetAboutPageDatabase();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("returns the default content when no persisted content exists", async () => {
    const content = await getAboutPageContent();

    expect(content).toEqual({
      ...aboutPageContentDefaults,

      heroImageUrl: null,
      heroImageFileKey: null,

      spiritImageUrl: null,
      spiritImageFileKey: null,

      ctaImageUrl: null,
      ctaImageFileKey: null,
    });
  });

  it("computes statistics from published accommodations only", async () => {
    const publishedAccommodation = await createAccommodationFixture({
      status: "PUBLISHED",
      slug: "published-about-accommodation",
    });

    const draftAccommodation = await createAccommodationFixture({
      status: "DRAFT",
      slug: "draft-about-accommodation",
    });

    await createReview(publishedAccommodation.id, 5);
    await createReview(publishedAccommodation.id, 3);
    await createReview(draftAccommodation.id, 1);

    const stats = await getAboutPageStats();

    expect(stats).toEqual({
      totalAccommodations: 1,
      totalReviews: 2,
      averageRating: 4,
    });
  });
});
