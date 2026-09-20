"use client";

import { AccommodationTextField } from "../../../form/accommodation-text-field";
import { AdminEditorSectionContent } from "@/components/layout/admin/editor/admin-editor-section-content";

export const AccommodationReviewsContentEditor = () => (
  <AdminEditorSectionContent>
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
  </AdminEditorSectionContent>
);
