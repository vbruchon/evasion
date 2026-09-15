import type { AccommodationPreviewImage } from "@/lib/admin/accommodation/images/accommodation-image-previews";

import { AccommodationEditorSectionContent } from "../section/accommodation-editor-section-content";
import { AccommodationImageDropzone } from "../../form/images/accommodation-image-dropzone";
import { AccommodationSortableImageGallery } from "../../form/images/accommodation-sortable-image-gallery";

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
