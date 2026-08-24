import { z } from "zod";

export const accommodationsSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Le nom du logement est obligatoire.")
    .max(100, "Le nom ne peut pas dépasser 100 caractères."),

  slug: z
    .string()
    .trim()
    .min(1, "Le slug est obligatoire.")
    .max(100, "Le slug ne peut pas dépasser 100 caractères.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Le slug doit contenir uniquement des lettres minuscules, chiffres et tirets.",
    ),

  type: z
    .string()
    .trim()
    .max(100, "Le type ne peut pas dépasser 100 caractères."),

  subtitle: z
    .string()
    .trim()
    .max(200, "Le sous-titre ne peut pas dépasser 200 caractères."),

  shortDescription: z
    .string()
    .trim()
    .max(500, "La description courte ne peut pas dépasser 500 caractères."),

  description: z.string().trim(),

  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
});

export const accommodationImageSchema = z.object({
  url: z.string().url(),
  fileKey: z.string().min(1),
  isCover: z.boolean(),
});

export const accommodationImagesSchema = z
  .array(accommodationImageSchema)
  .max(15, "Un logement ne peut pas contenir plus de 15 images.")
  .refine(
    (images) =>
      images.length === 0 ||
      images.filter((image) => image.isCover).length === 1,
    {
      message: "Une seule image de couverture doit être sélectionnée.",
    },
  );

export type AccommodationFormValues = z.infer<typeof accommodationsSchema>;

export type AccommodationImageInput = z.infer<typeof accommodationImageSchema>;

export const accommodationUpdateImageSchema = z.union([
  z.object({
    id: z.string().min(1),
    isCover: z.boolean(),
  }),
  z.object({
    url: z.string().url(),
    fileKey: z.string().min(1),
    isCover: z.boolean(),
  }),
]);

export const accommodationUpdateImagesSchema = z
  .array(accommodationUpdateImageSchema)
  .max(15, "Un logement ne peut pas contenir plus de 15 images.")
  .refine(
    (images) =>
      images.length === 0 ||
      images.filter((image) => image.isCover).length === 1,
    {
      message: "Une seule image de couverture doit être sélectionnée.",
    },
  );

export type AccommodationUpdateImageInput = z.infer<
  typeof accommodationUpdateImageSchema
>;
