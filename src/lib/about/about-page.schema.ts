import { z } from "zod";

export const aboutPageContentSchema = z.object({
  heroEyebrow: z.string().trim().min(1).max(80),
  heroTitle: z.string().trim().min(1).max(160),
  heroDescription: z.string().trim().min(1).max(500),
  heroButtonLabel: z.string().trim().min(1).max(80),

  spiritEyebrow: z.string().trim().min(1).max(80),
  spiritTitle: z.string().trim().min(1).max(160),
  spiritFirstParagraph: z.string().trim().min(1).max(800),
  spiritSecondParagraph: z.string().trim().min(1).max(800),
  spiritHandwritten: z.string().trim().min(1).max(120),

  philosophyEyebrow: z.string().trim().min(1).max(80),
  philosophyTitle: z.string().trim().min(1).max(160),
  philosophyDescription: z.string().trim().min(1).max(500),

  philosophyFirstTitle: z.string().trim().min(1).max(120),
  philosophyFirstDescription: z.string().trim().min(1).max(500),

  philosophySecondTitle: z.string().trim().min(1).max(120),
  philosophySecondDescription: z.string().trim().min(1).max(500),

  philosophyThirdTitle: z.string().trim().min(1).max(120),
  philosophyThirdDescription: z.string().trim().min(1).max(500),

  philosophyFourthTitle: z.string().trim().min(1).max(120),
  philosophyFourthDescription: z.string().trim().min(1).max(500),

  statsEyebrow: z.string().trim().min(1).max(80),
  statsTitle: z.string().trim().min(1).max(160),

  ctaEyebrow: z.string().trim().min(1).max(80),
  ctaTitle: z.string().trim().min(1).max(160),
  ctaDescription: z.string().trim().min(1).max(500),
  ctaButtonLabel: z.string().trim().min(1).max(80),
});

const aboutPageImageSchema = z.object({
  url: z.string().url(),
  fileKey: z.string().trim().min(1),
});

export const aboutPageImagesSchema = z.object({
  spiritImage: aboutPageImageSchema.nullable(),
  ctaImage: aboutPageImageSchema.nullable(),
});

export type AboutPageContentValues = z.infer<typeof aboutPageContentSchema>;

export type AboutPageImageInput = z.infer<typeof aboutPageImageSchema>;
