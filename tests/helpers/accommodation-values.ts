import type {
  AccommodationCreateFormValues,
  AccommodationDraftContent,
  AccommodationUpdateFormValues,
} from "~/app/admin/logements/schema";

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
  availabilityTitle: "Planifiez votre séjour",
  availabilityDescription:
    "Consultez les prochaines disponibilités du logement et choisissez les dates qui vous conviennent.",
  bookingButtonLabel: "Continuer sur Airbnb",
  reviewsTitle: "Leurs moments, leurs mots",
  reviewsDescription:
    "Découvrez les impressions laissées par les voyageurs après leur séjour.",

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

  availabilityTitle: "Planifiez votre séjour",
  availabilityDescription:
    "Consultez les prochaines disponibilités du logement et choisissez les dates qui vous conviennent.",
  bookingButtonLabel: "Continuer sur Airbnb",
  reviewsTitle: "Leurs moments, leurs mots",
  reviewsDescription:
    "Découvrez les impressions laissées par les voyageurs après leur séjour.",

  ...overrides,
});
