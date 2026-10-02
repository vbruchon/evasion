const accommodationsPageEditorSections = [
  {
    id: "hero",
    label: "Hero",
    description:
      "Modifiez l’introduction de la page Nos logements et son image d’arrière-plan.",
  },
  {
    id: "cta",
    label: "Appel à l’action",
    description:
      "Modifiez le bloc final qui permet aux visiteurs de vous contacter.",
  },
] as const;

export type AccommodationsPageEditorSection =
  (typeof accommodationsPageEditorSections)[number]["id"];

export const accommodationsPageEditorRegions = [
  {
    id: "content",
    label: "Contenu",
  },
  {
    id: "image",
    label: "Image",
  },
] as const;

export type AccommodationsPageEditorRegion =
  (typeof accommodationsPageEditorRegions)[number]["id"];

export const getAccommodationsPageEditorSection = (
  id: AccommodationsPageEditorSection,
) => accommodationsPageEditorSections.find((section) => section.id === id);

export const isAccommodationsPageEditorRegion = (
  id: string,
): id is AccommodationsPageEditorRegion =>
  accommodationsPageEditorRegions.some((section) => section.id === id);
