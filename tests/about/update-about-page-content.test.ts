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
  ABOUT_PAGE_CONTENT_ID,
  aboutPageContentDefaults,
} from "@/lib/about/about-page-defaults";
import type { AboutPageContentValues } from "@/lib/about/about-page.schema";
import { updateAboutPageContentAdmin } from "@/lib/admin/about/commands/update-about-page-content";
import { prisma } from "@/lib/prisma";

const createContentValues = (
  overrides: Partial<AboutPageContentValues> = {},
): AboutPageContentValues => ({
  ...aboutPageContentDefaults,
  ...overrides,
});

describe("updateAboutPageContentAdmin", () => {
  beforeEach(async () => {
    await prisma.aboutPageContent.deleteMany();

    vi.clearAllMocks();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("creates and updates the about page content", async () => {
    const initialValues = createContentValues({
      heroTitle: "Titre initial",
    });

    const firstResult = await updateAboutPageContentAdmin(
      initialValues,
      {
        url: "https://example.com/spirit-1.webp",
        fileKey: "spirit-1",
      },
      null,
    );

    expect(firstResult).toEqual({
      success: true,
    });

    const createdContent = await prisma.aboutPageContent.findUniqueOrThrow({
      where: {
        id: ABOUT_PAGE_CONTENT_ID,
      },
    });

    expect(createdContent).toMatchObject({
      heroTitle: "Titre initial",

      spiritImageUrl: "https://example.com/spirit-1.webp",
      spiritImageFileKey: "spirit-1",

      ctaImageUrl: null,
      ctaImageFileKey: null,
    });

    const updatedValues = createContentValues({
      heroTitle: "Titre modifié",
      spiritTitle: "Nouvel esprit",
      ctaTitle: "Nouveau CTA",
    });

    const secondResult = await updateAboutPageContentAdmin(
      updatedValues,
      {
        url: "https://example.com/spirit-2.webp",
        fileKey: "spirit-2",
      },
      {
        url: "https://example.com/cta.webp",
        fileKey: "cta-1",
      },
    );

    expect(secondResult).toEqual({
      success: true,
    });

    const updatedContent = await prisma.aboutPageContent.findUniqueOrThrow({
      where: {
        id: ABOUT_PAGE_CONTENT_ID,
      },
    });

    expect(updatedContent).toMatchObject({
      heroTitle: "Titre modifié",
      spiritTitle: "Nouvel esprit",
      ctaTitle: "Nouveau CTA",

      spiritImageUrl: "https://example.com/spirit-2.webp",
      spiritImageFileKey: "spirit-2",

      ctaImageUrl: "https://example.com/cta.webp",
      ctaImageFileKey: "cta-1",
    });

    expect(deleteUploadThingFilesMock).toHaveBeenLastCalledWith(["spirit-1"]);

    expect(revalidatePathMock).toHaveBeenCalledWith("/a-propos");
    expect(revalidatePathMock).toHaveBeenCalledWith("/admin/a-propos");
  });

  it("cleans up new images when validation fails", async () => {
    const invalidValues = createContentValues({
      heroTitle: "",
    });

    const result = await updateAboutPageContentAdmin(
      invalidValues,
      {
        url: "https://example.com/new-spirit.webp",
        fileKey: "new-spirit",
      },
      {
        url: "https://example.com/new-cta.webp",
        fileKey: "new-cta",
      },
    );

    expect(result).toEqual({
      success: false,
      message: "Le contenu de la page À propos est invalide.",
    });

    expect(deleteUploadThingFilesMock).toHaveBeenCalledWith([
      "new-spirit",
      "new-cta",
    ]);

    const persistedContent = await prisma.aboutPageContent.findUnique({
      where: {
        id: ABOUT_PAGE_CONTENT_ID,
      },
    });

    expect(persistedContent).toBeNull();
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });
});
