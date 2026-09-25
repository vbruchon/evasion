"use server";

import { updateFaqPageContentAdmin } from "@/lib/admin/faq/commands/update-faq-page-content";
import { requireAdmin } from "@/lib/admin/require-admin";
import type {
  FaqPageContentValues,
  FaqPageImageInput,
} from "@/lib/faq/faq-page.schema";

export const updateFaqPageContent = async (
  values: FaqPageContentValues,
  heroImage: FaqPageImageInput | null,
  ctaImage: FaqPageImageInput | null,
) => {
  await requireAdmin();

  return updateFaqPageContentAdmin(values, heroImage, ctaImage);
};
