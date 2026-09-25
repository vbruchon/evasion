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

import { updateFaqPageContentAdmin } from "@/lib/admin/faq/commands/update-faq-page-content";
import {
  FAQ_PAGE_CONTENT_ID,
  faqPageContentDefaults,
} from "@/lib/faq/faq-page-defaults";
import type { FaqPageContentValues } from "@/lib/faq/faq-page.schema";
import { prisma } from "@/lib/prisma";

const createContentValues = (
  overrides: Partial<FaqPageContentValues> = {},
): FaqPageContentValues => ({
  ...faqPageContentDefaults,

  items: [
    {
      itemId: null,
      question: "Première question",
      answer: "Première réponse",
    },
    {
      itemId: null,
      question: "Deuxième question",
      answer: "Deuxième réponse",
    },
  ],

  ...overrides,
});

describe("updateFaqPageContentAdmin", () => {
  beforeEach(async () => {
    await prisma.faqPageContent.deleteMany();

    vi.clearAllMocks();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("creates and updates the faq page content, questions and images", async () => {
    const firstResult = await updateFaqPageContentAdmin(
      createContentValues({
        heroTitle: "FAQ initiale",
        heroHandwrittenFirstLine: "Toutes les infos,",
        heroHandwrittenSecondLine: "au même endroit.",
      }),
      {
        url: "https://example.com/faq-hero-1.webp",
        fileKey: "faq-hero-1",
      },
      null,
    );

    expect(firstResult).toEqual({
      success: true,
    });

    const createdContent = await prisma.faqPageContent.findUniqueOrThrow({
      where: {
        id: FAQ_PAGE_CONTENT_ID,
      },

      include: {
        items: {
          orderBy: {
            position: "asc",
          },
        },
      },
    });

    expect(createdContent.items).toHaveLength(2);

    expect(createdContent).toMatchObject({
      heroTitle: "FAQ initiale",
      heroHandwrittenFirstLine: "Toutes les infos,",
      heroHandwrittenSecondLine: "au même endroit.",

      heroImageUrl: "https://example.com/faq-hero-1.webp",
      heroImageFileKey: "faq-hero-1",

      ctaImageUrl: null,
      ctaImageFileKey: null,
    });

    const [firstItem, secondItem] = createdContent.items;

    const secondResult = await updateFaqPageContentAdmin(
      createContentValues({
        heroTitle: "FAQ modifiée",

        items: [
          {
            itemId: secondItem.id,
            question: "Deuxième question modifiée",
            answer: "Deuxième réponse modifiée",
          },
          {
            itemId: null,
            question: "Nouvelle question",
            answer: "Nouvelle réponse",
          },
        ],
      }),
      {
        url: "https://example.com/faq-hero-2.webp",
        fileKey: "faq-hero-2",
      },
      {
        url: "https://example.com/faq-cta.webp",
        fileKey: "faq-cta-1",
      },
    );

    expect(secondResult).toEqual({
      success: true,
    });

    const updatedContent = await prisma.faqPageContent.findUniqueOrThrow({
      where: {
        id: FAQ_PAGE_CONTENT_ID,
      },

      include: {
        items: {
          orderBy: {
            position: "asc",
          },
        },
      },
    });

    expect(updatedContent).toMatchObject({
      heroTitle: "FAQ modifiée",

      heroImageUrl: "https://example.com/faq-hero-2.webp",
      heroImageFileKey: "faq-hero-2",

      ctaImageUrl: "https://example.com/faq-cta.webp",
      ctaImageFileKey: "faq-cta-1",
    });

    expect(updatedContent.items).toMatchObject([
      {
        id: secondItem.id,
        question: "Deuxième question modifiée",
        answer: "Deuxième réponse modifiée",
        position: 0,
      },
      {
        question: "Nouvelle question",
        answer: "Nouvelle réponse",
        position: 1,
      },
    ]);

    expect(updatedContent.items.some((item) => item.id === firstItem.id)).toBe(
      false,
    );

    expect(deleteUploadThingFilesMock).toHaveBeenLastCalledWith(["faq-hero-1"]);

    expect(revalidatePathMock).toHaveBeenCalledWith("/faq");
    expect(revalidatePathMock).toHaveBeenCalledWith("/admin/faq");
  });

  it("cleans up newly uploaded images when validation fails", async () => {
    const result = await updateFaqPageContentAdmin(
      createContentValues({
        heroTitle: "",
      }),
      {
        url: "https://example.com/new-faq-hero.webp",
        fileKey: "new-faq-hero",
      },
      null,
    );

    expect(result).toEqual({
      success: false,
      message: "Le contenu de la page FAQ est invalide.",
    });

    expect(deleteUploadThingFilesMock).toHaveBeenCalledWith(["new-faq-hero"]);

    expect(
      await prisma.faqPageContent.findUnique({
        where: {
          id: FAQ_PAGE_CONTENT_ID,
        },
      }),
    ).toBeNull();

    expect(revalidatePathMock).not.toHaveBeenCalled();
  });
});
