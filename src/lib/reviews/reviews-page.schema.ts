import { z } from "zod";

export const reviewsPageContentSchema = z.object({
  heroEyebrow: z.string().trim().min(1).max(80),
  heroTitle: z.string().trim().min(1).max(160),
  heroDescription: z.string().trim().min(1).max(500),

  recentReviewsEyebrow: z.string().trim().min(1).max(80),
  recentReviewsTitle: z.string().trim().min(1).max(160),
  recentReviewsDescription: z.string().trim().min(1).max(500),

  allReviewsTitle: z.string().trim().min(1).max(160),
  allReviewsDescription: z.string().trim().min(1).max(500),

  ctaEyebrow: z.string().trim().min(1).max(80),
  ctaTitle: z.string().trim().min(1).max(160),
  ctaDescription: z.string().trim().min(1).max(500),
  ctaButtonLabel: z.string().trim().min(1).max(80),
});

export type ReviewsPageContentValues = z.infer<typeof reviewsPageContentSchema>;
