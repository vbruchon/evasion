import { afterAll, beforeEach, describe, expect, it } from "vitest";

import { CONTACT_PAGE_CONTENT_ID } from "@/lib/contact/contact-page-defaults";
import { contactPageContentDefaults } from "@/lib/contact/contact-page-defaults";
import { FAQ_PAGE_CONTENT_ID } from "@/lib/faq/faq-page-defaults";
import { faqPageContentDefaults } from "@/lib/faq/faq-page-defaults";
import {
  HOME_PAGE_CONTENT_ID,
  homePageContentDefaults,
} from "@/lib/home/home-page-defaults";
import { getAdminDashboardActivity } from "@/lib/admin/dashboard/queries/get-admin-dashboard-activity";
import { prisma } from "@/lib/prisma";
import {
  REVIEWS_PAGE_CONTENT_ID,
  reviewsPageContentDefaults,
} from "@/lib/reviews/reviews-page-defaults";

import { createAccommodationFixture } from "../../helpers/create-accommodation-fixture";
import { resetAccommodationDatabase } from "../../helpers/database";

const resetDashboardActivityDatabase = async () => {
  await Promise.all([
    prisma.homePageContent.deleteMany(),
    prisma.reviewsPageContent.deleteMany(),
    prisma.faqPageContent.deleteMany(),
    prisma.aboutPageContent.deleteMany(),
    prisma.contactPageContent.deleteMany(),
    prisma.legalSiteSettings.deleteMany(),
  ]);

  await resetAccommodationDatabase();
};

describe("getAdminDashboardActivity", () => {
  beforeEach(async () => {
    await resetDashboardActivityDatabase();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("returns no activity when no editable content exists", async () => {
    const activity = await getAdminDashboardActivity();

    expect(activity).toEqual({
      recentPages: [],
      recentAccommodations: [],
    });
  });

  it("returns the three most recently modified pages", async () => {
    await prisma.homePageContent.create({
      data: {
        id: HOME_PAGE_CONTENT_ID,
        ...homePageContentDefaults,
        updatedAt: new Date("2026-09-01T10:00:00.000Z"),
      },
    });

    await prisma.contactPageContent.create({
      data: {
        id: CONTACT_PAGE_CONTENT_ID,
        ...contactPageContentDefaults,
        updatedAt: new Date("2026-09-02T10:00:00.000Z"),
      },
    });

    await prisma.faqPageContent.create({
      data: {
        id: FAQ_PAGE_CONTENT_ID,
        ...faqPageContentDefaults,
        updatedAt: new Date("2026-09-03T10:00:00.000Z"),
      },
    });

    await prisma.reviewsPageContent.create({
      data: {
        id: REVIEWS_PAGE_CONTENT_ID,
        ...reviewsPageContentDefaults,
        updatedAt: new Date("2026-09-04T10:00:00.000Z"),
      },
    });

    const activity = await getAdminDashboardActivity();

    expect(activity.recentPages).toEqual([
      {
        id: "reviews",
        label: "Avis",
        href: "/admin/avis",
        updatedAt: new Date("2026-09-04T10:00:00.000Z"),
      },
      {
        id: "faq",
        label: "FAQ",
        href: "/admin/faq",
        updatedAt: new Date("2026-09-03T10:00:00.000Z"),
      },
      {
        id: "contact",
        label: "Contact",
        href: "/admin/contact",
        updatedAt: new Date("2026-09-02T10:00:00.000Z"),
      },
    ]);
  });

  it("returns the three most recently modified accommodations with their cover image", async () => {
    const oldestAccommodation = await createAccommodationFixture({
      name: "Ancien logement",
      status: "PUBLISHED",
      position: 1,
    });

    const thirdAccommodation = await createAccommodationFixture({
      name: "Troisième logement",
      status: "ARCHIVED",
      position: 2,
    });

    const secondAccommodation = await createAccommodationFixture({
      name: "Deuxième logement",
      status: "DRAFT",
      position: 3,
    });

    const newestAccommodation = await createAccommodationFixture({
      name: "Dernier logement",
      status: "PUBLISHED",
      position: 4,

      images: [
        {
          url: "https://example.com/gallery.webp",
          fileKey: "dashboard-gallery",
          alt: "Galerie",
          position: 0,
          isCover: false,
        },
        {
          url: "https://example.com/cover.webp",
          fileKey: "dashboard-cover",
          alt: "Image de couverture",
          position: 1,
          isCover: true,
        },
      ],
    });

    await Promise.all([
      prisma.accommodation.update({
        where: {
          id: oldestAccommodation.id,
        },
        data: {
          updatedAt: new Date("2026-09-01T10:00:00.000Z"),
        },
      }),

      prisma.accommodation.update({
        where: {
          id: thirdAccommodation.id,
        },
        data: {
          updatedAt: new Date("2026-09-02T10:00:00.000Z"),
        },
      }),

      prisma.accommodation.update({
        where: {
          id: secondAccommodation.id,
        },
        data: {
          updatedAt: new Date("2026-09-03T10:00:00.000Z"),
        },
      }),

      prisma.accommodation.update({
        where: {
          id: newestAccommodation.id,
        },
        data: {
          updatedAt: new Date("2026-09-04T10:00:00.000Z"),
        },
      }),
    ]);

    const activity = await getAdminDashboardActivity();

    expect(
      activity.recentAccommodations.map((accommodation) => accommodation.name),
    ).toEqual(["Dernier logement", "Deuxième logement", "Troisième logement"]);

    expect(activity.recentAccommodations[0]).toMatchObject({
      id: newestAccommodation.id,
      name: "Dernier logement",
      status: "PUBLISHED",

      coverImage: {
        url: "https://example.com/cover.webp",
        alt: "Image de couverture",
      },
    });

    expect(activity.recentAccommodations[1].coverImage).toBeNull();
  });
});
