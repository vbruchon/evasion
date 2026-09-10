"use client";

import type { AccommodationAvailabilityEditorSection } from "@/lib/admin/accommodation/editor-sections";

import { AccommodationTextField } from "../../form/accommodation-text-field";
import { AccommodationEditorSectionContent } from "./accommodation-editor-section-content";

type AccommodationAvailabilityEditorProps = {
  section: AccommodationAvailabilityEditorSection;
};

export const AccommodationAvailabilityEditor = ({
  section,
}: AccommodationAvailabilityEditorProps) => {
  if (section === "content") {
    return (
      <AccommodationEditorSectionContent>
        <AccommodationTextField
          name="availabilityTitle"
          label="Titre"
          placeholder="Planifiez votre séjour"
          variant="editor"
        />

        <AccommodationTextField
          name="availabilityDescription"
          label="Description"
          placeholder="Consultez les prochaines disponibilités du logement..."
          variant="editor"
        />
      </AccommodationEditorSectionContent>
    );
  }

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

      <div className="border-t border-border/60 pt-6">
        <AccommodationTextField
          name="bookingButtonLabel"
          label="Texte du bouton"
          placeholder="Continuer sur Airbnb"
          variant="editor"
        />
      </div>
    </AccommodationEditorSectionContent>
  );
};
