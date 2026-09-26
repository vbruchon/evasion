import { ContactPageTextField } from "@/components/features/contact/admin/editor/form/contact-page-text-field";
import { AdminEditorSectionContent } from "@/components/layout/admin/editor/admin-editor-section-content";
import type { ContactPageEditorNavigation } from "@/hooks/contact/admin/editor/use-contact-page-editor-navigation";

type ContactPageFormEditorProps = {
  navigation: ContactPageEditorNavigation;
};

export const ContactPageFormEditor = ({
  navigation,
}: ContactPageFormEditorProps) => {
  switch (navigation.activeFormSection) {
    case "presentation":
      return (
        <AdminEditorSectionContent>
          <ContactPageTextField
            name="formTitle"
            label="Titre du formulaire"
            placeholder="Ex. Quel est le sujet de votre demande ?"
          />

          <ContactPageTextField
            name="accommodationSubjectTitle"
            label="Titre — logement"
            placeholder="Ex. Un logement"
          />

          <ContactPageTextField
            name="accommodationSubjectDescription"
            label="Description — logement"
            placeholder="Ex. Une question avant une réservation"
          />

          <ContactPageTextField
            name="otherSubjectTitle"
            label="Titre — autre demande"
            placeholder="Ex. Autre demande"
          />

          <ContactPageTextField
            name="otherSubjectDescription"
            label="Description — autre demande"
            placeholder="Ex. Pour toute autre question"
          />

          <ContactPageTextField
            name="accommodationLabel"
            label="Libellé de sélection du logement"
            placeholder="Ex. Quel logement ?"
            description="Les logements proposés sont récupérés automatiquement depuis les logements publiés."
          />
        </AdminEditorSectionContent>
      );

    case "fields":
      return (
        <AdminEditorSectionContent>
          <ContactPageTextField
            name="firstNameLabel"
            label="Libellé du prénom"
            placeholder="Ex. Prénom"
          />

          <ContactPageTextField
            name="firstNamePlaceholder"
            label="Exemple du prénom"
            placeholder="Ex. : Jean"
          />

          <ContactPageTextField
            name="emailLabel"
            label="Libellé de l’e-mail"
            placeholder="Ex. E-mail"
          />

          <ContactPageTextField
            name="emailPlaceholder"
            label="Exemple de l’e-mail"
            placeholder="Ex. : exemple@email.fr"
          />

          <ContactPageTextField
            name="messageLabel"
            label="Libellé du message"
            placeholder="Ex. Comment pouvons-nous vous aider ?"
          />

          <ContactPageTextField
            name="messagePlaceholder"
            label="Exemple du message"
            placeholder="Ex. Posez votre question..."
            multiline
          />
        </AdminEditorSectionContent>
      );

    case "submit":
      return (
        <AdminEditorSectionContent>
          <ContactPageTextField
            name="submitLabel"
            label="Libellé du bouton"
            placeholder="Ex. Envoyer ma demande"
          />
        </AdminEditorSectionContent>
      );

    default:
      return null;
  }
};
