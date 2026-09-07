"use client";

import type { AccommodationLocationEditorSection } from "@/lib/admin/accommodation/editor-sections";

import { AccommodationTextField } from "../../form/accommodation-text-field";
import { AccommodationAccessesEditor } from "./accesses/accommodation-accesses-editor";
import { AccommodationEditorSectionContent } from "./accommodation-editor-section-content";
import { AccommodationLocationMapEditor } from "./location/accommodation-location-map-editor";

type AccommodationLocationEditorProps = {
  section: AccommodationLocationEditorSection;
  disabled?: boolean;
};

export const AccommodationLocationEditor = ({
  section,
  disabled = false,
}: AccommodationLocationEditorProps) => {
  if (section === "content") {
    return (
      <AccommodationEditorSectionContent>
        <AccommodationTextField
          name="locationTitle"
          label="Titre"
          placeholder="Aux portes du Vercors"
          variant="editor"
        />

        <AccommodationTextField
          name="locationDescription"
          label="Description"
          placeholder="Présentez l’environnement et la situation du logement sans révéler son adresse exacte."
          multiline
          variant="editor"
        />
      </AccommodationEditorSectionContent>
    );
  }

  if (section === "map") {
    return <AccommodationLocationMapEditor disabled={disabled} />;
  }

  if (section === "access") {
    return <AccommodationAccessesEditor disabled={disabled} />;
  }

  return null;
};
