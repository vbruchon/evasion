import type { Prisma } from "@/generated/prisma/client";

import type { FaqPageItemInput } from "@/lib/faq/faq-page.schema";

const getExistingFaqItemIds = (items: FaqPageItemInput[]) =>
  items.flatMap((item) => (item.itemId ? [item.itemId] : []));

export const hasForeignFaqItem = (
  items: FaqPageItemInput[],
  existingItemIds: Iterable<string>,
) => {
  const existingIds = new Set(existingItemIds);

  return getExistingFaqItemIds(items).some(
    (itemId) => !existingIds.has(itemId),
  );
};

export const syncFaqItems = async (
  tx: Prisma.TransactionClient,
  faqPageContentId: string,
  items: FaqPageItemInput[],
) => {
  const existingItemIds = getExistingFaqItemIds(items);

  await tx.faqItem.deleteMany({
    where: {
      faqPageContentId,

      ...(existingItemIds.length > 0
        ? {
            id: {
              notIn: existingItemIds,
            },
          }
        : {}),
    },
  });

  for (const [position, item] of items.entries()) {
    if (item.itemId) {
      await tx.faqItem.update({
        where: {
          id: item.itemId,
        },

        data: {
          question: item.question,
          answer: item.answer,
          position,
        },
      });

      continue;
    }

    await tx.faqItem.create({
      data: {
        faqPageContentId,
        question: item.question,
        answer: item.answer,
        position,
      },
    });
  }
};
