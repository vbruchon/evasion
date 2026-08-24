"use client";

import { AdminFormSection } from "@/components/layout/admin/admin-form-section";
import { AccommodationImageDropzone } from "../form/accommodation-image-dropzone";
import { AccommodationImageGallery } from "../form/accommodation-image-gallery";
import { useAccommodationImages } from "@/hooks/use-accommodation-images";

type AccommodationCreateImagesProps = {
  onFilesChange: (files: File[], coverIndex: number) => void;
  disabled?: boolean;
};

export const AccommodationCreateImages = ({
  onFilesChange,
  disabled = false,
}: AccommodationCreateImagesProps) => {
  const { images, coverImageId, addFiles, removeImage, setCoverImage } =
    useAccommodationImages({
      onFilesChange,
    });

  return (
    <AdminFormSection
      title="Images"
      description="Ajoutez les photos qui présenteront le logement."
    >
      <AccommodationImageDropzone
        onFilesSelected={addFiles}
        disabled={disabled}
      />
      {images.length > 0 ? (
        <AccommodationImageGallery
          images={images}
          coverImageId={coverImageId}
          disabled={disabled}
          onSetCover={setCoverImage}
          onRemove={removeImage}
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
};
