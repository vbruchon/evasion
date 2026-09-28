import { z } from "zod";

export const homePageContentSchema = z.object({
  heroEyebrow: z.string().trim().min(1).max(80),
  heroTitle: z.string().trim().min(1).max(160),
  heroDescription: z.string().trim().min(1).max(500),
  heroButtonLabel: z.string().trim().min(1).max(80),

  accommodationsEyebrow: z.string().trim().min(1).max(80),
  accommodationsTitle: z.string().trim().min(1).max(160),
  accommodationsDescription: z.string().trim().min(1).max(500),

  escapeEyebrow: z.string().trim().min(1).max(80),
  escapeTitle: z.string().trim().min(1).max(160),
  escapeDescription: z.string().trim().min(1).max(500),
  escapeHandwritten: z.string().trim().min(1).max(120),

  reviewsEyebrow: z.string().trim().min(1).max(80),

  ctaEyebrow: z.string().trim().min(1).max(80),
  ctaTitle: z.string().trim().min(1).max(160),
  ctaDescription: z.string().trim().min(1).max(500),
  ctaButtonLabel: z.string().trim().min(1).max(80),
});

const homePageImageSchema = z.object({
  url: z.string().url(),
  fileKey: z.string().trim().min(1),
});

export const homePageImagesSchema = z.object({
  escapeImage: homePageImageSchema.nullable(),
  ctaImage: homePageImageSchema.nullable(),
});

export type HomePageContentValues = z.infer<typeof homePageContentSchema>;

export type HomePageImageInput = z.infer<typeof homePageImageSchema>;
