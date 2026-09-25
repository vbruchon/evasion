import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";

const { revalidatePathMock } = vi.hoisted(() => ({
  revalidatePathMock: vi.fn(),
}));

vi.mock("next/cache", () => ({
  revalidatePath: revalidatePathMock,
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

  it("creates and updates the faq page content and questions", async () => {
    const firstResult = await updateFaqPageContentAdmin(
      createContentValues({
        heroTitle: "FAQ initiale",
        heroHandwrittenFirstLine: "Toutes les infos,",
        heroHandwrittenSecondLine: "au même endroit.",
      }),
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

    expect(updatedContent.heroTitle).toBe("FAQ modifiée");

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

    expect(revalidatePathMock).toHaveBeenCalledWith("/faq");
    expect(revalidatePathMock).toHaveBeenCalledWith("/admin/faq");
  });

  it("rejects invalid content", async () => {
    const result = await updateFaqPageContentAdmin(
      createContentValues({
        heroTitle: "",
      }),
    );

    expect(result).toEqual({
      success: false,
      message: "Le contenu de la page FAQ est invalide.",
    });

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
