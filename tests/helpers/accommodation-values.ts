import { accommodationContentDefaults } from "@/lib/accommodations/accommodation-defaults";
import type {
  AccommodationCreateFormValues,
  AccommodationDraftContent,
  AccommodationUpdateFormValues,
} from "@/lib/admin/accommodation/schema";

type AccommodationDraftValues = AccommodationDraftContent["values"];

export const createAccommodationCreateValues = (
  overrides: Partial<AccommodationCreateFormValues> = {},
): AccommodationCreateFormValues => ({
  name: "Le Chalet Test",
  type: "Chalet de montagne",

  ...overrides,
});

export const createAccommodationUpdateValues = (
  overrides: Partial<AccommodationUpdateFormValues> = {},
): AccommodationUpdateFormValues => ({
  name: "Le Chalet Modifié",
  type: "Chalet premium",
  subtitle: "Un nouveau sous-titre",
  shortDescription:
    "Une nouvelle description courte après modification du logement.",
  description:
    "La nouvelle description complète enregistrée par l'éditeur visuel.",

  guestCapacity: 4,
  bedrooms: 2,
  beds: 3,
  bathrooms: 2,
  surface: 72.5,

  locationTitle: "",
  locationDescription: "",
  locationLatitude: null,
  locationLongitude: null,
  locationRadiusMeters: null,

  availabilityCalendarUrl: "",
  bookingUrl: "",

  ...accommodationContentDefaults,

  highlights: [],
  amenities: [],
  accesses: [],

  status: "PUBLISHED",

  ...overrides,
});

export const createAccommodationDraftValues = (
  overrides: Partial<AccommodationDraftValues> = {},
): AccommodationDraftValues => ({
  name: "Le Chalet modifié",
  type: "Chalet premium",
  subtitle: "Un nouveau sous-titre",
  shortDescription:
    "Une nouvelle description courte enregistrée dans le brouillon.",
  description:
    "Une nouvelle description complète enregistrée uniquement dans le brouillon.",

  guestCapacity: 4,
  bedrooms: 2,
  beds: 3,
  bathrooms: 2,
  surface: 72.5,

  locationTitle: "",
  locationDescription: "",
  locationLatitude: null,
  locationLongitude: null,
  locationRadiusMeters: null,

  availabilityCalendarUrl: "",
  bookingUrl: "",

  ...accommodationContentDefaults,

  ...overrides,
});
