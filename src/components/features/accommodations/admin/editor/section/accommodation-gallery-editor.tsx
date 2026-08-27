import type { AccommodationPreviewImage } from "@/hooks/use-accommodation-images";

import { AccommodationImageDropzone } from "../../form/accommodation-image-dropzone";
import { AccommodationImageGallery } from "../../form/accommodation-image-gallery";
import { AccommodationEditorSectionContent } from "../section/accommodation-editor-section-content";

type AccommodationGalleryEditorProps = {
  images: AccommodationPreviewImage[];
  coverImageId: string | null;
  disabled: boolean;
  onFilesSelected: (files: File[]) => void;
  onSetCover: (id: string) => void;
  onRemoveImage: (id: string) => void;
};

export const AccommodationGalleryEditor = ({
  images,
  coverImageId,
  disabled,
  onFilesSelected,
  onSetCover,
  onRemoveImage,
}: AccommodationGalleryEditorProps) => (
  <AccommodationEditorSectionContent>
    <AccommodationImageDropzone
      disabled={disabled}
      onFilesSelected={onFilesSelected}
    />

    <AccommodationImageGallery
      images={images}
      coverImageId={coverImageId}
      disabled={disabled}
      compact
      onSetCover={onSetCover}
      onRemove={onRemoveImage}
    />
  </AccommodationEditorSectionContent>
);
