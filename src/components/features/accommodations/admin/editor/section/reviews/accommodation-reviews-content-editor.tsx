"use client";

import { AccommodationTextField } from "../../../form/accommodation-text-field";
import { AccommodationEditorSectionContent } from "../accommodation-editor-section-content";

export const AccommodationReviewsContentEditor = () => (
  <AccommodationEditorSectionContent>
    <AccommodationTextField
      name="reviewsTitle"
      label="Titre"
      placeholder="Leurs moments, leurs mots"
      variant="editor"
    />

    <AccommodationTextField
      name="reviewsDescription"
      label="Description"
      placeholder="Découvrez les impressions laissées par les voyageurs après leur séjour."
      multiline
      variant="editor"
    />
  </AccommodationEditorSectionContent>
);
