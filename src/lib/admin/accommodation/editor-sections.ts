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
    id: "gallery",
    label: "Galerie",
    description:
      "Gérez les photos du logement et choisissez son image de couverture.",
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

export const getAccommodationEditorSection = (id: AccommodationEditorSection) =>
  accommodationEditorSections.find((section) => section.id === id);

export const isAccommodationHeroEditorSection = (
  id: string,
): id is AccommodationHeroEditorSection =>
  accommodationHeroEditorSections.some((section) => section.id === id);
