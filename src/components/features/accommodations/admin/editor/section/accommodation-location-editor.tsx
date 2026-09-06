"use client";

import type { AccommodationLocationEditorSection } from "@/lib/admin/accommodation/editor-sections";

import { AccommodationTextField } from "../../form/accommodation-text-field";
import { AccommodationAccessesEditor } from "./accesses/accommodation-accesses-editor";
import { AccommodationEditorSectionContent } from "./accommodation-editor-section-content";

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
    return (
      <AccommodationEditorSectionContent>
        <div className="border border-dashed border-border/60 px-4 py-10 text-center">
          <p className="text-sm font-medium">Carte de localisation</p>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            La sélection de la zone approximative sera ajoutée prochainement.
          </p>
        </div>
      </AccommodationEditorSectionContent>
    );
  }

  if (section === "access") {
    return <AccommodationAccessesEditor disabled={disabled} />;
  }

  return null;
};
