import { afterAll, beforeEach, describe, expect, it } from "vitest";

import {
  ACCOMMODATIONS_PAGE_CONTENT_ID,
  accommodationsPageContentDefaults,
} from "@/lib/accommodations-page/accommodations-page-defaults";
import { getAccommodationsPageContent } from "@/lib/accommodations-page/queries/get-accommodations-page-content";
import { getAccommodationsPageAdminData } from "@/lib/admin/accommodations-page/queries/get-accommodations-page-admin-data";
import { prisma } from "@/lib/prisma";

import { createAccommodationFixture } from "../helpers/create-accommodation-fixture";

const resetAccommodationsPageDatabase = async () => {
  await prisma.accommodation.deleteMany();
  await prisma.accommodationsPageContent.deleteMany();
};

describe("accommodations page queries", () => {
  beforeEach(async () => {
    await resetAccommodationsPageDatabase();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("returns the default content when no persisted content exists", async () => {
    const content = await getAccommodationsPageContent();

    expect(content).toEqual({
      ...accommodationsPageContentDefaults,

      heroImageUrl: null,
      heroImageFileKey: null,

      ctaImageUrl: null,
      ctaImageFileKey: null,
    });
  });

  it("returns the persisted page content", async () => {
    await prisma.accommodationsPageContent.create({
      data: {
        id: ACCOMMODATIONS_PAGE_CONTENT_ID,

        ...accommodationsPageContentDefaults,

        heroTitle: "Nos hébergements",
        ctaTitle: "Préparons votre séjour.",

        heroImageUrl: "https://example.com/hero.webp",
        heroImageFileKey: "hero-1",

        ctaImageUrl: "https://example.com/cta.webp",
        ctaImageFileKey: "cta-1",
      },
    });

    const content = await getAccommodationsPageContent();

    expect(content).toEqual({
      ...accommodationsPageContentDefaults,

      heroTitle: "Nos hébergements",
      ctaTitle: "Préparons votre séjour.",

      heroImageUrl: "https://example.com/hero.webp",
      heroImageFileKey: "hero-1",

      ctaImageUrl: "https://example.com/cta.webp",
      ctaImageFileKey: "cta-1",
    });
  });

  it("returns published accommodations in position order for the admin editor", async () => {
    await createAccommodationFixture({
      name: "Deuxième logement",
      slug: "deuxieme-logement-accommodations-page",
      status: "PUBLISHED",
      position: 2,
    });

    await createAccommodationFixture({
      name: "Premier logement",
      slug: "premier-logement-accommodations-page",
      status: "PUBLISHED",
      position: 1,
    });

    await createAccommodationFixture({
      name: "Brouillon",
      slug: "brouillon-accommodations-page",
      status: "DRAFT",
      position: 0,
    });

    const data = await getAccommodationsPageAdminData();

    expect(data.content).toEqual({
      ...accommodationsPageContentDefaults,

      heroImageUrl: null,
      heroImageFileKey: null,

      ctaImageUrl: null,
      ctaImageFileKey: null,
    });

    expect(
      data.accommodations.map((accommodation) => accommodation.name),
    ).toEqual(["Premier logement", "Deuxième logement"]);
  });
});
