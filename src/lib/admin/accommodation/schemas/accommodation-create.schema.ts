import { z } from "zod";

import {
  accommodationNameSchema,
  accommodationTypeSchema,
} from "./accommodation-fields.schema";

export const accommodationCreateSchema = z.object({
  name: accommodationNameSchema,

  type: accommodationTypeSchema.min(1, "Le type de logement est obligatoire."),
});

export type AccommodationCreateFormValues = z.infer<
  typeof accommodationCreateSchema
>;
