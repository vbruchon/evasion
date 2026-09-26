import { ContactPageTextField } from "@/components/features/contact/admin/editor/form/contact-page-text-field";
import { AdminEditorSectionContent } from "@/components/layout/admin/editor/admin-editor-section-content";
import type { ContactPageEditorNavigation } from "@/hooks/contact/admin/editor/use-contact-page-editor-navigation";

type ContactPageSuccessEditorProps = {
  navigation: ContactPageEditorNavigation;
};

export const ContactPageSuccessEditor = ({
  navigation,
}: ContactPageSuccessEditorProps) => {
  switch (navigation.activeSuccessRegion) {
    case "eyebrow":
      return (
        <AdminEditorSectionContent>
          <ContactPageTextField
            name="successEyebrow"
            label="Sur-titre"
            placeholder="Ex. Message envoyé"
          />
        </AdminEditorSectionContent>
      );

    case "title":
      return (
        <AdminEditorSectionContent>
          <ContactPageTextField
            name="successTitle"
            label="Titre"
            placeholder="Ex. Votre demande est bien partie."
          />
        </AdminEditorSectionContent>
      );

    case "description":
      return (
        <AdminEditorSectionContent>
          <ContactPageTextField
            name="successDescription"
            label="Description"
            placeholder="Texte affiché après l’envoi"
            multiline
          />
        </AdminEditorSectionContent>
      );

    default:
      return null;
  }
};
