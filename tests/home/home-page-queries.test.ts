import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  HOME_PAGE_CONTENT_ID,
  homePageContentDefaults,
} from "@/lib/home/home-page-defaults";
import { getHomePageContent } from "@/lib/home/queries/get-home-page-content";
import { prisma } from "@/lib/prisma";

describe("home page queries", () => {
  beforeEach(async () => {
    await prisma.homePageContent.deleteMany();
  });

  afterEach(async () => {
    await prisma.homePageContent.deleteMany();
  });

  it("returns default content when no home page content exists", async () => {
    const content = await getHomePageContent();

    expect(content).toEqual({
      ...homePageContentDefaults,
      escapeImageUrl: null,
      escapeImageFileKey: null,
      ctaImageUrl: null,
      ctaImageFileKey: null,
    });
  });

  it("returns persisted home page content when it exists", async () => {
    const persistedContent = {
      heroEyebrow: "Hero eyebrow",
      heroTitle: "Hero title",
      heroDescription: "Hero description",
      heroButtonLabel: "Hero button",

      accommodationsEyebrow: "Accommodations eyebrow",
      accommodationsTitle: "Accommodations title",
      accommodationsDescription: "Accommodations description",

      escapeEyebrow: "Escape eyebrow",
      escapeTitle: "Escape title",
      escapeDescription: "Escape description",
      escapeHandwritten: "Escape handwritten",
      escapeImageUrl: "https://example.com/escape.jpg",
      escapeImageFileKey: "escape-image-key",

      reviewsEyebrow: "Reviews eyebrow",

      ctaEyebrow: "CTA eyebrow",
      ctaTitle: "CTA title",
      ctaDescription: "CTA description",
      ctaButtonLabel: "CTA button",
      ctaImageUrl: "https://example.com/cta.jpg",
      ctaImageFileKey: "cta-image-key",
    };

    await prisma.homePageContent.create({
      data: {
        id: HOME_PAGE_CONTENT_ID,
        ...persistedContent,
      },
    });

    const content = await getHomePageContent();

    expect(content).toEqual(persistedContent);
  });
});
