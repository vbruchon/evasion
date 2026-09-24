"use client";

import Image from "next/image";
import { ImagePlus, RotateCcw, Upload } from "lucide-react";
import { type ChangeEvent, type DragEvent, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  ADMIN_IMAGE_ACCEPT,
  ADMIN_IMAGE_FORMAT_LABEL,
  ADMIN_IMAGE_MAX_FILE_SIZE_MB,
  getAdminImageFileValidationError,
} from "@/lib/admin/images/image-upload";
import { cn } from "@/lib/utils";

type AdminImageEditorProps = {
  title: string;
  description: string;
  imageUrl: string;
  hasCustomImage: boolean;
  disabled?: boolean;
  onFileSelected: (file: File) => void;
  onRemove: () => void;
};

export const AdminImageEditor = ({
  title,
  description,
  imageUrl,
  hasCustomImage,
  disabled = false,
  onFileSelected,
  onRemove,
}: AdminImageEditorProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (file: File) => {
    const validationError = getAdminImageFileValidationError(file);

    setError(validationError);

    if (validationError) {
      return;
    }

    onFileSelected(file);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      handleFile(file);
    }

    event.target.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (disabled) {
      return;
    }

    const file = event.dataTransfer.files[0];

    if (file) {
      handleFile(file);
    }
  };

  const handleOpenFilePicker = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-medium">{title}</p>

        <p className="mt-1 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>

      <div className="relative aspect-video overflow-hidden border border-border/70 bg-card/30">
        <Image
          src={imageUrl}
          alt=""
          fill
          unoptimized={imageUrl.startsWith("blob:")}
          sizes="420px"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/10" />

        <div className="absolute bottom-3 left-3 border border-white/15 bg-black/60 px-2.5 py-1.5 text-[10px] font-medium uppercase tracking-widest text-white backdrop-blur-sm">
          {hasCustomImage ? "Image personnalisée" : "Image par défaut"}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ADMIN_IMAGE_ACCEPT}
        disabled={disabled}
        className="hidden"
        onChange={handleInputChange}
      />

      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        className={cn(
          "flex min-h-36 flex-col items-center justify-center border border-dashed border-border/80 px-5 py-5 text-center transition-colors",
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
        <Upload className="size-6 text-muted-foreground" />

        <p className="mt-3 text-sm font-medium">Glissez-déposez une image</p>

        <div className="mt-3 inline-flex items-center gap-2 border border-border px-3 py-1.5 text-sm">
          <ImagePlus className="size-4" />
          Choisir une image
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          {ADMIN_IMAGE_FORMAT_LABEL} · {ADMIN_IMAGE_MAX_FILE_SIZE_MB} Mo max.
        </p>
      </div>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      {hasCustomImage ? (
        <Button
          type="button"
          variant="outline"
          className="w-full"
          disabled={disabled}
          onClick={onRemove}
        >
          <RotateCcw />
          Revenir à l’image par défaut
        </Button>
      ) : null}
    </div>
  );
};
