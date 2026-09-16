import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";

const { deleteUploadThingFilesMock, revalidatePathMock } = vi.hoisted(() => ({
  deleteUploadThingFilesMock: vi.fn(),
  revalidatePathMock: vi.fn(),
}));

vi.mock("next/cache", () => ({
  revalidatePath: revalidatePathMock,
}));

vi.mock("@/lib/admin/uploadthing/delete-files", () => ({
  deleteUploadThingFiles: deleteUploadThingFilesMock,
}));

import { updateReviewsPageContentAdmin } from "@/lib/admin/reviews/commands/update-reviews-page-content";
import { prisma } from "@/lib/prisma";
import {
  REVIEWS_PAGE_CONTENT_ID,
  reviewsPageContentDefaults,
} from "@/lib/reviews/reviews-page-defaults";
import type { ReviewsPageContentValues } from "@/lib/reviews/reviews-page.schema";

const createContentValues = (
  overrides: Partial<ReviewsPageContentValues> = {},
): ReviewsPageContentValues => ({
  ...reviewsPageContentDefaults,
  ...overrides,
});

describe("updateReviewsPageContentAdmin", () => {
  beforeEach(async () => {
    await prisma.reviewsPageContent.deleteMany();

    vi.clearAllMocks();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("creates and updates the reviews page content", async () => {
    const initialValues = createContentValues({
      heroTitle: "Titre initial",
    });

    const firstResult = await updateReviewsPageContentAdmin(
      initialValues,
      {
        url: "https://example.com/hero-1.webp",
        fileKey: "hero-1",
      },
      null,
    );

    expect(firstResult).toEqual({
      success: true,
    });

    const createdContent = await prisma.reviewsPageContent.findUniqueOrThrow({
      where: {
        id: REVIEWS_PAGE_CONTENT_ID,
      },
    });

    expect(createdContent).toMatchObject({
      heroTitle: "Titre initial",
      heroImageUrl: "https://example.com/hero-1.webp",
      heroImageFileKey: "hero-1",
      ctaImageUrl: null,
      ctaImageFileKey: null,
    });

    const updatedValues = createContentValues({
      heroTitle: "Titre modifié",
      ctaTitle: "Nouveau CTA",
    });

    const secondResult = await updateReviewsPageContentAdmin(
      updatedValues,
      {
        url: "https://example.com/hero-2.webp",
        fileKey: "hero-2",
      },
      {
        url: "https://example.com/cta.webp",
        fileKey: "cta-1",
      },
    );

    expect(secondResult).toEqual({
      success: true,
    });

    const updatedContent = await prisma.reviewsPageContent.findUniqueOrThrow({
      where: {
        id: REVIEWS_PAGE_CONTENT_ID,
      },
    });

    expect(updatedContent).toMatchObject({
      heroTitle: "Titre modifié",
      ctaTitle: "Nouveau CTA",

      heroImageUrl: "https://example.com/hero-2.webp",
      heroImageFileKey: "hero-2",

      ctaImageUrl: "https://example.com/cta.webp",
      ctaImageFileKey: "cta-1",
    });

    expect(deleteUploadThingFilesMock).toHaveBeenLastCalledWith(["hero-1"]);

    expect(revalidatePathMock).toHaveBeenCalledWith("/avis");
    expect(revalidatePathMock).toHaveBeenCalledWith("/admin/avis");
  });

  it("cleans up newly uploaded images when validation fails", async () => {
    const invalidValues = createContentValues({
      heroTitle: "",
    });

    const result = await updateReviewsPageContentAdmin(
      invalidValues,
      {
        url: "https://example.com/new-hero.webp",
        fileKey: "new-hero",
      },
      null,
    );

    expect(result).toEqual({
      success: false,
      message: "Le contenu de la page Avis est invalide.",
    });

    expect(deleteUploadThingFilesMock).toHaveBeenCalledWith(["new-hero"]);

    const persistedContent = await prisma.reviewsPageContent.findUnique({
      where: {
        id: REVIEWS_PAGE_CONTENT_ID,
      },
    });

    expect(persistedContent).toBeNull();

    expect(revalidatePathMock).not.toHaveBeenCalled();
  });
});
