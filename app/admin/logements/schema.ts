import { z } from "zod";

const MAX_ACCOMMODATION_IMAGES = 15;

const accommodationFieldsSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Le nom du logement est obligatoire.")
    .max(100, "Le nom ne peut pas dépasser 100 caractères."),

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
  guestCapacity: z
    .int()
    .min(1, "La capacité doit être d’au moins 1 voyageur.")
    .max(20, "La capacité ne peut pas dépasser 20 voyageurs.")
    .nullable(),

  bedrooms: z
    .int()
    .min(0, "Le nombre de chambres ne peut pas être négatif.")
    .max(10, "Le nombre de chambres ne peut pas dépasser 10.")
    .nullable(),

  beds: z
    .int()
    .min(0, "Le nombre de lits ne peut pas être négatif.")
    .max(10, "Le nombre de lits ne peut pas dépasser 10.")
    .nullable(),

  bathrooms: z
    .int()
    .min(0, "Le nombre de salles de bain ne peut pas être négatif.")
    .max(10, "Le nombre de salles de bain ne peut pas dépasser 10.")
    .nullable(),

  surface: z
    .number()
    .positive("La surface doit être supérieure à 0.")
    .max(10000, "La surface ne peut pas dépasser 10 000 m².")
    .nullable(),
});

const accommodationSlugSchema = z
  .string()
  .trim()
  .min(1, "Le slug est obligatoire.")
  .max(100, "Le slug ne peut pas dépasser 100 caractères.")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Le slug doit contenir uniquement des lettres minuscules, chiffres et tirets.",
  );

const hasSingleCoverImage = (images: { isCover: boolean }[]) =>
  images.length === 0 || images.filter((image) => image.isCover).length === 1;

export const accommodationCreateSchema = accommodationFieldsSchema.extend({
  slug: accommodationSlugSchema,
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

export const accommodationUpdateSchema = accommodationFieldsSchema.extend({
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
});

export const accommodationImageSchema = z.object({
  url: z.string().url(),
  fileKey: z.string().min(1),
  isCover: z.boolean(),
});

export const accommodationImagesSchema = z
  .array(accommodationImageSchema)
  .max(
    MAX_ACCOMMODATION_IMAGES,
    `Un logement ne peut pas contenir plus de ${MAX_ACCOMMODATION_IMAGES} images.`,
  )
  .refine(hasSingleCoverImage, {
    message: "Une seule image de couverture doit être sélectionnée.",
  });

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
  .max(
    MAX_ACCOMMODATION_IMAGES,
    `Un logement ne peut pas contenir plus de ${MAX_ACCOMMODATION_IMAGES} images.`,
  )
  .refine(hasSingleCoverImage, {
    message: "Une seule image de couverture doit être sélectionnée.",
  });

const accommodationDraftValuesSchema = z.preprocess((value) => {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return value;
  }

  return {
    guestCapacity: null,
    bedrooms: null,
    beds: null,
    bathrooms: null,
    surface: null,
    ...(value as Record<string, unknown>),
  };
}, accommodationFieldsSchema);

export const accommodationDraftContentSchema = z.object({
  version: z.literal(1),
  values: accommodationDraftValuesSchema,
  images: accommodationUpdateImagesSchema,
});

export type AccommodationCreateFormValues = z.infer<
  typeof accommodationCreateSchema
>;

export type AccommodationUpdateFormValues = z.infer<
  typeof accommodationUpdateSchema
>;

export type AccommodationImageInput = z.infer<typeof accommodationImageSchema>;

export type AccommodationUpdateImageInput = z.infer<
  typeof accommodationUpdateImageSchema
>;

export type AccommodationDraftContent = z.infer<
  typeof accommodationDraftContentSchema
>;

export type AccommodationTextFormValues = Pick<
  AccommodationCreateFormValues,
  "name" | "slug" | "type" | "subtitle" | "shortDescription" | "description"
>;
