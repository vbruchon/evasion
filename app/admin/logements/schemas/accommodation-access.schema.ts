import { z } from "zod";

import {
  accommodationAccesses,
  type AccommodationAccessKey,
} from "@/lib/accommodations/accommodation-accesses";

const accommodationAccessKeys = accommodationAccesses.map(
  (access) => access.key,
) as [AccommodationAccessKey, ...AccommodationAccessKey[]];

export const accommodationAccessSchema = z.object({
  key: z.enum(accommodationAccessKeys),

  details: z
    .string()
    .trim()
    .max(300, "La précision d’un accès ne peut pas dépasser 300 caractères."),
});

export const accommodationAccessesSchema = z
  .array(accommodationAccessSchema)
  .max(
    accommodationAccesses.length,
    "Le nombre d’accès sélectionnés est invalide.",
  )
  .superRefine((accesses, context) => {
    const seenKeys = new Set<AccommodationAccessKey>();

    accesses.forEach((access, index) => {
      if (seenKeys.has(access.key)) {
        context.addIssue({
          code: "custom",
          path: [index, "key"],
          message: "Cet accès est déjà sélectionné.",
        });

        return;
      }

      seenKeys.add(access.key);
    });
  });

export type AccommodationAccessInput = z.infer<
  typeof accommodationAccessSchema
>;

export type AccommodationAccessesInput = z.infer<
  typeof accommodationAccessesSchema
>;
