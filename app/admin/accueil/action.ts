"use server";

import { updateHomePageContentAdmin } from "@/lib/admin/home/commands/update-home-page-content";
import { requireAdmin } from "@/lib/admin/require-admin";
import type {
  HomePageContentValues,
  HomePageImageInput,
} from "@/lib/home/home-page.schema";

export const updateHomePageContent = async (
  values: HomePageContentValues,
  escapeImage: HomePageImageInput | null,
  ctaImage: HomePageImageInput | null,
) => {
  await requireAdmin();

  return updateHomePageContentAdmin(values, escapeImage, ctaImage);
};
