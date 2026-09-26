import { z } from "zod";

export const CONTACT_REQUEST_SUBJECTS = ["ACCOMMODATION", "OTHER"] as const;

export const contactRequestSubjectSchema = z.enum(CONTACT_REQUEST_SUBJECTS);

export const contactRequestSchema = z
  .object({
    firstName: z.string().trim().max(80),

    email: z
      .string()
      .trim()
      .min(1, "Votre adresse e-mail est requise.")
      .email("Saisissez une adresse e-mail valide.")
      .max(254),

    subject: contactRequestSubjectSchema,

    accommodationId: z.string().trim().min(1).nullable(),

    message: z.string().trim().min(1, "Votre message est requis.").max(3000),
  })
  .superRefine((values, ctx) => {
    if (values.subject === "ACCOMMODATION" && values.accommodationId === null) {
      ctx.addIssue({
        code: "custom",
        path: ["accommodationId"],
        message: "Sélectionnez le logement concerné.",
      });
    }

    if (values.subject === "OTHER" && values.accommodationId !== null) {
      ctx.addIssue({
        code: "custom",
        path: ["accommodationId"],
        message: "Aucun logement ne doit être associé à cette demande.",
      });
    }
  });

export type ContactRequestValues = z.infer<typeof contactRequestSchema>;
