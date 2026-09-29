import { z } from "zod";

const optionalEmailSchema = z
  .string()
  .trim()
  .max(160)
  .refine(
    (value) => value === "" || z.string().email().safeParse(value).success,
    {
      message: "Adresse e-mail invalide.",
    },
  );

export const legalSiteSettingsSchema = z.object({
  businessName: z.string().trim().max(160),
  legalForm: z.string().trim().max(80),
  capital: z.string().trim().max(80),

  registeredOfficeAddress: z.string().trim().max(300),
  email: optionalEmailSchema,
  phone: z.string().trim().max(80),

  siren: z.string().trim().max(40),
  siret: z.string().trim().max(40),
  rcs: z.string().trim().max(120),
  rne: z.string().trim().max(80),
  vatNumber: z.string().trim().max(60),

  publicationDirector: z.string().trim().max(160),

  hostName: z.string().trim().max(160),
  hostCompany: z.string().trim().max(160),
  hostAddress: z.string().trim().max(300),
  hostPhone: z.string().trim().max(80),

  privacyEmail: optionalEmailSchema,
  contactDataRetentionPeriod: z.string().trim().max(160),
});

export type LegalSiteSettingsValues = z.infer<typeof legalSiteSettingsSchema>;
