"use client";

import { AccommodationTextField } from "../../form/accommodation-text-field";
import { AccommodationEditorSectionContent } from "./accommodation-editor-section-content";

export const AccommodationAvailabilityEditor = () => {
  return (
    <AccommodationEditorSectionContent>
      <AccommodationTextField
        name="availabilityCalendarUrl"
        label="Lien du calendrier iCal"
        placeholder="https://www.airbnb.com/calendar/ical/..."
        variant="editor"
      />

      <p className="text-sm leading-6 text-muted-foreground">
        Collez le lien d’export iCal du logement. Les périodes indisponibles
        seront récupérées et mises à jour automatiquement.
      </p>
    </AccommodationEditorSectionContent>
  );
};
