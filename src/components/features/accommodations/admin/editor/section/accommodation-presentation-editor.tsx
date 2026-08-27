import { AccommodationTextField } from "../../form/accommodation-text-field";
import { AccommodationEditorSectionContent } from "./accommodation-editor-section-content";

export const AccommodationPresentationEditor = () => (
  <AccommodationEditorSectionContent>
    <AccommodationTextField
      name="shortDescription"
      label="Promesse"
      placeholder="Une phrase qui résume l'expérience proposée"
      multiline
      variant="editor"
    />

    <AccommodationTextField
      name="description"
      label="Description"
      placeholder="Décrivez l'expérience proposée par le logement"
      multiline
      variant="editor"
    />
  </AccommodationEditorSectionContent>
);
