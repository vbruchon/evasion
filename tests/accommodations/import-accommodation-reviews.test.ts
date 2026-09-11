import { readFileSync } from "node:fs";
import { join } from "node:path";

import { afterAll, beforeEach, describe, expect, it } from "vitest";

import { importAccommodationReviews } from "@/lib/admin/accommodation/reviews/import-accommodation-reviews";
import { prisma } from "@/lib/prisma";

import { createAccommodationFixture } from "../helpers/create-accommodation-fixture";
import { resetAccommodationDatabase } from "../helpers/database";

const fixturesDirectory = join(
  process.cwd(),
  "tests/helpers/fixtures/accommodations/reviews",
);

const readFixture = (filename: string) =>
  readFileSync(join(fixturesDirectory, filename), "utf8");

describe("importAccommodationReviews", () => {
  beforeEach(async () => {
    await resetAccommodationDatabase();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("imports accommodation reviews from a CSV", async () => {
    const accommodation = await createAccommodationFixture();

    const result = await importAccommodationReviews({
      accommodationId: accommodation.id,
      csvContent: readFixture("valid-reviews.csv"),
    });

    expect(result).toEqual({
      total: 2,
      imported: 2,
      existing: 0,
      duplicates: 0,
    });

    const reviews = await prisma.accommodationReview.findMany({
      where: {
        accommodationId: accommodation.id,
      },
      orderBy: {
        reviewedAt: "asc",
      },
    });

    expect(reviews).toHaveLength(2);

    expect(reviews[0]).toMatchObject({
      authorName: "Mathilde",
      rating: 5,
      comment: "Un excellent séjour dans un logement magnifique.",
      reviewedAt: new Date("2026-08-17T09:37:30Z"),
    });

    expect(reviews[1]).toMatchObject({
      authorName: "Clément",
      rating: 4,
      comment: "Très belle expérience, nous reviendrons.",
      reviewedAt: new Date("2026-09-06T08:56:16Z"),
    });

    const persistedAccommodation = await prisma.accommodation.findUniqueOrThrow(
      {
        where: {
          id: accommodation.id,
        },
      },
    );

    expect(persistedAccommodation.lastReviewsImportAt).not.toBeNull();
  });

  it("does not import reviews that already exist", async () => {
    const accommodation = await createAccommodationFixture();

    const csvContent = readFixture("valid-reviews.csv");

    await importAccommodationReviews({
      accommodationId: accommodation.id,
      csvContent,
    });

    const result = await importAccommodationReviews({
      accommodationId: accommodation.id,
      csvContent,
    });

    expect(result).toEqual({
      total: 2,
      imported: 0,
      existing: 2,
      duplicates: 0,
    });

    const reviewsCount = await prisma.accommodationReview.count({
      where: {
        accommodationId: accommodation.id,
      },
    });

    expect(reviewsCount).toBe(2);
  });

  it("imports only new reviews when existing and new reviews are mixed", async () => {
    const accommodation = await createAccommodationFixture();

    await importAccommodationReviews({
      accommodationId: accommodation.id,
      csvContent: readFixture("valid-reviews.csv"),
    });

    const result = await importAccommodationReviews({
      accommodationId: accommodation.id,
      csvContent: readFixture("valid-reviews-with-new.csv"),
    });

    expect(result).toEqual({
      total: 3,
      imported: 1,
      existing: 2,
      duplicates: 0,
    });

    const reviews = await prisma.accommodationReview.findMany({
      where: {
        accommodationId: accommodation.id,
      },
      orderBy: {
        reviewedAt: "asc",
      },
    });

    expect(reviews).toHaveLength(3);

    expect(reviews[2]).toMatchObject({
      authorName: "Julie",
      rating: 5,
      comment: "Un séjour parfait du début à la fin.",
      reviewedAt: new Date("2026-09-10T10:15:00Z"),
    });
  });

  it("allows the same imported review for different accommodations", async () => {
    const firstAccommodation = await createAccommodationFixture({
      slug: "premier-logement",
      position: 1,
    });

    const secondAccommodation = await createAccommodationFixture({
      slug: "second-logement",
      position: 2,
    });

    const csvContent = readFixture("valid-reviews.csv");

    const firstResult = await importAccommodationReviews({
      accommodationId: firstAccommodation.id,
      csvContent,
    });

    const secondResult = await importAccommodationReviews({
      accommodationId: secondAccommodation.id,
      csvContent,
    });

    expect(firstResult.imported).toBe(2);
    expect(secondResult.imported).toBe(2);

    const firstReviewsCount = await prisma.accommodationReview.count({
      where: {
        accommodationId: firstAccommodation.id,
      },
    });

    const secondReviewsCount = await prisma.accommodationReview.count({
      where: {
        accommodationId: secondAccommodation.id,
      },
    });

    expect(firstReviewsCount).toBe(2);
    expect(secondReviewsCount).toBe(2);
  });

  it("ignores duplicated reviews inside the same CSV", async () => {
    const accommodation = await createAccommodationFixture();

    const result = await importAccommodationReviews({
      accommodationId: accommodation.id,
      csvContent: readFixture("duplicate-reviews.csv"),
    });

    expect(result).toEqual({
      total: 2,
      imported: 1,
      existing: 0,
      duplicates: 1,
    });

    const reviewsCount = await prisma.accommodationReview.count({
      where: {
        accommodationId: accommodation.id,
      },
    });

    expect(reviewsCount).toBe(1);
  });

  it("rejects an empty CSV without updating the last import date", async () => {
    const accommodation = await createAccommodationFixture();

    await expect(
      importAccommodationReviews({
        accommodationId: accommodation.id,
        csvContent: "",
      }),
    ).rejects.toThrow("Le fichier CSV ne contient aucun avis.");

    const persistedAccommodation = await prisma.accommodation.findUniqueOrThrow(
      {
        where: {
          id: accommodation.id,
        },
      },
    );

    expect(persistedAccommodation.lastReviewsImportAt).toBeNull();

    const reviewsCount = await prisma.accommodationReview.count({
      where: {
        accommodationId: accommodation.id,
      },
    });

    expect(reviewsCount).toBe(0);
  });

  it("does not modify the database when the CSV is invalid", async () => {
    const accommodation = await createAccommodationFixture();

    await expect(
      importAccommodationReviews({
        accommodationId: accommodation.id,
        csvContent: readFixture("invalid-rating.csv"),
      }),
    ).rejects.toThrow('Note d\'avis invalide : "6".');

    const persistedAccommodation = await prisma.accommodation.findUniqueOrThrow(
      {
        where: {
          id: accommodation.id,
        },
      },
    );

    expect(persistedAccommodation.lastReviewsImportAt).toBeNull();

    const reviewsCount = await prisma.accommodationReview.count({
      where: {
        accommodationId: accommodation.id,
      },
    });

    expect(reviewsCount).toBe(0);
  });

  it("updates the last import date even when no new review is found", async () => {
    const accommodation = await createAccommodationFixture();

    const csvContent = readFixture("valid-reviews.csv");

    await importAccommodationReviews({
      accommodationId: accommodation.id,
      csvContent,
    });

    await prisma.accommodation.update({
      where: {
        id: accommodation.id,
      },
      data: {
        lastReviewsImportAt: new Date("2026-01-01T00:00:00Z"),
      },
    });

    const result = await importAccommodationReviews({
      accommodationId: accommodation.id,
      csvContent,
    });

    expect(result.imported).toBe(0);

    const persistedAccommodation = await prisma.accommodation.findUniqueOrThrow(
      {
        where: {
          id: accommodation.id,
        },
      },
    );

    expect(persistedAccommodation.lastReviewsImportAt).not.toEqual(
      new Date("2026-01-01T00:00:00Z"),
    );
  });
});
