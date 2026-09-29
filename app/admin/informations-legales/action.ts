"use server";

import { requireAdmin } from "@/lib/admin/require-admin";
import { updateLegalSiteSettingsAdmin } from "@/lib/admin/legal/commands/update-legal-site-settings";
import type { LegalSiteSettingsValues } from "@/lib/legal/legal-site.schema";

export const updateLegalSiteSettings = async (
  values: LegalSiteSettingsValues,
) => {
  await requireAdmin();

  return updateLegalSiteSettingsAdmin(values);
};
