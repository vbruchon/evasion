import { z } from "zod";

import { accommodationAccessesSchema } from "./accommodation-access.schema";
import { accommodationAmenitiesSchema } from "./accommodation-amenity.schema";
import { accommodationFieldsSchema } from "./accommodation-fields.schema";
import { accommodationHighlightsSchema } from "./accommodation-highlight.schema";
import { accommodationUpdateImagesSchema } from "./accommodation-image.schema";
import { accommodationContentDefaults } from "@/lib/accommodations/accommodation-defaults";

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

    ...accommodationContentDefaults,
    ...(value as Record<string, unknown>),
  };
}, accommodationFieldsSchema);

export const accommodationDraftContentSchema = z.object({
  version: z.literal(1),
  values: accommodationDraftValuesSchema,
  images: accommodationUpdateImagesSchema,
  highlights: accommodationHighlightsSchema.default([]),
  amenities: accommodationAmenitiesSchema.default([]),
  accesses: accommodationAccessesSchema.default([]),
});

export type AccommodationDraftContent = z.infer<
  typeof accommodationDraftContentSchema
>;
