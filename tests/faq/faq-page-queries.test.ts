import { afterAll, beforeEach, describe, expect, it } from "vitest";

import {
  FAQ_PAGE_CONTENT_ID,
  faqPageContentDefaults,
  faqPageItemsDefaults,
} from "@/lib/faq/faq-page-defaults";
import { getFaqPageContent } from "@/lib/faq/queries/get-faq-page-content";
import { prisma } from "@/lib/prisma";

const resetFaqDatabase = async () => {
  await prisma.faqPageContent.deleteMany();
};

describe("faq page queries", () => {
  beforeEach(async () => {
    await resetFaqDatabase();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("returns the default content when no persisted content exists", async () => {
    const content = await getFaqPageContent();

    expect(content).toEqual({
      ...faqPageContentDefaults,

      items: faqPageItemsDefaults.map((item) => ({
        itemId: null,
        ...item,
      })),
    });
  });

  it("returns persisted questions in position order", async () => {
    await prisma.faqPageContent.create({
      data: {
        id: FAQ_PAGE_CONTENT_ID,
        ...faqPageContentDefaults,

        items: {
          create: [
            {
              question: "Deuxième question",
              answer: "Deuxième réponse",
              position: 2,
            },
            {
              question: "Première question",
              answer: "Première réponse",
              position: 1,
            },
          ],
        },
      },
    });

    const content = await getFaqPageContent();

    expect(
      content.items.map((item) => ({
        question: item.question,
        answer: item.answer,
      })),
    ).toEqual([
      {
        question: "Première question",
        answer: "Première réponse",
      },
      {
        question: "Deuxième question",
        answer: "Deuxième réponse",
      },
    ]);

    expect(content.items.every((item) => item.itemId !== null)).toBe(true);
  });
});
