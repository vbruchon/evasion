import { AdminEditorSectionContent } from "@/components/layout/admin/editor/admin-editor-section-content";

import { HomePageTextField } from "../../form/home-page-text-field";

export const HomePageHeroEditor = () => (
  <AdminEditorSectionContent>
    <HomePageTextField
      name="heroEyebrow"
      label="Sur-titre"
      placeholder="Ex. Bienvenue chez Évasion"
    />

    <HomePageTextField
      name="heroTitle"
      label="Titre"
      placeholder="Titre principal"
    />

    <HomePageTextField
      name="heroDescription"
      label="Description"
      placeholder="Présentez l’univers Évasion"
      multiline
    />

    <HomePageTextField
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
