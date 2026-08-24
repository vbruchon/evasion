"use client";

import { Trash2 } from "lucide-react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { AccommodationPreviewImage } from "@/hooks/use-accommodation-images";

type AccommodationImageGalleryProps = {
  images: AccommodationPreviewImage[];
  coverImageId: string | null;
  disabled?: boolean;
  onSetCover: (id: string) => void;
  onRemove: (id: string) => void;
};

export const AccommodationImageGallery = ({
  images,
  coverImageId,
  disabled = false,
  onSetCover,
  onRemove,
}: AccommodationImageGalleryProps) => {
  return (
    <div className="mt-6">
      <p className="mb-3 text-xs text-muted-foreground md:hidden">
        Touchez une photo pour la définir comme image de couverture.
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {images.map((image) => {
          const isCover = image.id === coverImageId;

          const imageLabel =
            image.alt ?? image.file?.name ?? "Image du logement";

          return (
            <div
              key={image.id}
              role="button"
              tabIndex={disabled ? -1 : 0}
              className={`group relative aspect-4/3 overflow-hidden transition-colors ${
                isCover
                  ? "border-2 border-primary ring-2 ring-primary"
                  : "cursor-pointer border border-border/60 hover:border-primary/60"
              }`}
              onClick={() => {
                if (!disabled) {
                  onSetCover(image.id);
                }
              }}
              onKeyDown={(event) => {
                if (!disabled && (event.key === "Enter" || event.key === " ")) {
                  event.preventDefault();
                  onSetCover(image.id);
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

              {isCover ? (
                <Badge className="absolute left-0 top-0 z-10 border border-primary bg-primary px-2.5 py-1 text-primary-foreground shadow-lg">
                  Couverture
                </Badge>
              ) : null}

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

              {!isCover ? (
                <span className="absolute bottom-2 left-2 bg-background/90 px-2 py-1 text-xs opacity-0 shadow-sm backdrop-blur-sm transition-opacity group-hover:opacity-100 peer-hover/delete:opacity-0">
                  Définir comme couverture
                </span>
              ) : null}

              <span className="pointer-events-none absolute bottom-2 left-2 bg-destructive/80 px-2 py-1 text-xs text-destructive-foreground opacity-0 shadow-sm transition-opacity peer-hover/delete:opacity-100">
                Supprimer l’image
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
