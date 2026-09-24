import { z } from "zod";

export const reviewsPageContentSchema = z.object({
  heroEyebrow: z.string().trim().min(1).max(80),
  heroTitle: z.string().trim().min(1).max(160),
  heroDescription: z.string().trim().min(1).max(500),
  heroHandwrittenFirstLine: z.string().trim().min(1).max(120),
  heroHandwrittenSecondLine: z.string().trim().min(1).max(120),

  recentReviewsEyebrow: z.string().trim().min(1).max(80),
  recentReviewsTitle: z.string().trim().min(1).max(160),
  recentReviewsDescription: z.string().trim().min(1).max(500),

  allReviewsTitle: z.string().trim().min(1).max(160),
  allReviewsDescription: z.string().trim().min(1).max(500),

  ctaEyebrow: z.string().trim().min(1).max(80),
  ctaTitle: z.string().trim().min(1).max(160),
  ctaDescription: z.string().trim().min(1).max(500),
  ctaHandwrittenPrefix: z.string().trim().min(1).max(120),
  ctaHandwrittenHighlight: z.string().trim().min(1).max(120),
  ctaButtonLabel: z.string().trim().min(1).max(80),
});

const reviewsPageImageSchema = z.object({
  url: z.string().url(),
  fileKey: z.string().trim().min(1),
});

export const reviewsPageImagesSchema = z.object({
  heroImage: reviewsPageImageSchema.nullable(),
  ctaImage: reviewsPageImageSchema.nullable(),
});

export type ReviewsPageContentValues = z.infer<typeof reviewsPageContentSchema>;

export type ReviewsPageImageInput = z.infer<typeof reviewsPageImageSchema>;
