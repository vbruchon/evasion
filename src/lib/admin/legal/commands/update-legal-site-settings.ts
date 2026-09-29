import { revalidatePath } from "next/cache";

import {
  LEGAL_SITE_SETTINGS_ID,
  legalSiteSettingsDefaults,
} from "@/lib/legal/legal-site-defaults";
import {
  legalSiteSettingsSchema,
  type LegalSiteSettingsValues,
} from "@/lib/legal/legal-site.schema";
import { prisma } from "@/lib/prisma";

const emptyToNull = (value: string) => {
  const trimmedValue = value.trim();

  return trimmedValue || null;
};

export const updateLegalSiteSettingsAdmin = async (
  values: LegalSiteSettingsValues,
) => {
  const validation = legalSiteSettingsSchema.safeParse(values);

  if (!validation.success) {
    return {
      success: false as const,
      message: "Les informations légales renseignées sont invalides.",
    };
  }

  const data = Object.fromEntries(
    Object.entries(validation.data).map(([key, value]) => [
      key,
      emptyToNull(value),
    ]),
  ) as {
    [Key in keyof LegalSiteSettingsValues]: string | null;
  };

  try {
    await prisma.legalSiteSettings.upsert({
      where: {
        id: LEGAL_SITE_SETTINGS_ID,
      },

      update: data,

      create: {
        id: LEGAL_SITE_SETTINGS_ID,
        ...Object.fromEntries(
          Object.entries(legalSiteSettingsDefaults).map(([key, value]) => [
            key,
            emptyToNull(value),
          ]),
        ),
        ...data,
      },
    });
  } catch {
    return {
      success: false as const,
      message: "Une erreur est survenue pendant l’enregistrement.",
    };
  }

  revalidatePath("/mentions-legales");
  revalidatePath("/politique-de-confidentialite");
  revalidatePath("/admin/informations-legales");

  return {
    success: true as const,
  };
};
