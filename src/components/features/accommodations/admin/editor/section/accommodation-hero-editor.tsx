import {
  ArrowRight,
  Bath,
  BedDouble,
  DoorOpen,
  ImageIcon,
  Ruler,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import type { AccommodationPreviewImage } from "@/lib/admin/accommodation/images/accommodation-image-previews";
import type { AccommodationHeroEditorSection } from "@/lib/admin/accommodation/editor/editor-sections";

import { AccommodationNumberField } from "../../form/accommodation-number-field";
import { AccommodationTextField } from "../../form/accommodation-text-field";
import { AdminEditorSectionContent } from "@/components/layout/admin/editor/admin-editor-section-content";
import { AccommodationImageGallery } from "../../form/images/accommodation-image-gallery";
import { AccommodationHighlightsEditor } from "./highlights/accommodation-highlights-editor";
type AccommodationHeroEditorProps = {
  section: AccommodationHeroEditorSection;
  images?: AccommodationPreviewImage[];
  coverImageId?: string | null;
  disabled?: boolean;
  onSetCover?: (id: string) => void;
  onOpenGallery?: () => void;
};

export const AccommodationHeroEditor = ({
  section,
  images = [],
  coverImageId = null,
  disabled = false,
  onSetCover,
  onOpenGallery,
}: AccommodationHeroEditorProps) => {
  if (section === "general") {
    return (
      <AdminEditorSectionContent>
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
      </AdminEditorSectionContent>
    );
  }

  if (section === "image") {
    return (
      <AdminEditorSectionContent>
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
          <div className="border border-border/60 bg-card/20 p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center border border-primary/30 bg-primary/5 text-primary">
                <ImageIcon className="size-4" strokeWidth={1.5} />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium">Aucune photo disponible</p>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Ajoutez des photos à la galerie pour pouvoir choisir votre
                  image de couverture.
                </p>
              </div>
            </div>

            {onOpenGallery ? (
              <Button
                type="button"
                variant="outline"
                className="mt-4 w-full justify-between"
                disabled={disabled}
                onClick={onOpenGallery}
              >
                Gérer les photos
                <ArrowRight className="size-4" />
              </Button>
            ) : null}
          </div>
        )}
      </AdminEditorSectionContent>
    );
  }

  if (section === "highlights") {
    return <AccommodationHighlightsEditor disabled={disabled} />;
  }

  return (
    <AdminEditorSectionContent>
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
    </AdminEditorSectionContent>
  );
};
