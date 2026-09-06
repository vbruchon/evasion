export const accommodationAccesses = [
  {
    key: "car-access",
    label: "Accessible en voiture",
    icon: "Car",
  },
  {
    key: "parking",
    label: "Stationnement",
    icon: "CircleParking",
  },
  {
    key: "secure-parking",
    label: "Parking sécurisé",
    icon: "ShieldCheck",
  },
  {
    key: "walk-to-accommodation",
    label: "Accès au logement",
    icon: "Footprints",
  },
  {
    key: "single-level",
    label: "Plain-pied",
    icon: "House",
  },
  {
    key: "stairs",
    label: "Escaliers",
    icon: "ListChevronsUpDown",
  },
  {
    key: "accessible",
    label: "Accessibilité",
    icon: "Accessibility",
  },
  {
    key: "self-check-in",
    label: "Arrivée autonome",
    icon: "KeyRound",
  },
] as const;

export type AccommodationAccessKey =
  (typeof accommodationAccesses)[number]["key"];

export type AccommodationAccessDefinition =
  (typeof accommodationAccesses)[number];

export const getAccommodationAccess = (key: string) =>
  accommodationAccesses.find((access) => access.key === key);

export const MAX_ACCOMMODATION_ACCESSES = 4;
