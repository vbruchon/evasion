import { z } from "zod";

import { accommodationAccessesSchema } from "./accommodation-access.schema";
import { accommodationAmenitiesSchema } from "./accommodation-amenity.schema";
import {
  accommodationBaseFieldsSchema,
  validateAccommodationLocation,
} from "./accommodation-fields.schema";
import { accommodationHighlightsSchema } from "./accommodation-highlight.schema";

export const accommodationUpdateSchema = accommodationBaseFieldsSchema
  .extend({
    status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
    highlights: accommodationHighlightsSchema,
    amenities: accommodationAmenitiesSchema,
    accesses: accommodationAccessesSchema,
  })
  .superRefine(validateAccommodationLocation);

export type AccommodationUpdateFormValues = z.infer<
  typeof accommodationUpdateSchema
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
