import { z } from "zod";

export const contactPageContentSchema = z.object({
  eyebrow: z.string().trim().min(1).max(80),
  handwritten: z.string().trim().min(1).max(120),
  title: z.string().trim().min(1).max(160),
  description: z.string().trim().min(1).max(500),

  reassuranceFirstLabel: z.string().trim().min(1).max(100),
  reassuranceSecondLabel: z.string().trim().min(1).max(100),
  reassuranceThirdLabel: z.string().trim().min(1).max(100),

  formTitle: z.string().trim().min(1).max(160),

  accommodationSubjectTitle: z.string().trim().min(1).max(80),
  accommodationSubjectDescription: z.string().trim().min(1).max(160),

  otherSubjectTitle: z.string().trim().min(1).max(80),
  otherSubjectDescription: z.string().trim().min(1).max(160),

  accommodationLabel: z.string().trim().min(1).max(100),

  firstNameLabel: z.string().trim().min(1).max(80),
  firstNamePlaceholder: z.string().trim().min(1).max(160),

  emailLabel: z.string().trim().min(1).max(80),
  emailPlaceholder: z.string().trim().min(1).max(160),

  messageLabel: z.string().trim().min(1).max(120),
  messagePlaceholder: z.string().trim().min(1).max(240),

  submitLabel: z.string().trim().min(1).max(80),

  successEyebrow: z.string().trim().min(1).max(80),
  successTitle: z.string().trim().min(1).max(160),
  successDescription: z.string().trim().min(1).max(500),
  successResetLabel: z.string().trim().min(1).max(100),
});

export type ContactPageContentValues = z.infer<typeof contactPageContentSchema>;
