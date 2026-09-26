const contactPageEditorSections = [
  {
    id: "visual",
    label: "Présentation",
    description:
      "Modifiez les textes affichés dans la partie visuelle de la page Contact.",
  },
  {
    id: "form",
    label: "Formulaire",
    description:
      "Personnalisez le titre du formulaire et le libellé du bouton d’envoi.",
  },
  {
    id: "success",
    label: "Confirmation",
    description:
      "Modifiez le message affiché après l’envoi réussi d’une demande.",
  },
] as const;

export type ContactPageEditorSection =
  (typeof contactPageEditorSections)[number]["id"];

export const contactPageFormEditorRegions = [
  {
    id: "title",
    label: "Titre",
  },
  {
    id: "submit",
    label: "Bouton",
  },
] as const;

export type ContactPageFormEditorRegion =
  (typeof contactPageFormEditorRegions)[number]["id"];

export const contactPageSuccessEditorRegions = [
  {
    id: "eyebrow",
    label: "Sur-titre",
  },
  {
    id: "title",
    label: "Titre",
  },
  {
    id: "description",
    label: "Description",
  },
] as const;

export type ContactPageSuccessEditorRegion =
  (typeof contactPageSuccessEditorRegions)[number]["id"];

export const getContactPageEditorSection = (id: ContactPageEditorSection) =>
  contactPageEditorSections.find((section) => section.id === id);

export const isContactPageFormEditorRegion = (
  id: string,
): id is ContactPageFormEditorRegion =>
  contactPageFormEditorRegions.some((region) => region.id === id);

export const isContactPageSuccessEditorRegion = (
  id: string,
): id is ContactPageSuccessEditorRegion =>
  contactPageSuccessEditorRegions.some((region) => region.id === id);
