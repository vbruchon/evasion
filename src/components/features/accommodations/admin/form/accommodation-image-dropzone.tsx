"use client";

import { ImagePlus, Upload } from "lucide-react";
import { type ChangeEvent, type DragEvent, useRef } from "react";

import { MAX_ACCOMMODATION_IMAGES } from "@/hooks/use-accommodation-images";

type AccommodationImageDropzoneProps = {
  onFilesSelected: (files: File[]) => void;
  disabled?: boolean;
};

export const AccommodationImageDropzone = ({
  onFilesSelected,
  disabled = false,
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
        className={`flex min-h-56 flex-col items-center justify-center border border-dashed border-border/80 px-6 text-center transition-colors ${
          disabled
            ? "cursor-not-allowed opacity-60"
            : "cursor-pointer hover:border-primary/50 hover:bg-primary/2"
        }`}
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
        <Upload className="size-8 text-muted-foreground" />

        <p className="mt-4 font-medium">Glissez-déposez vos images ici</p>

        <p className="mt-1 text-sm text-muted-foreground">
          ou cliquez pour sélectionner des fichiers
        </p>

        <div className="mt-5 inline-flex items-center gap-2 border border-border px-4 py-2 text-sm">
          <ImagePlus className="size-4" />
          Sélectionner des images
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          PNG, JPG, AVIF ou WEBP · 8 Mo maximum · {MAX_ACCOMMODATION_IMAGES}{" "}
          images maximum
        </p>
      </div>
    </>
  );
};
