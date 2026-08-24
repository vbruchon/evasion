"use client";

import { AdminFormSection } from "@/components/layout/admin/admin-form-section";
import type { AccommodationPreviewImage } from "@/hooks/use-accommodation-images";

import { AccommodationImageDropzone } from "./accommodation-image-dropzone";
import { AccommodationImageGallery } from "./accommodation-image-gallery";

type AccommodationImagesSectionProps = {
  images: AccommodationPreviewImage[];
  coverImageId: string | null;
  disabled?: boolean;
  onFilesSelected: (files: File[]) => void;
  onSetCover: (id: string) => void;
  onRemove: (id: string) => void;
};

export const AccommodationImagesSection = ({
  images,
  coverImageId,
  disabled = false,
  onFilesSelected,
  onSetCover,
  onRemove,
}: AccommodationImagesSectionProps) => (
  <AdminFormSection
    title="Images"
    description="Gérez les photos du logement et choisissez l’image de couverture."
  >
    <AccommodationImageDropzone
      onFilesSelected={onFilesSelected}
      disabled={disabled}
    />

    {images.length > 0 ? (
      <AccommodationImageGallery
        images={images}
        coverImageId={coverImageId}
        disabled={disabled}
        onSetCover={onSetCover}
        onRemove={onRemove}
      />
    ) : (
      <div className="mt-4 border border-border/60 px-5 py-4">
        <p className="text-sm font-medium">Aucune image ajoutée</p>

        <p className="mt-1 text-sm text-muted-foreground">
          La première image ajoutée sera utilisée comme image de couverture.
        </p>
      </div>
    )}
  </AdminFormSection>
);
