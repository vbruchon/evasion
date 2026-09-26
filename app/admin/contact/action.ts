"use server";

import { requireAdmin } from "@/lib/admin/require-admin";
import { updateContactPageContentAdmin } from "@/lib/admin/contact/commands/update-contact-page-content";
import type { ContactPageContentValues } from "@/lib/contact/contact-page.schema";

export const updateContactPageContent = async (
  values: ContactPageContentValues,
) => {
  await requireAdmin();

  return updateContactPageContentAdmin(values);
};
