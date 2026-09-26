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
      "Personnalisez les textes, libellés et champs du formulaire de contact.",
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

export const contactPageFormEditorSections = [
  {
    id: "presentation",
    label: "Présentation",
  },
  {
    id: "fields",
    label: "Champs",
  },
  {
    id: "submit",
    label: "Envoi",
  },
] as const;

export type ContactPageFormEditorSection =
  (typeof contactPageFormEditorSections)[number]["id"];

export type ContactPageFormEditorRegion = ContactPageFormEditorSection;

export const getContactPageEditorSection = (id: ContactPageEditorSection) =>
  contactPageEditorSections.find((section) => section.id === id);

export const isContactPageFormEditorRegion = (
  id: string,
): id is ContactPageFormEditorRegion =>
  contactPageFormEditorSections.some((section) => section.id === id);
