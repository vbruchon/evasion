import { z } from "zod";

import { accommodationHighlightsSchema } from "./schemas/accommodation-highlight.schema";
import { accommodationUpdateImagesSchema } from "./schemas/accommodation-image.schema";

const accommodationNameSchema = z
  .string()
  .trim()
  .min(1, "Le nom du logement est obligatoire.")
  .max(100, "Le nom ne peut pas dépasser 100 caractères.");

const accommodationTypeSchema = z
  .string()
  .trim()
  .max(100, "Le type ne peut pas dépasser 100 caractères.");

const accommodationFieldsSchema = z.object({
  name: accommodationNameSchema,

  type: accommodationTypeSchema,

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

export const accommodationCreateSchema = z.object({
  name: accommodationNameSchema,

  type: accommodationTypeSchema.min(1, "Le type de logement est obligatoire."),
});

export const accommodationUpdateSchema = accommodationFieldsSchema.extend({
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
  highlights: accommodationHighlightsSchema,
});

export const accommodationDraftContentSchema = z.object({
  version: z.literal(1),
  values: accommodationDraftValuesSchema,
  images: accommodationUpdateImagesSchema,
  highlights: accommodationHighlightsSchema.default([]),
});

export {
  accommodationHighlightSchema,
  accommodationHighlightsSchema,
} from "./schemas/accommodation-highlight.schema";

export {
  accommodationImageSchema,
  accommodationImagesSchema,
  accommodationUpdateImageSchema,
  accommodationUpdateImagesSchema,
} from "./schemas/accommodation-image.schema";

export type {
  AccommodationHighlightInput,
  AccommodationHighlightsInput,
} from "./schemas/accommodation-highlight.schema";

export type {
  AccommodationImageInput,
  AccommodationUpdateImageInput,
} from "./schemas/accommodation-image.schema";

export type AccommodationCreateFormValues = z.infer<
  typeof accommodationCreateSchema
>;

export type AccommodationUpdateFormValues = z.infer<
  typeof accommodationUpdateSchema
>;

export type AccommodationDraftContent = z.infer<
  typeof accommodationDraftContentSchema
>;

export type AccommodationTextFormValues = Pick<
  AccommodationUpdateFormValues,
  "name" | "type" | "subtitle" | "shortDescription" | "description"
>;
