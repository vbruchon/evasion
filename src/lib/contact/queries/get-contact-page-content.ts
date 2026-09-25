import { prisma } from "@/lib/prisma";

import {
  CONTACT_PAGE_CONTENT_ID,
  contactPageContentDefaults,
} from "../contact-page-defaults";

export const getContactPageContent = async () => {
  const content = await prisma.contactPageContent.findUnique({
    where: {
      id: CONTACT_PAGE_CONTENT_ID,
    },

    select: {
      eyebrow: true,
      handwritten: true,
      title: true,
      description: true,

      formTitle: true,
      submitLabel: true,

      successEyebrow: true,
      successTitle: true,
      successDescription: true,
    },
  });

  return content ?? contactPageContentDefaults;
};
