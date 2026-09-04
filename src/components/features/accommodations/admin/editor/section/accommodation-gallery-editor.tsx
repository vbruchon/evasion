import type { AccommodationPreviewImage } from "@/hooks/use-accommodation-images";

import { AccommodationImageDropzone } from "../../form/accommodation-image-dropzone";
import { AccommodationSortableImageGallery } from "../../form/accommodation-sortable-image-gallery";
import { AccommodationEditorSectionContent } from "../section/accommodation-editor-section-content";

type AccommodationGalleryEditorProps = {
  images: AccommodationPreviewImage[];
  coverImageId: string | null;
  presentationImageId: string | null;
  disabled: boolean;
  onFilesSelected: (files: File[]) => void;
  onRemoveImage: (id: string) => void;
  onReorderImages: (fromIndex: number, toIndex: number) => void;
};

export const AccommodationGalleryEditor = ({
  images,
  coverImageId,
  presentationImageId,
  disabled,
  onFilesSelected,
  onRemoveImage,
  onReorderImages,
}: AccommodationGalleryEditorProps) => (
  <AccommodationEditorSectionContent>
    <AccommodationImageDropzone
      compact
      disabled={disabled}
      onFilesSelected={onFilesSelected}
    />

    {images.length > 0 ? (
      <AccommodationSortableImageGallery
        images={images}
        coverImageId={coverImageId}
        presentationImageId={presentationImageId}
        disabled={disabled}
        onReorder={onReorderImages}
        onRemove={onRemoveImage}
      />
    ) : null}
  </AccommodationEditorSectionContent>
);
