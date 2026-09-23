import { AdminEditorSectionContent } from "@/components/layout/admin/editor/admin-editor-section-content";

import { AboutPageTextField } from "../../form/about-page-text-field";

export const AboutPageHeroEditor = () => (
  <AdminEditorSectionContent>
    <AboutPageTextField
      name="heroEyebrow"
      label="Sur-titre"
      placeholder="Ex. À propos"
    />

    <AboutPageTextField
      name="heroTitle"
      label="Titre"
      placeholder="Titre principal"
    />

    <AboutPageTextField
      name="heroDescription"
      label="Description"
      placeholder="Présentez l’univers Évasion"
      multiline
    />

    <AboutPageTextField
      name="heroButtonLabel"
      label="Libellé du bouton"
      placeholder="Ex. Découvrir nos logements"
    />

    <p className="border-t border-border/60 pt-5 text-xs leading-5 text-muted-foreground">
      Les images du hero sont récupérées automatiquement depuis les logements
      publiés.
    </p>
  </AdminEditorSectionContent>
);
