"use client";

import { AccommodationTextField } from "../../form/accommodation-text-field";
import { AccommodationEditorSectionContent } from "./accommodation-editor-section-content";

export const AccommodationAvailabilityEditor = () => {
  return (
    <AccommodationEditorSectionContent>
      <div>
        <AccommodationTextField
          name="availabilityCalendarUrl"
          label="Lien du calendrier iCal"
          placeholder="https://www.airbnb.com/calendar/ical/..."
          variant="editor"
        />

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Les périodes indisponibles seront récupérées et mises à jour
          automatiquement.
        </p>
      </div>

      <div className="border-t border-border/60 pt-6">
        <AccommodationTextField
          name="bookingUrl"
          label="Lien de réservation"
          placeholder="https://www.airbnb.fr/rooms/..."
          variant="editor"
        />

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Le visiteur sera redirigé vers cette annonce après avoir sélectionné
          ses dates.
        </p>
      </div>
    </AccommodationEditorSectionContent>
  );
};
