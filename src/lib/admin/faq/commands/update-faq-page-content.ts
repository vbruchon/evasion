import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import {
  FAQ_PAGE_CONTENT_ID,
  faqPageContentDefaults,
} from "@/lib/faq/faq-page-defaults";
import {
  faqPageContentSchema,
  type FaqPageContentValues,
} from "@/lib/faq/faq-page.schema";

import { hasForeignFaqItem, syncFaqItems } from "../persistence/sync-faq-items";

export const updateFaqPageContentAdmin = async (
  values: FaqPageContentValues,
) => {
  const validation = faqPageContentSchema.safeParse(values);

  if (!validation.success) {
    return {
      success: false as const,
      message: "Le contenu de la page FAQ est invalide.",
    };
  }

  const { items, ...content } = validation.data;

  const existingItems = await prisma.faqItem.findMany({
    where: {
      faqPageContentId: FAQ_PAGE_CONTENT_ID,
    },

    select: {
      id: true,
    },
  });

  if (
    hasForeignFaqItem(
      items,
      existingItems.map((item) => item.id),
    )
  ) {
    return {
      success: false as const,
      message: "Une des questions de la FAQ est invalide.",
    };
  }

  try {
    await prisma.$transaction(async (tx) => {
      await tx.faqPageContent.upsert({
        where: {
          id: FAQ_PAGE_CONTENT_ID,
        },

        update: content,

        create: {
          id: FAQ_PAGE_CONTENT_ID,
          ...faqPageContentDefaults,
          ...content,
        },
      });

      await syncFaqItems(tx, FAQ_PAGE_CONTENT_ID, items);
    });
  } catch {
    return {
      success: false as const,
      message: "Une erreur est survenue pendant l’enregistrement.",
    };
  }

  revalidatePath("/faq");
  revalidatePath("/admin/faq");

  return {
    success: true as const,
  };
};
