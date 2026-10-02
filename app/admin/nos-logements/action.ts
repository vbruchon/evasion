"use server";

import type {
  AccommodationsPageContentValues,
  AccommodationsPageImageInput,
} from "@/lib/accommodations-page/accommodations-page.schema";
import { updateAccommodationsPageContentAdmin } from "@/lib/admin/accommodations-page/commands/update-accommodations-page-content";
import { requireAdmin } from "@/lib/admin/require-admin";

export const updateAccommodationsPageContent = async (
  values: AccommodationsPageContentValues,
  heroImage: AccommodationsPageImageInput | null,
  ctaImage: AccommodationsPageImageInput | null,
) => {
  await requireAdmin();

  return updateAccommodationsPageContentAdmin(values, heroImage, ctaImage);
};
