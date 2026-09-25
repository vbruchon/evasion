import { z } from "zod";

const faqPageItemSchema = z.object({
  itemId: z.string().trim().min(1).nullable(),

  question: z.string().trim().min(1).max(200),
  answer: z.string().trim().min(1).max(2000),
});

export const faqPageContentSchema = z.object({
  heroEyebrow: z.string().trim().min(1).max(80),
  heroTitle: z.string().trim().min(1).max(160),
  heroDescription: z.string().trim().min(1).max(500),
  heroHandwrittenFirstLine: z.string().trim().min(1).max(120),
  heroHandwrittenSecondLine: z.string().trim().min(1).max(120),

  questionsEyebrow: z.string().trim().min(1).max(80),
  questionsTitle: z.string().trim().min(1).max(160),
  questionsDescription: z.string().trim().min(1).max(500),

  items: z.array(faqPageItemSchema).min(1).max(30),

  ctaEyebrow: z.string().trim().min(1).max(80),
  ctaTitle: z.string().trim().min(1).max(160),
  ctaDescription: z.string().trim().min(1).max(500),
  ctaButtonLabel: z.string().trim().min(1).max(80),
});

export type FaqPageContentValues = z.infer<typeof faqPageContentSchema>;

export type FaqPageItemInput = z.infer<typeof faqPageItemSchema>;
