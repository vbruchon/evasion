import { Bath, BedDouble, DoorOpen, Ruler, Users } from "lucide-react";

import type { AccommodationPreviewImage } from "@/hooks/use-accommodation-images";

import { AccommodationImageGallery } from "../../form/accommodation-image-gallery";
import { AccommodationNumberField } from "../../form/accommodation-number-field";
import { AccommodationTextField } from "../../form/accommodation-text-field";
import { AccommodationEditorSectionContent } from "./accommodation-editor-section-content";

type AccommodationHeroEditorProps = {
  section: "general" | "key-details" | "image";
  images?: AccommodationPreviewImage[];
  coverImageId?: string | null;
  disabled?: boolean;
  onSetCover?: (id: string) => void;
};

export const AccommodationHeroEditor = ({
  section,
  images = [],
  coverImageId = null,
  disabled = false,
  onSetCover,
}: AccommodationHeroEditorProps) => {
  if (section === "general") {
    return (
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
  }

  if (section === "image") {
    return (
      <AccommodationEditorSectionContent>
        <div>
          <p className="text-sm font-medium">Image de couverture</p>

          <p className="mt-1 text-sm leading-5 text-muted-foreground">
            Choisissez la photo affichée en arrière-plan du hero.
          </p>
        </div>

        {images.length > 0 && onSetCover ? (
          <AccommodationImageGallery
            images={images}
            selectedImageId={coverImageId}
            selectedLabel="Couverture"
            selectionLabel="Définir comme couverture"
            disabled={disabled}
            compact
            onSelect={onSetCover}
          />
        ) : (
          <p className="text-sm text-muted-foreground">
            Ajoutez d’abord des photos depuis la galerie.
          </p>
        )}
      </AccommodationEditorSectionContent>
    );
  }

  return (
    <AccommodationEditorSectionContent>
      <p className="text-xs leading-5 text-muted-foreground">
        Affichées sous le sous-titre dans le hero.
      </p>

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
    </AccommodationEditorSectionContent>
  );
};
