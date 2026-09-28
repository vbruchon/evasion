import { afterAll, beforeEach, describe, expect, it } from "vitest";

import { aboutPageContentDefaults } from "@/lib/about/about-page-defaults";
import { getAboutPageContent } from "@/lib/about/queries/get-about-page-content";
import { getAccommodationHeroImages } from "@/lib/accommodations/queries/get-accommodation-hero-images";
import { getAboutPageStats } from "@/lib/about/queries/get-about-page-stats";
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

  it("returns one hero image per published accommodation in position order", async () => {
    await createAccommodationFixture({
      name: "Deuxième logement",
      slug: "second-about-accommodation",
      status: "PUBLISHED",
      position: 2,
      images: [
        {
          url: "https://example.com/second.webp",
          alt: "Deuxième logement",
          isCover: true,
        },
      ],
    });

    await createAccommodationFixture({
      name: "Premier logement",
      slug: "first-about-accommodation",
      status: "PUBLISHED",
      position: 1,
      images: [
        {
          url: "https://example.com/first-secondary.webp",
          position: 1,
          isCover: false,
        },
        {
          url: "https://example.com/first-cover.webp",
          alt: "Image principale",
          position: 2,
          isCover: true,
        },
      ],
    });

    await createAccommodationFixture({
      name: "Brouillon",
      slug: "draft-about-accommodation",
      status: "DRAFT",
      position: 0,
      images: [
        {
          url: "https://example.com/draft.webp",
          isCover: true,
        },
      ],
    });

    const images = await getAccommodationHeroImages();

    expect(images).toEqual([
      {
        src: "https://example.com/first-cover.webp",
        alt: "Image principale",
      },
      {
        src: "https://example.com/second.webp",
        alt: "Deuxième logement",
      },
    ]);
  });
});
