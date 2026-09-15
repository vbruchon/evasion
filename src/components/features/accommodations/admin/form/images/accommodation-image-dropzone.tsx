"use client";

import { ImagePlus, Upload } from "lucide-react";
import { type ChangeEvent, type DragEvent, useRef } from "react";

import { MAX_ACCOMMODATION_IMAGES } from "@/lib/accommodations/accommodation-images";
import { cn } from "@/lib/utils";

type AccommodationImageDropzoneProps = {
  onFilesSelected: (files: File[]) => void;
  disabled?: boolean;
  compact?: boolean;
};

export const AccommodationImageDropzone = ({
  onFilesSelected,
  disabled = false,
  compact = false,
}: AccommodationImageDropzoneProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    void onFilesSelected(Array.from(event.target.files));

    event.target.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (disabled) {
      return;
    }

    void onFilesSelected(Array.from(event.dataTransfer.files));
  };

  const handleOpenFilePicker = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        disabled={disabled}
        className="hidden"
        onChange={handleInputChange}
      />

      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        className={cn(
          "flex flex-col items-center justify-center border border-dashed border-border/80 text-center transition-colors",
          compact ? "min-h-36 px-5 py-5" : "min-h-56 px-6",
          disabled
            ? "cursor-not-allowed opacity-60"
            : "cursor-pointer hover:border-primary/50 hover:bg-primary/2",
        )}
        onClick={handleOpenFilePicker}
        onKeyDown={(event) => {
          if (!disabled && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            handleOpenFilePicker();
          }
        }}
        onDragOver={(event) => event.preventDefault()}
        onDrop={handleDrop}
      >
        <Upload
          className={cn("text-muted-foreground", compact ? "size-6" : "size-8")}
        />

        <p className={cn("font-medium", compact ? "mt-3 text-sm" : "mt-4")}>
          Glissez-déposez vos images ici
        </p>

        {!compact ? (
          <p className="mt-1 text-sm text-muted-foreground">
            ou cliquez pour sélectionner des fichiers
          </p>
        ) : null}

        <div
          className={cn(
            "inline-flex items-center gap-2 border border-border text-sm",
            compact ? "mt-3 px-3 py-1.5" : "mt-5 px-4 py-2",
          )}
        >
          <ImagePlus className="size-4" />
          Ajouter des images
        </div>

        <p
          className={cn(
            "text-xs text-muted-foreground",
            compact ? "mt-3" : "mt-4",
          )}
        >
          PNG, JPG, AVIF ou WEBP · 8 Mo · {MAX_ACCOMMODATION_IMAGES} images max.
        </p>
      </div>
    </>
  );
};
