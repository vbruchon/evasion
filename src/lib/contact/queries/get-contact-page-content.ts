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

      reassuranceFirstLabel: true,
      reassuranceSecondLabel: true,
      reassuranceThirdLabel: true,

      formTitle: true,

      accommodationSubjectTitle: true,
      accommodationSubjectDescription: true,
      otherSubjectTitle: true,
      otherSubjectDescription: true,

      accommodationLabel: true,

      firstNameLabel: true,
      firstNamePlaceholder: true,

      emailLabel: true,
      emailPlaceholder: true,

      messageLabel: true,
      messagePlaceholder: true,

      submitLabel: true,

      successEyebrow: true,
      successTitle: true,
      successDescription: true,
      successResetLabel: true,
    },
  });

  return content ?? contactPageContentDefaults;
};
