import { prisma } from "@/lib/prisma";

import {
  FAQ_PAGE_CONTENT_ID,
  faqPageContentDefaults,
  faqPageItemsDefaults,
} from "../faq-page-defaults";

export const getFaqPageContent = async () => {
  const content = await prisma.faqPageContent.findUnique({
    where: {
      id: FAQ_PAGE_CONTENT_ID,
    },

    select: {
      heroEyebrow: true,
      heroTitle: true,
      heroDescription: true,

      questionsEyebrow: true,
      questionsTitle: true,
      questionsDescription: true,

      ctaEyebrow: true,
      ctaTitle: true,
      ctaDescription: true,
      ctaButtonLabel: true,

      items: {
        orderBy: {
          position: "asc",
        },

        select: {
          id: true,
          question: true,
          answer: true,
        },
      },
    },
  });

  if (content) {
    return {
      ...content,

      items: content.items.map((item) => ({
        itemId: item.id,
        question: item.question,
        answer: item.answer,
      })),
    };
  }

  return {
    ...faqPageContentDefaults,

    items: faqPageItemsDefaults.map((item) => ({
      itemId: null,
      ...item,
    })),
  };
};
