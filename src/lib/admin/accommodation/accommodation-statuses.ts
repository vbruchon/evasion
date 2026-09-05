import type { AccommodationStatus } from "@/generated/prisma/client";

type AccommodationStatusOption = {
  value: AccommodationStatus;
  label: string;
  description: string;
};

export const accommodationStatuses = [
  {
    value: "DRAFT",
    label: "Brouillon",
    description: "Le logement reste invisible sur le site public.",
  },
  {
    value: "PUBLISHED",
    label: "Publié",
    description: "Le logement est visible sur le site public.",
  },
  {
    value: "ARCHIVED",
    label: "Archivé",
    description:
      "Le logement est conservé dans l’administration mais n’est plus visible publiquement.",
  },
] as const satisfies readonly AccommodationStatusOption[];

export const getAccommodationStatus = (status: AccommodationStatus) =>
  accommodationStatuses.find((option) => option.value === status);
