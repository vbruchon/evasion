"use client";

import { Trash2 } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { AccommodationPreviewImage } from "@/hooks/use-accommodation-images";
import { cn } from "@/lib/utils";

type AccommodationImageGalleryProps = {
  images: AccommodationPreviewImage[];

  selectedImageId: string | null;
  selectedLabel: string;
  selectionLabel: string;

  secondarySelectedImageId?: string | null;
  secondarySelectedLabel?: string;

  disabled?: boolean;
  compact?: boolean;

  onSelect: (id: string) => void;
  onRemove?: (id: string) => void;
};

export const AccommodationImageGallery = ({
  images,
  selectedImageId,
  selectedLabel,
  selectionLabel,
  secondarySelectedImageId,
  secondarySelectedLabel,
  disabled = false,
  compact = false,
  onSelect,
  onRemove,
}: AccommodationImageGalleryProps) => {
  return (
    <div className={compact ? "" : "mt-6"}>
      <p className="mb-3 text-xs text-muted-foreground md:hidden">
        Touchez une photo pour la sélectionner.
      </p>

      <div
        className={
          compact
            ? "grid grid-cols-2 gap-3"
            : "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        }
      >
        {images.map((image) => {
          const isSelected = image.id === selectedImageId;

          const isSecondarySelected = image.id === secondarySelectedImageId;

          const imageLabel =
            image.alt ?? image.file?.name ?? "Image du logement";

          return (
            <div
              key={image.id}
              role="button"
              tabIndex={disabled ? -1 : 0}
              className={cn(
                "group relative aspect-4/3 overflow-hidden border transition-colors",
                isSelected
                  ? "border-2 border-primary ring-2 ring-primary"
                  : isSecondarySelected
                    ? "cursor-pointer border-primary/60 ring-1 ring-primary/30"
                    : "cursor-pointer border-border/60 hover:border-primary/60",
              )}
              onClick={() => {
                if (!disabled) {
                  onSelect(image.id);
                }
              }}
              onKeyDown={(event) => {
                if (!disabled && (event.key === "Enter" || event.key === " ")) {
                  event.preventDefault();
                  onSelect(image.id);
                }
              }}
            >
              <Image
                src={image.url}
                alt={imageLabel}
                fill
                unoptimized
                className="object-cover"
              />

              {isSelected ? (
                <Badge className="absolute left-0 top-0 z-10 border border-primary bg-primary px-2.5 py-1 text-primary-foreground shadow-lg">
                  {selectedLabel}
                </Badge>
              ) : null}

              {isSecondarySelected && secondarySelectedLabel ? (
                <Badge
                  variant="outline"
                  className="absolute bottom-2 right-2 z-10 border-primary/60 bg-background/90 px-2 py-1 text-[10px] text-primary shadow-sm backdrop-blur-sm"
                >
                  {secondarySelectedLabel}
                </Badge>
              ) : null}

              {onRemove ? (
                <Button
                  type="button"
                  size="icon-sm"
                  className="peer/delete absolute right-0 top-0 z-20 border border-destructive bg-destructive/85 text-destructive-foreground opacity-100 shadow-lg transition-all hover:bg-destructive/90 md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
                  disabled={disabled}
                  onClick={(event) => {
                    event.stopPropagation();
                    onRemove(image.id);
                  }}
                  aria-label={`Retirer ${imageLabel}`}
                >
                  <Trash2 />
                </Button>
              ) : null}

              {!isSelected ? (
                <span
                  className={cn(
                    "absolute bottom-2 left-2 bg-background/90 px-2 py-1 text-xs opacity-0 shadow-sm backdrop-blur-sm transition-opacity group-hover:opacity-100",
                    onRemove && "peer-hover/delete:opacity-0",
                  )}
                >
                  {selectionLabel}
                </span>
              ) : null}

              {onRemove ? (
                <span className="pointer-events-none absolute bottom-2 left-2 bg-destructive/80 px-2 py-1 text-xs text-destructive-foreground opacity-0 shadow-sm transition-opacity peer-hover/delete:opacity-100">
                  Supprimer l’image
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};
