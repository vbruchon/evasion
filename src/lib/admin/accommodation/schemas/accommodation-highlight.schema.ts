import { z } from "zod";

import { MAX_ACCOMMODATION_HIGHLIGHTS } from "@/lib/accommodations/accommodation-highlights";

export const accommodationHighlightSchema = z.object({
  id: z.string().min(1).optional(),

  title: z
    .string()
    .trim()
    .min(1, "Le titre du point fort est obligatoire.")
    .max(40, "Le titre ne peut pas dépasser 40 caractères."),

  description: z
    .string()
    .trim()
    .max(60, "La description ne peut pas dépasser 60 caractères.")
    .nullable(),

  icon: z.string().trim().max(50),
});

export const accommodationHighlightsSchema = z
  .array(accommodationHighlightSchema)
  .max(
    MAX_ACCOMMODATION_HIGHLIGHTS,
    `Un logement ne peut pas contenir plus de ${MAX_ACCOMMODATION_HIGHLIGHTS} points forts.`,
  );

export type AccommodationHighlightInput = z.infer<
  typeof accommodationHighlightSchema
>;

export type AccommodationHighlightsInput = z.infer<
  typeof accommodationHighlightsSchema
>;
