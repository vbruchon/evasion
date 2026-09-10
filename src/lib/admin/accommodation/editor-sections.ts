export const accommodationEditorSections = [
  {
    id: "hero",
    label: "Hero",
    description:
      "Modifiez les éléments affichés dans la zone principale du logement.",
  },
  {
    id: "presentation",
    label: "Présentation",
    description:
      "Présentez l’expérience et l’univers proposés par ce logement.",
  },
  {
    id: "amenities",
    label: "Équipements",
    description:
      "Sélectionnez les équipements et services disponibles dans ce logement.",
  },
  {
    id: "gallery",
    label: "Galerie",
    description: "Ajoutez, supprimez et organisez les photos du logement.",
  },
  {
    id: "location",
    label: "Localisation",
    description:
      "Présentez la localisation approximative et les informations d’accès au logement.",
  },
  {
    id: "availability",
    label: "Disponibilités",
    description:
      "Personnalisez la présentation des disponibilités et configurez la réservation du logement.",
  },
] as const;

export type AccommodationEditorSection =
  (typeof accommodationEditorSections)[number]["id"];

export const accommodationHeroEditorSections = [
  {
    id: "general",
    label: "Général",
  },
  {
    id: "key-details",
    label: "Infos clés",
  },
  {
    id: "highlights",
    label: "Points forts",
  },
  {
    id: "image",
    label: "Image",
  },
] as const;

export type AccommodationHeroEditorSection =
  (typeof accommodationHeroEditorSections)[number]["id"];

export const accommodationPresentationEditorSections = [
  {
    id: "content",
    label: "Contenu",
  },
  {
    id: "image",
    label: "Image",
  },
] as const;

export type AccommodationPresentationEditorSection =
  (typeof accommodationPresentationEditorSections)[number]["id"];

export const accommodationLocationEditorSections = [
  {
    id: "content",
    label: "Contenu",
  },
  {
    id: "map",
    label: "Carte",
  },
  {
    id: "access",
    label: "Accès",
  },
] as const;

export type AccommodationLocationEditorSection =
  (typeof accommodationLocationEditorSections)[number]["id"];

export const accommodationAvailabilityEditorSections = [
  {
    id: "content",
    label: "Contenu",
  },
  {
    id: "calendar",
    label: "Calendrier",
  },
] as const;

export type AccommodationAvailabilityEditorSection =
  (typeof accommodationAvailabilityEditorSections)[number]["id"];

export const getAccommodationEditorSection = (id: AccommodationEditorSection) =>
  accommodationEditorSections.find((section) => section.id === id);

export const isAccommodationHeroEditorSection = (
  id: string,
): id is AccommodationHeroEditorSection =>
  accommodationHeroEditorSections.some((section) => section.id === id);

export const isAccommodationLocationEditorSection = (
  id: string,
): id is AccommodationLocationEditorSection =>
  accommodationLocationEditorSections.some((section) => section.id === id);

export const isAccommodationAvailabilityEditorSection = (
  id: string,
): id is AccommodationAvailabilityEditorSection =>
  accommodationAvailabilityEditorSections.some((section) => section.id === id);
