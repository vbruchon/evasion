import { prisma } from "@/lib/prisma";
import { getReviewsPageContent } from "@/lib/reviews/queries/get-reviews-page-content";
import { getReviewsPageSummary } from "@/lib/reviews/queries/get-reviews-page-summary";

export const getReviewsPageAdminData = async () => {
  const [content, summary, latestImport] = await Promise.all([
    getReviewsPageContent(),
    getReviewsPageSummary(),

    prisma.accommodation.findFirst({
      where: {
        lastReviewsImportAt: {
          not: null,
        },
      },

      orderBy: {
        lastReviewsImportAt: "desc",
      },

      select: {
        lastReviewsImportAt: true,
      },
    }),
  ]);

  return {
    content,
    summary,
    lastReviewsImportAt:
      latestImport?.lastReviewsImportAt?.toISOString() ?? null,
  };
};
