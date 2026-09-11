import { z } from "zod";

import { accommodationAccessesSchema } from "./schemas/accommodation-access.schema";
import { accommodationAmenitiesSchema } from "./schemas/accommodation-amenity.schema";
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

const accommodationBaseFieldsSchema = z.object({
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

  locationTitle: z
    .string()
    .trim()
    .max(200, "Le titre de localisation ne peut pas dépasser 200 caractères."),

  locationDescription: z
    .string()
    .trim()
    .max(
      1000,
      "La description de localisation ne peut pas dépasser 1 000 caractères.",
    ),

  locationLatitude: z.number().min(-90).max(90).nullable(),

  locationLongitude: z.number().min(-180).max(180).nullable(),

  locationRadiusMeters: z
    .int()
    .min(100, "Le rayon doit être d’au moins 100 mètres.")
    .max(50000, "Le rayon ne peut pas dépasser 50 kilomètres.")
    .nullable(),

  availabilityCalendarUrl: z
    .string()
    .trim()
    .max(2048, "Le lien du calendrier est trop long."),

  bookingUrl: z
    .string()
    .trim()
    .max(2048, "Le lien de réservation est trop long."),

  availabilityTitle: z
    .string()
    .trim()
    .min(1, "Le titre des disponibilités est obligatoire.")
    .max(
      200,
      "Le titre des disponibilités ne peut pas dépasser 200 caractères.",
    ),

  availabilityDescription: z
    .string()
    .trim()
    .min(1, "La description des disponibilités est obligatoire.")
    .max(
      1000,
      "La description des disponibilités ne peut pas dépasser 1 000 caractères.",
    ),

  bookingButtonLabel: z
    .string()
    .trim()
    .min(1, "Le libellé du bouton de réservation est obligatoire.")
    .max(
      100,
      "Le libellé du bouton de réservation ne peut pas dépasser 100 caractères.",
    ),

  reviewsTitle: z
    .string()
    .trim()
    .min(1, "Le titre des avis est obligatoire.")
    .max(200, "Le titre des avis ne peut pas dépasser 200 caractères."),
  reviewsDescription: z
    .string()
    .trim()
    .min(1, "La description des avis est obligatoire.")
    .max(500, "La description des avis ne peut pas dépasser 500 caractères."),
});

type AccommodationLocationValues = Pick<
  z.infer<typeof accommodationBaseFieldsSchema>,
  "locationLatitude" | "locationLongitude" | "locationRadiusMeters"
>;

const validateAccommodationLocation = (
  values: AccommodationLocationValues,
  context: z.RefinementCtx,
) => {
  const hasLatitude = values.locationLatitude !== null;
  const hasLongitude = values.locationLongitude !== null;

  if (hasLatitude !== hasLongitude) {
    context.addIssue({
      code: "custom",
      path: ["locationLatitude"],
      message: "La latitude et la longitude doivent être renseignées ensemble.",
    });

    context.addIssue({
      code: "custom",
      path: ["locationLongitude"],
      message: "La latitude et la longitude doivent être renseignées ensemble.",
    });
  }

  if (values.locationRadiusMeters !== null && (!hasLatitude || !hasLongitude)) {
    context.addIssue({
      code: "custom",
      path: ["locationRadiusMeters"],
      message:
        "Une localisation doit être définie avant de renseigner un rayon.",
    });
  }
};

const accommodationFieldsSchema = accommodationBaseFieldsSchema.superRefine(
  validateAccommodationLocation,
);

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

    locationTitle: "",
    locationDescription: "",
    locationLatitude: null,
    locationLongitude: null,
    locationRadiusMeters: null,

    availabilityCalendarUrl: "",
    bookingUrl: "",

    availabilityTitle: "Planifiez votre séjour",
    availabilityDescription:
      "Consultez les prochaines disponibilités du logement et choisissez les dates qui vous conviennent.",
    bookingButtonLabel: "Continuer sur Airbnb",

    reviewsTitle: "Leurs moments, leurs mots",
    reviewsDescription:
      "Découvrez les impressions laissées par les voyageurs après leur séjour.",

    ...(value as Record<string, unknown>),
  };
}, accommodationFieldsSchema);

export const accommodationCreateSchema = z.object({
  name: accommodationNameSchema,

  type: accommodationTypeSchema.min(1, "Le type de logement est obligatoire."),
});

export const accommodationUpdateSchema = accommodationBaseFieldsSchema
  .extend({
    status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
    highlights: accommodationHighlightsSchema,
    amenities: accommodationAmenitiesSchema,
    accesses: accommodationAccessesSchema,
  })
  .superRefine(validateAccommodationLocation);

export const accommodationDraftContentSchema = z.object({
  version: z.literal(1),
  values: accommodationDraftValuesSchema,
  images: accommodationUpdateImagesSchema,
  highlights: accommodationHighlightsSchema.default([]),

  amenities: accommodationAmenitiesSchema.default([]),

  accesses: accommodationAccessesSchema.default([]),
});

export {
  accommodationAccessSchema,
  accommodationAccessesSchema,
} from "./schemas/accommodation-access.schema";

export {
  accommodationAmenitySchema,
  accommodationAmenitiesSchema,
} from "./schemas/accommodation-amenity.schema";

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
  AccommodationAccessInput,
  AccommodationAccessesInput,
} from "./schemas/accommodation-access.schema";

export type {
  AccommodationAmenityInput,
  AccommodationAmenitiesInput,
} from "./schemas/accommodation-amenity.schema";

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
  | "name"
  | "type"
  | "subtitle"
  | "shortDescription"
  | "description"
  | "locationTitle"
  | "locationDescription"
  | "availabilityCalendarUrl"
  | "bookingUrl"
  | "availabilityTitle"
  | "availabilityDescription"
  | "bookingButtonLabel"
  | "reviewsTitle"
  | "reviewsDescription"
>;
