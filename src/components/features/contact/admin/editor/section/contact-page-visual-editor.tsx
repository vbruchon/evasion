import { ContactPageTextField } from "@/components/features/contact/admin/editor/form/contact-page-text-field";
import { AdminEditorSectionContent } from "@/components/layout/admin/editor/admin-editor-section-content";

export const ContactPageVisualEditor = () => (
  <AdminEditorSectionContent>
    <ContactPageTextField
      name="eyebrow"
      label="Sur-titre"
      placeholder="Ex. Contact"
    />

    <ContactPageTextField
      name="handwritten"
      label="Phrase manuscrite"
      placeholder="Ex. Une question ?"
    />

    <ContactPageTextField
      name="title"
      label="Titre"
      placeholder="Titre principal"
    />

    <ContactPageTextField
      name="description"
      label="Description"
      placeholder="Présentez la prise de contact"
      multiline
    />

    <ContactPageTextField
      name="reassuranceFirstLabel"
      label="Premier élément de réassurance"
      placeholder="Ex. Réponse rapide"
    />

    <ContactPageTextField
      name="reassuranceSecondLabel"
      label="Deuxième élément de réassurance"
      placeholder="Ex. Un contact humain"
    />

    <ContactPageTextField
      name="reassuranceThirdLabel"
      label="Troisième élément de réassurance"
      placeholder="Ex. Un séjour en toute sérénité"
    />
  </AdminEditorSectionContent>
);
