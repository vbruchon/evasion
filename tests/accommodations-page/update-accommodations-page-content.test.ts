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

import {
  ACCOMMODATIONS_PAGE_CONTENT_ID,
  accommodationsPageContentDefaults,
} from "@/lib/accommodations-page/accommodations-page-defaults";
import type { AccommodationsPageContentValues } from "@/lib/accommodations-page/accommodations-page.schema";
import { updateAccommodationsPageContentAdmin } from "@/lib/admin/accommodations-page/commands/update-accommodations-page-content";
import { prisma } from "@/lib/prisma";

const createContentValues = (
  overrides: Partial<AccommodationsPageContentValues> = {},
): AccommodationsPageContentValues => ({
  ...accommodationsPageContentDefaults,
  ...overrides,
});

describe("updateAccommodationsPageContentAdmin", () => {
  beforeEach(async () => {
    await prisma.accommodationsPageContent.deleteMany();

    vi.clearAllMocks();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("creates and updates the accommodations page content and images", async () => {
    const initialValues = createContentValues({
      heroTitle: "Titre initial",
    });

    const firstResult = await updateAccommodationsPageContentAdmin(
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

    const createdContent =
      await prisma.accommodationsPageContent.findUniqueOrThrow({
        where: {
          id: ACCOMMODATIONS_PAGE_CONTENT_ID,
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
      heroEyebrow: "Nos parenthèses",
      heroTitle: "Nos logements d’exception",
      heroDescription: "Une nouvelle description du hero.",

      ctaEyebrow: "Une envie particulière ?",
      ctaTitle: "Imaginons votre prochaine parenthèse.",
      ctaButtonLabel: "Nous écrire",
    });

    const secondResult = await updateAccommodationsPageContentAdmin(
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

    const updatedContent =
      await prisma.accommodationsPageContent.findUniqueOrThrow({
        where: {
          id: ACCOMMODATIONS_PAGE_CONTENT_ID,
        },
      });

    expect(updatedContent).toMatchObject({
      heroEyebrow: "Nos parenthèses",
      heroTitle: "Nos logements d’exception",
      heroDescription: "Une nouvelle description du hero.",

      ctaEyebrow: "Une envie particulière ?",
      ctaTitle: "Imaginons votre prochaine parenthèse.",
      ctaButtonLabel: "Nous écrire",

      heroImageUrl: "https://example.com/hero-2.webp",
      heroImageFileKey: "hero-2",

      ctaImageUrl: "https://example.com/cta.webp",
      ctaImageFileKey: "cta-1",
    });

    expect(deleteUploadThingFilesMock).toHaveBeenLastCalledWith(["hero-1"]);

    expect(revalidatePathMock).toHaveBeenCalledWith("/logements");
    expect(revalidatePathMock).toHaveBeenCalledWith("/admin/nos-logements");
  });

  it("cleans up newly uploaded images when validation fails", async () => {
    const invalidValues = createContentValues({
      heroTitle: "",
    });

    const result = await updateAccommodationsPageContentAdmin(
      invalidValues,
      {
        url: "https://example.com/new-hero.webp",
        fileKey: "new-hero",
      },
      {
        url: "https://example.com/new-cta.webp",
        fileKey: "new-cta",
      },
    );

    expect(result).toEqual({
      success: false,
      message: "Le contenu de la page Nos logements est invalide.",
    });

    expect(deleteUploadThingFilesMock).toHaveBeenCalledWith([
      "new-hero",
      "new-cta",
    ]);

    const persistedContent = await prisma.accommodationsPageContent.findUnique({
      where: {
        id: ACCOMMODATIONS_PAGE_CONTENT_ID,
      },
    });

    expect(persistedContent).toBeNull();

    expect(revalidatePathMock).not.toHaveBeenCalled();
  });
});
