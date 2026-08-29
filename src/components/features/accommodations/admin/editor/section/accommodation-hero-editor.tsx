import { Bath, BedDouble, DoorOpen, Ruler, Users } from "lucide-react";

import { AccommodationNumberField } from "../../form/accommodation-number-field";
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

    <div className="space-y-4 pt-2">
      <div>
        <p className="text-sm font-medium">Infos clés</p>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          Affichées sous le sous-titre dans le hero.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <AccommodationNumberField
          name="guestCapacity"
          label="Voyageurs"
          icon={Users}
          min={1}
          max={50}
          controls
        />

        <AccommodationNumberField
          name="bedrooms"
          label="Chambres"
          icon={DoorOpen}
          max={20}
          controls
        />

        <AccommodationNumberField
          name="beds"
          label="Lits"
          icon={BedDouble}
          max={50}
          controls
        />

        <AccommodationNumberField
          name="bathrooms"
          label="Salles de bain"
          icon={Bath}
          max={20}
          controls
        />

        <AccommodationNumberField
          name="surface"
          label="Surface"
          icon={Ruler}
          placeholder="35"
          suffix="m²"
          max={10000}
          step={0.5}
        />
      </div>
    </div>
  </AccommodationEditorSectionContent>
);
