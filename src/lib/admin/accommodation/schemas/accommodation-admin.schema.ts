import { z } from "zod";

export const accommodationIdSchema = z
  .string()
  .trim()
  .min(1, "L’identifiant du logement est invalide.");

export const accommodationStatusSchema = z.enum([
  "DRAFT",
  "PUBLISHED",
  "ARCHIVED",
]);

export const accommodationReorderSchema = z
  .array(
    z.object({
      id: accommodationIdSchema,

      position: z
        .number()
        .int("La position doit être un entier.")
        .min(1, "La position doit être supérieure ou égale à 1."),
    }),
  )
  .min(1, "Au moins un logement est requis.")
  .superRefine((accommodations, context) => {
    const ids = new Set<string>();
    const positions = new Set<number>();

    accommodations.forEach((accommodation, index) => {
      if (ids.has(accommodation.id)) {
        context.addIssue({
          code: "custom",
          path: [index, "id"],
          message: "Un logement ne peut apparaître qu’une seule fois.",
        });
      }

      ids.add(accommodation.id);

      if (positions.has(accommodation.position)) {
        context.addIssue({
          code: "custom",
          path: [index, "position"],
          message: "Deux logements ne peuvent pas avoir la même position.",
        });
      }

      positions.add(accommodation.position);
    });

    const orderedPositions = [...positions].sort(
      (firstPosition, secondPosition) => firstPosition - secondPosition,
    );

    const hasInvalidSequence =
      orderedPositions.length !== accommodations.length ||
      orderedPositions.some((position, index) => position !== index + 1);

    if (hasInvalidSequence) {
      context.addIssue({
        code: "custom",
        message:
          "Les positions des logements doivent former une séquence continue.",
      });
    }
  });
