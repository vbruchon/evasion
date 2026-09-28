const homePageEditorSections = [
  {
    id: "hero",
    label: "Hero",
    description: "Modifiez l’introduction de la page d’accueil.",
  },
  {
    id: "accommodations",
    label: "Logements",
    description:
      "Modifiez les textes qui accompagnent la sélection des logements.",
  },
  {
    id: "escape",
    label: "L’esprit Évasion",
    description: "Modifiez la présentation de l’esprit Évasion et son image.",
  },
  {
    id: "reviews",
    label: "Avis",
    description:
      "Modifiez le texte qui accompagne les derniers avis voyageurs.",
  },
  {
    id: "cta",
    label: "Appel à l’action",
    description:
      "Modifiez le bloc final qui invite les visiteurs à découvrir les logements.",
  },
] as const;

export type HomePageEditorSection =
  (typeof homePageEditorSections)[number]["id"];

export const homePageEscapeEditorSections = [
  {
    id: "content",
    label: "Contenu",
  },
  {
    id: "image",
    label: "Image",
  },
] as const;

export type HomePageEscapeEditorSection =
  (typeof homePageEscapeEditorSections)[number]["id"];

export const homePageCtaEditorSections = [
  {
    id: "content",
    label: "Contenu",
  },
  {
    id: "image",
    label: "Image",
  },
] as const;

export type HomePageCtaEditorSection =
  (typeof homePageCtaEditorSections)[number]["id"];

export const getHomePageEditorSection = (id: HomePageEditorSection) =>
  homePageEditorSections.find((section) => section.id === id);

export const isHomePageEscapeEditorSection = (
  id: string,
): id is HomePageEscapeEditorSection =>
  homePageEscapeEditorSections.some((section) => section.id === id);

export const isHomePageCtaEditorSection = (
  id: string,
): id is HomePageCtaEditorSection =>
  homePageCtaEditorSections.some((section) => section.id === id);
