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

import { updateHomePageContentAdmin } from "@/lib/admin/home/commands/update-home-page-content";
import {
  HOME_PAGE_CONTENT_ID,
  homePageContentDefaults,
} from "@/lib/home/home-page-defaults";
import type { HomePageContentValues } from "@/lib/home/home-page.schema";
import { prisma } from "@/lib/prisma";

const createContentValues = (
  overrides: Partial<HomePageContentValues> = {},
): HomePageContentValues => ({
  ...homePageContentDefaults,
  ...overrides,
});

describe("updateHomePageContentAdmin", () => {
  beforeEach(async () => {
    await prisma.homePageContent.deleteMany();

    vi.clearAllMocks();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("creates and updates the home page content", async () => {
    const initialValues = createContentValues({
      heroTitle: "Titre initial",
    });

    const firstResult = await updateHomePageContentAdmin(
      initialValues,
      {
        url: "https://example.com/escape-1.webp",
        fileKey: "escape-1",
      },
      null,
    );

    expect(firstResult).toEqual({
      success: true,
    });

    const createdContent = await prisma.homePageContent.findUniqueOrThrow({
      where: {
        id: HOME_PAGE_CONTENT_ID,
      },
    });

    expect(createdContent).toMatchObject({
      heroTitle: "Titre initial",

      escapeImageUrl: "https://example.com/escape-1.webp",
      escapeImageFileKey: "escape-1",

      ctaImageUrl: null,
      ctaImageFileKey: null,
    });

    const updatedValues = createContentValues({
      heroTitle: "Titre modifié",
      escapeTitle: "Nouvel esprit",
      ctaTitle: "Nouveau CTA",
    });

    const secondResult = await updateHomePageContentAdmin(
      updatedValues,
      {
        url: "https://example.com/escape-2.webp",
        fileKey: "escape-2",
      },
      {
        url: "https://example.com/cta.webp",
        fileKey: "cta-1",
      },
    );

    expect(secondResult).toEqual({
      success: true,
    });

    const updatedContent = await prisma.homePageContent.findUniqueOrThrow({
      where: {
        id: HOME_PAGE_CONTENT_ID,
      },
    });

    expect(updatedContent).toMatchObject({
      heroTitle: "Titre modifié",
      escapeTitle: "Nouvel esprit",
      ctaTitle: "Nouveau CTA",

      escapeImageUrl: "https://example.com/escape-2.webp",
      escapeImageFileKey: "escape-2",

      ctaImageUrl: "https://example.com/cta.webp",
      ctaImageFileKey: "cta-1",
    });

    expect(deleteUploadThingFilesMock).toHaveBeenLastCalledWith(["escape-1"]);

    expect(revalidatePathMock).toHaveBeenCalledWith("/");
    expect(revalidatePathMock).toHaveBeenCalledWith("/admin/accueil");
  });

  it("cleans up new images when validation fails", async () => {
    const invalidValues = createContentValues({
      heroTitle: "",
    });

    const result = await updateHomePageContentAdmin(
      invalidValues,
      {
        url: "https://example.com/new-escape.webp",
        fileKey: "new-escape",
      },
      {
        url: "https://example.com/new-cta.webp",
        fileKey: "new-cta",
      },
    );

    expect(result).toEqual({
      success: false,
      message: "Le contenu de la page d’accueil est invalide.",
    });

    expect(deleteUploadThingFilesMock).toHaveBeenCalledWith([
      "new-escape",
      "new-cta",
    ]);

    const persistedContent = await prisma.homePageContent.findUnique({
      where: {
        id: HOME_PAGE_CONTENT_ID,
      },
    });

    expect(persistedContent).toBeNull();
    expect(revalidatePathMock).not.toHaveBeenCalled();
  });
});
