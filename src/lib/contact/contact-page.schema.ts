import { z } from "zod";

export const contactPageContentSchema = z.object({
  eyebrow: z.string().trim().min(1).max(80),
  handwritten: z.string().trim().min(1).max(120),
  title: z.string().trim().min(1).max(160),
  description: z.string().trim().min(1).max(500),

  formTitle: z.string().trim().min(1).max(160),
  submitLabel: z.string().trim().min(1).max(80),

  successEyebrow: z.string().trim().min(1).max(80),
  successTitle: z.string().trim().min(1).max(160),
  successDescription: z.string().trim().min(1).max(500),
});

export type ContactPageContentValues = z.infer<typeof contactPageContentSchema>;
