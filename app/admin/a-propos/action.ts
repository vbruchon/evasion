"use server";

import type {
  AboutPageContentValues,
  AboutPageImageInput,
} from "@/lib/about/about-page.schema";
import { updateAboutPageContentAdmin } from "@/lib/admin/about/commands/update-about-page-content";
import { requireAdmin } from "@/lib/admin/require-admin";

export const updateAboutPageContent = async (
  values: AboutPageContentValues,
  spiritImage: AboutPageImageInput | null,
  ctaImage: AboutPageImageInput | null,
) => {
  await requireAdmin();

  return updateAboutPageContentAdmin(values, spiritImage, ctaImage);
};
