import { prisma } from "@/lib/prisma";

import {
  HOME_PAGE_CONTENT_ID,
  homePageContentDefaults,
} from "../home-page-defaults";

export const getHomePageContent = async () => {
  const content = await prisma.homePageContent.findUnique({
    where: {
      id: HOME_PAGE_CONTENT_ID,
    },
    select: {
      heroEyebrow: true,
      heroTitle: true,
      heroDescription: true,
      heroButtonLabel: true,

      accommodationsEyebrow: true,
      accommodationsTitle: true,
      accommodationsDescription: true,

      escapeEyebrow: true,
      escapeTitle: true,
      escapeDescription: true,
      escapeHandwritten: true,
      escapeImageUrl: true,
      escapeImageFileKey: true,

      reviewsEyebrow: true,

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
    ...homePageContentDefaults,
    escapeImageUrl: null,
    escapeImageFileKey: null,
    ctaImageUrl: null,
    ctaImageFileKey: null,
  };
};
