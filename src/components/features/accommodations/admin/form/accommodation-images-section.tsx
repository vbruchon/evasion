"use client";

import { useState } from "react";

import { AdminFormSection } from "@/components/layout/admin/admin-form-section";
import type { AccommodationPreviewImage } from "@/hooks/use-accommodation-images";
import { getAccommodationDisplayImages } from "@/lib/accommodations/accommodation-images";
import { cn } from "@/lib/utils";

import { AccommodationImageDropzone } from "./accommodation-image-dropzone";
import { AccommodationImageGallery } from "./accommodation-image-gallery";

type AccommodationImagesSectionProps = {
  images: AccommodationPreviewImage[];
  coverImageId: string | null;
  presentationImageId: string | null;
  disabled?: boolean;
  onFilesSelected: (files: File[]) => void;
  onSetCover: (id: string) => void;
  onSetPresentation: (id: string) => void;
  onRemove: (id: string) => void;
};

type ImageRole = "cover" | "presentation";

const imageRoles = [
  {
    id: "cover",
    label: "Couverture",
  },
  {
    id: "presentation",
    label: "Présentation",
  },
] as const satisfies readonly {
  id: ImageRole;
  label: string;
}[];

export const AccommodationImagesSection = ({
  images,
  coverImageId,
  presentationImageId,
  disabled = false,
  onFilesSelected,
  onSetCover,
  onSetPresentation,
  onRemove,
}: AccommodationImagesSectionProps) => {
  const [activeRole, setActiveRole] = useState<ImageRole>("cover");

  const { presentationImage } = getAccommodationDisplayImages(
    images,
    coverImageId,
    presentationImageId,
  );

  const isCoverRole = activeRole === "cover";

  return (
    <AdminFormSection
      title="Images"
      description="Gérez les photos du logement et choisissez les images utilisées sur le site."
    >
      <AccommodationImageDropzone
        onFilesSelected={onFilesSelected}
        disabled={disabled}
      />

      {images.length > 0 ? (
        <div className="mt-6">
          <div className="mb-5 border-b border-border/60">
            <nav className="flex gap-6" aria-label="Utilisation des images">
              {imageRoles.map((role) => {
                const active = activeRole === role.id;

                return (
                  <button
                    key={role.id}
                    type="button"
                    className={cn(
                      "relative cursor-pointer pb-3 text-sm font-medium transition-colors",
                      active
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setActiveRole(role.id)}
                  >
                    {role.label}

                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-0 bottom-0 h-px bg-primary transition-opacity",
                        active ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="mb-3">
            <p className="text-sm font-medium">
              {isCoverRole ? "Image de couverture" : "Image de présentation"}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              {isCoverRole
                ? "Utilisée dans le hero et pour représenter le logement."
                : "Affichée à côté de la présentation du logement."}
            </p>
          </div>

          <AccommodationImageGallery
            images={images}
            selectedImageId={
              isCoverRole ? coverImageId : (presentationImage?.id ?? null)
            }
            selectedLabel={isCoverRole ? "Couverture" : "Présentation"}
            selectionLabel={
              isCoverRole
                ? "Définir comme couverture"
                : "Utiliser pour la présentation"
            }
            secondarySelectedImageId={
              isCoverRole ? (presentationImage?.id ?? null) : coverImageId
            }
            secondarySelectedLabel={isCoverRole ? "Présentation" : "Couverture"}
            disabled={disabled}
            onSelect={isCoverRole ? onSetCover : onSetPresentation}
            onRemove={onRemove}
          />
        </div>
      ) : (
        <div className="mt-4 border border-border/60 px-5 py-4">
          <p className="text-sm font-medium">Aucune image ajoutée</p>

          <p className="mt-1 text-sm text-muted-foreground">
            La première image ajoutée sera utilisée comme image de couverture.
          </p>
        </div>
      )}
    </AdminFormSection>
  );
};
