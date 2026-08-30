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
  slug: "le-chalet-test",
  type: "Chalet de montagne",
  subtitle: "Un refuge au cœur des montagnes",
  shortDescription:
    "Un chalet confortable imaginé pour tester la création d'un logement.",
  description:
    "Description complète du logement utilisée dans les tests d'intégration.",

  guestCapacity: 4,
  bedrooms: 2,
  beds: 3,
  bathrooms: 1,
  surface: 65,

  highlights: [
    {
      title: "Spa privatif",
      description: "Jacuzzi rien que pour vous",
      icon: "Waves",
    },
    {
      title: "Vue montagne",
      description: "Panorama depuis le chalet",
      icon: "Mountain",
    },
  ],

  status: "DRAFT",

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

  highlights: [],

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

  ...overrides,
});
