"use server";

import { updateFaqPageContentAdmin } from "@/lib/admin/faq/commands/update-faq-page-content";
import { requireAdmin } from "@/lib/admin/require-admin";
import type { FaqPageContentValues } from "@/lib/faq/faq-page.schema";

export const updateFaqPageContent = async (values: FaqPageContentValues) => {
  await requireAdmin();

  return updateFaqPageContentAdmin(values);
};
