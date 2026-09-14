"use client";

import { ChevronDown, ChevronUp, GripVertical, Trash2 } from "lucide-react";
import Image from "next/image";
import type { DragEvent } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { AccommodationPreviewImage } from "@/hooks/use-accommodation-images";
import { cn } from "@/lib/utils";

type AccommodationSortableImageItemProps = {
  image: AccommodationPreviewImage;
  index: number;
  totalImages: number;
  isCover: boolean;
  isPresentation: boolean;
  isDragging: boolean;
  isDragOver: boolean;
  disabled: boolean;

  onDragStart: (event: DragEvent<HTMLDivElement>) => void;
  onDragEnter: (event: DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: DragEvent<HTMLDivElement>) => void;
  onDrop: (event: DragEvent<HTMLDivElement>) => void;
  onDragEnd: () => void;

  onReorder: (fromIndex: number, toIndex: number) => void;
  onRemove: (id: string) => void;
};

export const AccommodationSortableImageItem = ({
  image,
  index,
  totalImages,
  isCover,
  isPresentation,
  isDragging,
  isDragOver,
  disabled,
  onDragStart,
  onDragEnter,
  onDragOver,
  onDrop,
  onDragEnd,
  onReorder,
  onRemove,
}: AccommodationSortableImageItemProps) => {
  const imageLabel = image.alt ?? image.file?.name ?? `Photo ${index + 1}`;

  return (
    <div
      draggable={!disabled}
      className={cn(
        "group flex items-center gap-3 border border-border/60 bg-card/20 p-2 transition-all",
        !disabled && "cursor-grab active:cursor-grabbing",
        isDragging && "opacity-40",
        isDragOver && "border-primary bg-primary/5",
      )}
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
    >
      <div className="flex shrink-0 items-center text-muted-foreground">
        <GripVertical className="size-4" />
      </div>

      <div className="relative h-18 w-24 shrink-0 overflow-hidden bg-card">
        <Image
          src={image.url}
          alt={imageLabel}
          fill
          unoptimized
          className="object-cover"
        />

        <span className="absolute left-1.5 top-1.5 flex size-5 items-center justify-center bg-black/70 text-[10px] font-medium text-white">
          {index + 1}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">Photo {index + 1}</p>

        {isCover || isPresentation ? (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {isCover ? (
              <Badge className="h-5 border border-primary bg-primary px-1.5 text-[9px] uppercase tracking-wide text-primary-foreground">
                Couverture
              </Badge>
            ) : null}

            {isPresentation ? (
              <Badge
                variant="outline"
                className="h-5 border-primary/50 px-1.5 text-[9px] uppercase tracking-wide text-primary"
              >
                Présentation
              </Badge>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <div className="flex flex-col">
          <Button
            type="button"
            size="icon-xs"
            variant="ghost"
            disabled={disabled || index === 0}
            aria-label={`Déplacer ${imageLabel} vers le haut`}
            onClick={() => onReorder(index, index - 1)}
          >
            <ChevronUp />
          </Button>

          <Button
            type="button"
            size="icon-xs"
            variant="ghost"
            disabled={disabled || index === totalImages - 1}
            aria-label={`Déplacer ${imageLabel} vers le bas`}
            onClick={() => onReorder(index, index + 1)}
          >
            <ChevronDown />
          </Button>
        </div>

        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          disabled={disabled}
          aria-label={`Supprimer ${imageLabel}`}
          onClick={() => onRemove(image.id)}
        >
          <Trash2 />
        </Button>
      </div>
    </div>
  );
};
