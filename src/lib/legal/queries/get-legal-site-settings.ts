import {
  LEGAL_SITE_SETTINGS_ID,
  legalSiteSettingsDefaults,
} from "@/lib/legal/legal-site-defaults";
import { prisma } from "@/lib/prisma";

export const getLegalSiteSettings = async () => {
  const settings = await prisma.legalSiteSettings.findUnique({
    where: {
      id: LEGAL_SITE_SETTINGS_ID,
    },
  });

  if (!settings) {
    return {
      id: LEGAL_SITE_SETTINGS_ID,
      ...legalSiteSettingsDefaults,
    };
  }

  return {
    ...legalSiteSettingsDefaults,
    ...settings,
  };
};

export type LegalSiteSettings = Awaited<
  ReturnType<typeof getLegalSiteSettings>
>;
