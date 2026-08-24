"use client";

import { AdminFormSection } from "@/components/layout/admin/admin-form-section";
import type { AccommodationPreviewImage } from "@/hooks/use-accommodation-images";
import { AccommodationImageDropzone } from "../form/accommodation-image-dropzone";
import { AccommodationImageGallery } from "../form/accommodation-image-gallery";

type AccommodationUpdateImagesProps = {
  images: AccommodationPreviewImage[];
  coverImageId: string | null;
  disabled?: boolean;
  onFilesSelected: (files: File[]) => void;
  onSetCover: (id: string) => void;
  onRemove: (id: string) => void;
};

export const AccommodationUpdateImages = ({
  images,
  coverImageId,
  disabled = false,
  onFilesSelected,
  onSetCover,
  onRemove,
}: AccommodationUpdateImagesProps) => {
  return (
    <AdminFormSection
      title="Images"
      description="Gérez les photos du logement et choisissez l’image de couverture."
    >
      <div className="space-y-6">
        <AccommodationImageDropzone
          disabled={disabled}
          onFilesSelected={onFilesSelected}
        />

        {images.length > 0 ? (
          <AccommodationImageGallery
            images={images}
            coverImageId={coverImageId}
            disabled={disabled}
            onSetCover={onSetCover}
            onRemove={onRemove}
          />
        ) : null}
      </div>
    </AdminFormSection>
  );
};
