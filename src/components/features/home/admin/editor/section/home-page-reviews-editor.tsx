import { AdminEditorSectionContent } from "@/components/layout/admin/editor/admin-editor-section-content";

import { HomePageTextField } from "../../form/home-page-text-field";

export const HomePageReviewsEditor = () => (
  <AdminEditorSectionContent>
    <HomePageTextField
      name="reviewsEyebrow"
      label="Sur-titre"
      placeholder="Ex. Ils ont vécu Évasion"
    />

    <p className="border-t border-border/60 pt-5 text-xs leading-5 text-muted-foreground">
      La note moyenne, le nombre d’avis et les avis affichés sont calculés
      automatiquement à partir des logements publiés.
    </p>
  </AdminEditorSectionContent>
);
