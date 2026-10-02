import {
  ACCOMMODATIONS_PAGE_CONTENT_ID,
  accommodationsPageContentDefaults,
} from "@/lib/accommodations-page/accommodations-page-defaults";
import { prisma } from "@/lib/prisma";

export const getAccommodationsPageContent = async () => {
  const content = await prisma.accommodationsPageContent.findUnique({
    where: {
      id: ACCOMMODATIONS_PAGE_CONTENT_ID,
    },

    select: {
      heroEyebrow: true,
      heroTitle: true,
      heroDescription: true,
      heroImageUrl: true,
      heroImageFileKey: true,

      ctaEyebrow: true,
      ctaTitle: true,
      ctaButtonLabel: true,
      ctaImageUrl: true,
      ctaImageFileKey: true,
    },
  });

  if (content) {
    return content;
  }

  return {
    ...accommodationsPageContentDefaults,

    heroImageUrl: null,
    heroImageFileKey: null,

    ctaImageUrl: null,
    ctaImageFileKey: null,
  };
};
