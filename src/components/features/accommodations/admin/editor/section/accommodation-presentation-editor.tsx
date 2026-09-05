import type { AccommodationPreviewImage } from "@/hooks/use-accommodation-images";
import { getAccommodationDisplayImages } from "@/lib/accommodations/accommodation-images";
import type { AccommodationPresentationEditorSection } from "@/lib/admin/accommodation/editor-sections";

import { AccommodationImageGallery } from "../../form/accommodation-image-gallery";
import { AccommodationTextField } from "../../form/accommodation-text-field";
import { AccommodationEditorSectionContent } from "./accommodation-editor-section-content";

type AccommodationPresentationEditorProps = {
  section: AccommodationPresentationEditorSection;
  images: AccommodationPreviewImage[];
  coverImageId: string | null;
  presentationImageId: string | null;
  disabled: boolean;
  onSetPresentationImage: (id: string) => void;
};

export const AccommodationPresentationEditor = ({
  section,
  images,
  coverImageId,
  presentationImageId,
  disabled,
  onSetPresentationImage,
}: AccommodationPresentationEditorProps) => {
  const { presentationImage } = getAccommodationDisplayImages(
    images,
    coverImageId,
    presentationImageId,
  );

  if (section === "content") {
    return (
      <AccommodationEditorSectionContent>
        <AccommodationTextField
          name="shortDescription"
          label="Promesse"
          placeholder="Une phrase qui résume l'expérience proposée"
          multiline
          variant="editor"
        />

        <AccommodationTextField
          name="description"
          label="Description"
          placeholder="Décrivez l'expérience proposée par le logement"
          multiline
          variant="editor"
        />
      </AccommodationEditorSectionContent>
    );
  }

  return (
    <AccommodationEditorSectionContent>
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Image de présentation
        </p>

        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          Choisissez parmi les photos du logement l’image affichée dans cette
          section.
        </p>
      </div>

      {images.length > 0 ? (
        <AccommodationImageGallery
          images={images}
          selectedImageId={presentationImage?.id ?? null}
          selectedLabel="Présentation"
          selectionLabel="Utiliser pour la présentation"
          disabled={disabled}
          compact
          onSelect={onSetPresentationImage}
        />
      ) : (
        <div className="border border-dashed border-border/60 px-4 py-8 text-center">
          <p className="text-sm text-muted-foreground">
            Aucune photo disponible.
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Ajoutez d’abord des photos depuis la galerie.
          </p>
        </div>
      )}
    </AccommodationEditorSectionContent>
  );
};
