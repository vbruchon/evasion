const faqPageEditorSections = [
  {
    id: "hero",
    label: "Hero",
    description:
      "Modifiez l’introduction de la page FAQ et son image d’arrière-plan.",
  },
  {
    id: "questions",
    label: "Questions",
    description:
      "Personnalisez l’introduction et les questions affichées dans la FAQ.",
  },
  {
    id: "cta",
    label: "Appel à l’action",
    description: "Modifiez le bloc qui invite les visiteurs à vous contacter.",
  },
] as const;

export type FaqPageEditorSection = (typeof faqPageEditorSections)[number]["id"];

export const faqPageHeroEditorSections = [
  {
    id: "content",
    label: "Contenu",
  },
  {
    id: "image",
    label: "Image",
  },
] as const;

export type FaqPageHeroEditorSection =
  (typeof faqPageHeroEditorSections)[number]["id"];

export const faqPageQuestionsEditorSections = [
  {
    id: "content",
    label: "Contenu",
  },
  {
    id: "items",
    label: "Questions",
  },
] as const;

export type FaqPageQuestionsEditorSection =
  (typeof faqPageQuestionsEditorSections)[number]["id"];

export const faqPageCtaEditorSections = [
  {
    id: "content",
    label: "Contenu",
  },
  {
    id: "image",
    label: "Image",
  },
] as const;

export type FaqPageCtaEditorSection =
  (typeof faqPageCtaEditorSections)[number]["id"];

export const getFaqPageEditorSection = (id: FaqPageEditorSection) =>
  faqPageEditorSections.find((section) => section.id === id);

export const isFaqPageHeroEditorSection = (
  id: string,
): id is FaqPageHeroEditorSection =>
  faqPageHeroEditorSections.some((section) => section.id === id);

export const isFaqPageQuestionsEditorSection = (
  id: string,
): id is FaqPageQuestionsEditorSection =>
  faqPageQuestionsEditorSections.some((section) => section.id === id);

export const isFaqPageCtaEditorSection = (
  id: string,
): id is FaqPageCtaEditorSection =>
  faqPageCtaEditorSections.some((section) => section.id === id);
