import { revalidatePath } from "next/cache";

import {
  CONTACT_PAGE_CONTENT_ID,
  contactPageContentDefaults,
} from "@/lib/contact/contact-page-defaults";
import {
  contactPageContentSchema,
  type ContactPageContentValues,
} from "@/lib/contact/contact-page.schema";
import { prisma } from "@/lib/prisma";

export const updateContactPageContentAdmin = async (
  values: ContactPageContentValues,
) => {
  const validation = contactPageContentSchema.safeParse(values);

  if (!validation.success) {
    return {
      success: false as const,
      message: "Le contenu de la page Contact est invalide.",
    };
  }

  try {
    await prisma.contactPageContent.upsert({
      where: {
        id: CONTACT_PAGE_CONTENT_ID,
      },

      update: validation.data,

      create: {
        id: CONTACT_PAGE_CONTENT_ID,
        ...contactPageContentDefaults,
        ...validation.data,
      },
    });
  } catch {
    return {
      success: false as const,
      message: "Une erreur est survenue pendant l’enregistrement.",
    };
  }

  revalidatePath("/contact");
  revalidatePath("/admin/contact");

  return {
    success: true as const,
  };
};
