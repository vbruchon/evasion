export const reviewsPageEditorSections = [
  {
    id: "hero",
    label: "Hero",
    description:
      "Modifiez l’introduction de la page Avis et son image d’arrière-plan.",
  },
  {
    id: "reviews",
    label: "Avis",
    description:
      "Personnalisez la présentation des derniers avis et de l’ensemble des témoignages.",
  },
  {
    id: "cta",
    label: "Appel à l’action",
    description:
      "Modifiez le bloc qui invite les visiteurs à découvrir les logements.",
  },
] as const;

export type ReviewsPageEditorSection =
  (typeof reviewsPageEditorSections)[number]["id"];

export const reviewsPageHeroEditorSections = [
  {
    id: "content",
    label: "Contenu",
  },
  {
    id: "image",
    label: "Image",
  },
] as const;

export type ReviewsPageHeroEditorSection =
  (typeof reviewsPageHeroEditorSections)[number]["id"];

export const reviewsPageReviewsEditorSections = [
  {
    id: "recent",
    label: "Derniers avis",
  },
  {
    id: "all",
    label: "Tous les avis",
  },
] as const;

export type ReviewsPageReviewsEditorSection =
  (typeof reviewsPageReviewsEditorSections)[number]["id"];

export const reviewsPageCtaEditorSections = [
  {
    id: "content",
    label: "Contenu",
  },
  {
    id: "image",
    label: "Image",
  },
] as const;

export type ReviewsPageCtaEditorSection =
  (typeof reviewsPageCtaEditorSections)[number]["id"];

export const getReviewsPageEditorSection = (id: ReviewsPageEditorSection) =>
  reviewsPageEditorSections.find((section) => section.id === id);

export const isReviewsPageHeroEditorSection = (
  id: string,
): id is ReviewsPageHeroEditorSection =>
  reviewsPageHeroEditorSections.some((section) => section.id === id);

export const isReviewsPageReviewsEditorSection = (
  id: string,
): id is ReviewsPageReviewsEditorSection =>
  reviewsPageReviewsEditorSections.some((section) => section.id === id);

export const isReviewsPageCtaEditorSection = (
  id: string,
): id is ReviewsPageCtaEditorSection =>
  reviewsPageCtaEditorSections.some((section) => section.id === id);
