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

export const getAccommodationEditorSection = (id: AccommodationEditorSection) =>
  accommodationEditorSections.find((section) => section.id === id);
