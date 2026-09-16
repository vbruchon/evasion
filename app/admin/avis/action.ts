"use server";

import { updateReviewsPageContentAdmin } from "@/lib/admin/reviews/commands/update-reviews-page-content";
import { requireAdmin } from "@/lib/admin/require-admin";
import type {
  ReviewsPageContentValues,
  ReviewsPageImageInput,
} from "@/lib/reviews/reviews-page.schema";

export const updateReviewsPageContent = async (
  values: ReviewsPageContentValues,
  heroImage: ReviewsPageImageInput | null,
  ctaImage: ReviewsPageImageInput | null,
) => {
  await requireAdmin();

  return updateReviewsPageContentAdmin(values, heroImage, ctaImage);
};
