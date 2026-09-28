import { AdminEditorSectionContent } from "@/components/layout/admin/editor/admin-editor-section-content";

import { HomePageTextField } from "../../form/home-page-text-field";

export const HomePageAccommodationsEditor = () => (
  <AdminEditorSectionContent>
    <HomePageTextField
      name="accommodationsEyebrow"
      label="Sur-titre"
      placeholder="Ex. Nos logements"
    />

    <HomePageTextField
      name="accommodationsTitle"
      label="Titre"
      placeholder="Titre de la section"
    />

    <HomePageTextField
      name="accommodationsDescription"
      label="Description"
      placeholder="Présentez la sélection de logements"
      multiline
    />

    <p className="border-t border-border/60 pt-5 text-xs leading-5 text-muted-foreground">
      Les logements, leurs images et leurs informations sont récupérés
      automatiquement depuis les logements publiés.
    </p>
  </AdminEditorSectionContent>
);
