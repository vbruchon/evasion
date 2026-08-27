import { AccommodationTextField } from "../../form/accommodation-text-field";
import { AccommodationEditorSectionContent } from "./accommodation-editor-section-content";

export const AccommodationHeroEditor = () => (
  <AccommodationEditorSectionContent>
    <AccommodationTextField
      name="type"
      label="Type de logement"
      placeholder="Ex. Chalet de montagne"
      variant="editor"
    />

    <AccommodationTextField
      name="name"
      label="Nom"
      placeholder="Ex. Le Chalet"
      variant="editor"
    />

    <AccommodationTextField
      name="subtitle"
      label="Sous-titre"
      placeholder="Présentez le logement en une phrase"
      multiline
      variant="editor"
    />
  </AccommodationEditorSectionContent>
);
