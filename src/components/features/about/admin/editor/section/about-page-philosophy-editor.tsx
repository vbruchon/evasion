import { AdminEditorSectionContent } from "@/components/layout/admin/editor/admin-editor-section-content";
import type { AboutPagePhilosophyEditorSection } from "@/lib/admin/about/editor/editor-sections";

import { AboutPageTextField } from "../../form/about-page-text-field";

type AboutPagePhilosophyEditorProps = {
  section: AboutPagePhilosophyEditorSection;
};

export const AboutPagePhilosophyEditor = ({
  section,
}: AboutPagePhilosophyEditorProps) => {
  if (section === "first") {
    return (
      <AdminEditorSectionContent>
        <AboutPageTextField
          name="philosophyFirstTitle"
          label="Titre"
          placeholder="Titre du premier principe"
        />

        <AboutPageTextField
          name="philosophyFirstDescription"
          label="Description"
          placeholder="Décrivez ce principe"
          multiline
        />
      </AdminEditorSectionContent>
    );
  }

  if (section === "second") {
    return (
      <AdminEditorSectionContent>
        <AboutPageTextField
          name="philosophySecondTitle"
          label="Titre"
          placeholder="Titre du deuxième principe"
        />

        <AboutPageTextField
          name="philosophySecondDescription"
          label="Description"
          placeholder="Décrivez ce principe"
          multiline
        />
      </AdminEditorSectionContent>
    );
  }

  if (section === "third") {
    return (
      <AdminEditorSectionContent>
        <AboutPageTextField
          name="philosophyThirdTitle"
          label="Titre"
          placeholder="Titre du troisième principe"
        />

        <AboutPageTextField
          name="philosophyThirdDescription"
          label="Description"
          placeholder="Décrivez ce principe"
          multiline
        />
      </AdminEditorSectionContent>
    );
  }

  if (section === "fourth") {
    return (
      <AdminEditorSectionContent>
        <AboutPageTextField
          name="philosophyFourthTitle"
          label="Titre"
          placeholder="Titre du quatrième principe"
        />

        <AboutPageTextField
          name="philosophyFourthDescription"
          label="Description"
          placeholder="Décrivez ce principe"
          multiline
        />
      </AdminEditorSectionContent>
    );
  }

  return (
    <AdminEditorSectionContent>
      <AboutPageTextField
        name="philosophyEyebrow"
        label="Sur-titre"
        placeholder="Ex. Notre philosophie"
      />

      <AboutPageTextField
        name="philosophyTitle"
        label="Titre"
        placeholder="Titre de la section"
      />

      <AboutPageTextField
        name="philosophyDescription"
        label="Description"
        placeholder="Présentez votre philosophie"
        multiline
      />
    </AdminEditorSectionContent>
  );
};
