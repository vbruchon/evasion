import { ContactPageTextField } from "@/components/features/contact/admin/editor/form/contact-page-text-field";
import { AdminEditorSectionContent } from "@/components/layout/admin/editor/admin-editor-section-content";

export const ContactPageFormEditor = () => (
  <AdminEditorSectionContent>
    <ContactPageTextField
      name="formTitle"
      label="Titre du formulaire"
      placeholder="Ex. Quel est le sujet de votre demande ?"
    />

    <ContactPageTextField
      name="submitLabel"
      label="Libellé du bouton"
      placeholder="Ex. Envoyer ma demande"
    />
  </AdminEditorSectionContent>
);
