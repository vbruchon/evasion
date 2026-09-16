import { prisma } from "@/lib/prisma";

import {
  REVIEWS_PAGE_CONTENT_ID,
  reviewsPageContentDefaults,
} from "../reviews-page-defaults";

export const getReviewsPageContent = async () => {
  const content = await prisma.reviewsPageContent.findUnique({
    where: {
      id: REVIEWS_PAGE_CONTENT_ID,
    },

    select: {
      heroEyebrow: true,
      heroTitle: true,
      heroDescription: true,
      heroImageUrl: true,
      heroImageFileKey: true,

      recentReviewsEyebrow: true,
      recentReviewsTitle: true,
      recentReviewsDescription: true,

      allReviewsTitle: true,
      allReviewsDescription: true,

      ctaEyebrow: true,
      ctaTitle: true,
      ctaDescription: true,
      ctaButtonLabel: true,
      ctaImageUrl: true,
      ctaImageFileKey: true,
    },
  });

  if (content) {
    return content;
  }

  return {
    ...reviewsPageContentDefaults,

    heroImageUrl: null,
    heroImageFileKey: null,

    ctaImageUrl: null,
    ctaImageFileKey: null,
  };
};
