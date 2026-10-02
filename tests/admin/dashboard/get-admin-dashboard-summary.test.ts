import { afterAll, beforeEach, describe, expect, it } from "vitest";

import { getAdminDashboardSummary } from "@/lib/admin/dashboard/queries/get-admin-dashboard-summary";
import { prisma } from "@/lib/prisma";

import { createAccommodationFixture } from "../../helpers/create-accommodation-fixture";
import { resetAccommodationDatabase } from "../../helpers/database";

describe("getAdminDashboardSummary", () => {
  beforeEach(async () => {
    await resetAccommodationDatabase();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("returns empty statistics when there is no accommodation", async () => {
    const summary = await getAdminDashboardSummary();

    expect(summary).toEqual({
      accommodations: {
        published: 0,
        draft: 0,
        archived: 0,
      },

      reviews: {
        total: 0,
        averageRating: 0,
        lastImportAt: null,
      },
    });
  });

  it("returns accommodation counts and published reviews statistics", async () => {
    const publishedAccommodation = await createAccommodationFixture({
      name: "Logement publié",
      status: "PUBLISHED",
      position: 1,
    });

    const draftAccommodation = await createAccommodationFixture({
      name: "Logement brouillon",
      status: "DRAFT",
      position: 2,
    });

    const archivedAccommodation = await createAccommodationFixture({
      name: "Logement archivé",
      status: "ARCHIVED",
      position: 3,
    });

    await prisma.accommodationReview.createMany({
      data: [
        {
          accommodationId: publishedAccommodation.id,
          importKey: "published-review-1",
          authorName: "Alice",
          rating: 5,
          comment: "Excellent séjour.",
          reviewedAt: new Date("2026-09-01T10:00:00.000Z"),
        },
        {
          accommodationId: publishedAccommodation.id,
          importKey: "published-review-2",
          authorName: "Thomas",
          rating: 3,
          comment: "Très bon séjour.",
          reviewedAt: new Date("2026-09-02T10:00:00.000Z"),
        },
        {
          accommodationId: draftAccommodation.id,
          importKey: "draft-review",
          authorName: "Claire",
          rating: 1,
          comment: "Cet avis ne doit pas être comptabilisé.",
          reviewedAt: new Date("2026-09-03T10:00:00.000Z"),
        },
      ],
    });

    await prisma.accommodation.update({
      where: {
        id: publishedAccommodation.id,
      },

      data: {
        lastReviewsImportAt: new Date("2026-09-20T10:00:00.000Z"),
      },
    });

    await prisma.accommodation.update({
      where: {
        id: archivedAccommodation.id,
      },

      data: {
        lastReviewsImportAt: new Date("2026-09-25T10:00:00.000Z"),
      },
    });

    const summary = await getAdminDashboardSummary();

    expect(summary).toEqual({
      accommodations: {
        published: 1,
        draft: 1,
        archived: 1,
      },

      reviews: {
        total: 2,
        averageRating: 4,
        lastImportAt: new Date("2026-09-20T10:00:00.000Z"),
      },
    });
  });
});
