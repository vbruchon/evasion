export const aboutPageEditorSections = [
  {
    id: "hero",
    label: "Hero",
    description: "Modifiez l’introduction de la page À propos.",
  },
  {
    id: "spirit",
    label: "L’esprit Évasion",
    description: "Modifiez la présentation de l’esprit Évasion et son image.",
  },
  {
    id: "philosophy",
    label: "Notre philosophie",
    description:
      "Modifiez l’introduction et les principes présentés dans cette section.",
  },
  {
    id: "stats",
    label: "Quelques chiffres",
    description:
      "Modifiez les textes accompagnant les statistiques de la page.",
  },
  {
    id: "cta",
    label: "Appel à l’action",
    description:
      "Modifiez le bloc final qui invite les visiteurs à découvrir les logements.",
  },
] as const;

export type AboutPageEditorSection =
  (typeof aboutPageEditorSections)[number]["id"];

export const aboutPageSpiritEditorSections = [
  {
    id: "content",
    label: "Contenu",
  },
  {
    id: "image",
    label: "Image",
  },
] as const;

export type AboutPageSpiritEditorSection =
  (typeof aboutPageSpiritEditorSections)[number]["id"];

export const aboutPagePhilosophyEditorSections = [
  {
    id: "introduction",
    label: "Introduction",
  },
  {
    id: "first",
    label: "Principe 1",
  },
  {
    id: "second",
    label: "Principe 2",
  },
  {
    id: "third",
    label: "Principe 3",
  },
  {
    id: "fourth",
    label: "Principe 4",
  },
] as const;

export type AboutPagePhilosophyEditorSection =
  (typeof aboutPagePhilosophyEditorSections)[number]["id"];

export const aboutPageCtaEditorSections = [
  {
    id: "content",
    label: "Contenu",
  },
  {
    id: "image",
    label: "Image",
  },
] as const;

export type AboutPageCtaEditorSection =
  (typeof aboutPageCtaEditorSections)[number]["id"];

export const getAboutPageEditorSection = (id: AboutPageEditorSection) =>
  aboutPageEditorSections.find((section) => section.id === id);

export const isAboutPageSpiritEditorSection = (
  id: string,
): id is AboutPageSpiritEditorSection =>
  aboutPageSpiritEditorSections.some((section) => section.id === id);

export const isAboutPagePhilosophyEditorSection = (
  id: string,
): id is AboutPagePhilosophyEditorSection =>
  aboutPagePhilosophyEditorSections.some((section) => section.id === id);

export const isAboutPageCtaEditorSection = (
  id: string,
): id is AboutPageCtaEditorSection =>
  aboutPageCtaEditorSections.some((section) => section.id === id);
