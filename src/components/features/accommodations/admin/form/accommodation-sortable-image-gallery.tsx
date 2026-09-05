"use client";

import type { DragEvent } from "react";
import { useState } from "react";

import type { AccommodationPreviewImage } from "@/hooks/use-accommodation-images";
import { MAX_ACCOMMODATION_IMAGES } from "@/lib/accommodations/accommodation-images";

import { AccommodationSortableImageItem } from "./accommodation-sortable-image-item";

type AccommodationSortableImageGalleryProps = {
  images: AccommodationPreviewImage[];
  coverImageId: string | null;
  presentationImageId: string | null;
  disabled?: boolean;
  onReorder: (fromIndex: number, toIndex: number) => void;
  onRemove: (id: string) => void;
};

export const AccommodationSortableImageGallery = ({
  images,
  coverImageId,
  presentationImageId,
  disabled = false,
  onReorder,
  onRemove,
}: AccommodationSortableImageGalleryProps) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const resetDrag = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragStart = (event: DragEvent<HTMLDivElement>, index: number) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    setDraggedIndex(index);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnter = (event: DragEvent<HTMLDivElement>, index: number) => {
    event.preventDefault();

    if (disabled || draggedIndex === null || draggedIndex === index) {
      return;
    }

    setDragOverIndex(index);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>, index: number) => {
    event.preventDefault();

    if (disabled || draggedIndex === null || draggedIndex === index) {
      resetDrag();
      return;
    }

    onReorder(draggedIndex, index);
    resetDrag();
  };

  return (
    <div>
      <div className="mb-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-medium">Photos</p>

          <span className="text-xs text-muted-foreground">
            {images.length} / {MAX_ACCOMMODATION_IMAGES}
          </span>
        </div>

        <p className="mt-1 text-sm leading-5 text-muted-foreground">
          Glissez les photos pour modifier leur ordre d’affichage dans la
          galerie.
        </p>
      </div>

      <div className="space-y-2">
        {images.map((image, index) => (
          <AccommodationSortableImageItem
            key={image.id}
            image={image}
            index={index}
            totalImages={images.length}
            isCover={image.id === coverImageId}
            isPresentation={image.id === presentationImageId}
            isDragging={draggedIndex === index}
            isDragOver={dragOverIndex === index && draggedIndex !== index}
            disabled={disabled}
            onDragStart={(event) => handleDragStart(event, index)}
            onDragEnter={(event) => handleDragEnter(event, index)}
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(event, index)}
            onDragEnd={resetDrag}
            onReorder={onReorder}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
};
