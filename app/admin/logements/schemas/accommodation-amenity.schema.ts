import { z } from "zod";

import {
  accommodationAmenities,
  type AccommodationAmenityKey,
} from "@/lib/accommodations/accommodation-amenities";

const accommodationAmenityKeys = accommodationAmenities.map(
  (amenity) => amenity.key,
) as [AccommodationAmenityKey, ...AccommodationAmenityKey[]];

export const accommodationAmenitySchema = z.object({
  key: z.enum(accommodationAmenityKeys),

  details: z
    .string()
    .trim()
    .max(
      300,
      "La précision d’un équipement ne peut pas dépasser 300 caractères.",
    ),
});

export const accommodationAmenitiesSchema = z
  .array(accommodationAmenitySchema)
  .max(
    accommodationAmenities.length,
    "Le nombre d’équipements sélectionnés est invalide.",
  )
  .superRefine((amenities, context) => {
    const seenKeys = new Set<AccommodationAmenityKey>();

    amenities.forEach((amenity, index) => {
      if (seenKeys.has(amenity.key)) {
        context.addIssue({
          code: "custom",
          path: [index, "key"],
          message: "Cet équipement est déjà sélectionné.",
        });

        return;
      }

      seenKeys.add(amenity.key);
    });
  });

export type AccommodationAmenityInput = z.infer<
  typeof accommodationAmenitySchema
>;

export type AccommodationAmenitiesInput = z.infer<
  typeof accommodationAmenitiesSchema
>;
