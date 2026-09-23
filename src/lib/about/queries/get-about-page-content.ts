import { prisma } from "@/lib/prisma";

import {
  ABOUT_PAGE_CONTENT_ID,
  aboutPageContentDefaults,
} from "../about-page-defaults";

export const getAboutPageContent = async () => {
  const content = await prisma.aboutPageContent.findUnique({
    where: {
      id: ABOUT_PAGE_CONTENT_ID,
    },

    select: {
      heroEyebrow: true,
      heroTitle: true,
      heroDescription: true,
      heroButtonLabel: true,

      spiritEyebrow: true,
      spiritTitle: true,
      spiritFirstParagraph: true,
      spiritSecondParagraph: true,
      spiritHandwritten: true,
      spiritImageUrl: true,
      spiritImageFileKey: true,

      philosophyEyebrow: true,
      philosophyTitle: true,
      philosophyDescription: true,

      philosophyFirstTitle: true,
      philosophyFirstDescription: true,

      philosophySecondTitle: true,
      philosophySecondDescription: true,

      philosophyThirdTitle: true,
      philosophyThirdDescription: true,

      philosophyFourthTitle: true,
      philosophyFourthDescription: true,

      statsEyebrow: true,
      statsTitle: true,

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
    ...aboutPageContentDefaults,

    spiritImageUrl: null,
    spiritImageFileKey: null,

    ctaImageUrl: null,
    ctaImageFileKey: null,
  };
};
