import { ContactPageTextField } from "@/components/features/contact/admin/editor/form/contact-page-text-field";
import { AdminEditorSectionContent } from "@/components/layout/admin/editor/admin-editor-section-content";

export const ContactPageSuccessEditor = () => (
  <AdminEditorSectionContent>
    <ContactPageTextField
      name="successEyebrow"
      label="Sur-titre"
      placeholder="Ex. Message envoyé"
    />

    <ContactPageTextField
      name="successTitle"
      label="Titre"
      placeholder="Ex. Votre demande est bien partie."
    />

    <ContactPageTextField
      name="successDescription"
      label="Description"
      placeholder="Texte affiché après l’envoi"
      multiline
    />

    <ContactPageTextField
      name="successResetLabel"
      label="Libellé du bouton"
      placeholder="Ex. Envoyer un autre message"
    />
  </AdminEditorSectionContent>
);
