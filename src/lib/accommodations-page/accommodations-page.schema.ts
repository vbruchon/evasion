import { z } from "zod";

export const accommodationsPageContentSchema = z.object({
  heroEyebrow: z.string().trim().min(1).max(80),
  heroTitle: z.string().trim().min(1).max(160),
  heroDescription: z.string().trim().min(1).max(500),

  ctaEyebrow: z.string().trim().min(1).max(120),
  ctaTitle: z.string().trim().min(1).max(200),
  ctaButtonLabel: z.string().trim().min(1).max(80),
});

const accommodationsPageImageSchema = z.object({
  url: z.string().url(),
  fileKey: z.string().trim().min(1),
});

export const accommodationsPageImagesSchema = z.object({
  heroImage: accommodationsPageImageSchema.nullable(),
  ctaImage: accommodationsPageImageSchema.nullable(),
});

export type AccommodationsPageContentValues = z.infer<
  typeof accommodationsPageContentSchema
>;

export type AccommodationsPageImageInput = z.infer<
  typeof accommodationsPageImageSchema
>;
