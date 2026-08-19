"use client";

import type { AccommodationImage } from "@/generated/prisma/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

type AccommodationGalleryLightboxProps = {
  accommodationName: string;
  images: AccommodationImage[];
  selectedIndex: number | null;
  onSelectedIndexChange: (index: number | null) => void;
};

export function AccommodationGalleryLightbox({
  accommodationName,
  images,
  selectedIndex,
  onSelectedIndexChange,
}: AccommodationGalleryLightboxProps) {
  const selectedImage =
    selectedIndex !== null ? images[selectedIndex] : undefined;

  const showPreviousImage = () => {
    if (selectedIndex === null) {
      return;
    }

    onSelectedIndexChange(
      selectedIndex === 0 ? images.length - 1 : selectedIndex - 1,
    );
  };

  const showNextImage = () => {
    if (selectedIndex === null) {
      return;
    }

    onSelectedIndexChange(
      selectedIndex === images.length - 1 ? 0 : selectedIndex + 1,
    );
  };

  return (
    <Dialog
      open={selectedIndex !== null}
      onOpenChange={(open) => {
        if (!open) {
          onSelectedIndexChange(null);
        }
      }}
    >
      <DialogContent
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            showPreviousImage();
          }

          if (event.key === "ArrowRight") {
            event.preventDefault();
            showNextImage();
          }
        }}
        className="
          flex h-svh w-screen max-w-none items-center justify-center
          rounded-none border-0 bg-transparent p-0 shadow-none outline-none ring-0
          sm:max-w-none
          data-[state=closed]:animate-none
          data-[state=open]:animate-none
        "
      >
        <DialogTitle className="sr-only">
          Galerie de {accommodationName}
        </DialogTitle>

        <DialogDescription className="sr-only">
          Image {selectedIndex !== null ? selectedIndex + 1 : 0} sur{" "}
          {images.length}
        </DialogDescription>

        {selectedImage ? (
          <div className="relative h-[calc(100svh-6rem)] w-[calc(100vw-6rem)] md:h-[calc(100svh-8rem)] md:w-[calc(100vw-10rem)]">
            <Image
              key={selectedImage.id}
              src={selectedImage.url}
              alt={selectedImage.alt ?? accommodationName}
              fill
              priority
              sizes="100vw"
              className="object-contain"
            />
          </div>
        ) : null}

        {images.length > 1 ? (
          <>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={showPreviousImage}
              aria-label="Afficher l’image précédente"
              className="
                absolute left-3 top-1/2 z-10 size-11 -translate-y-1/2
                rounded-sm bg-black/40 text-white backdrop-blur-sm
                transition-colors
                hover:bg-black/60 hover:text-primary
                md:left-6 md:size-12
              "
            >
              <ChevronLeft className="size-6" />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={showNextImage}
              aria-label="Afficher l’image suivante"
              className="
                absolute right-3 top-1/2 z-10 size-11 -translate-y-1/2
                rounded-sm bg-black/40 text-white backdrop-blur-sm
                transition-colors
                hover:bg-black/60 hover:text-primary
                md:right-6 md:size-12
              "
            >
              <ChevronRight className="size-6" />
            </Button>
          </>
        ) : null}

        <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm text-white/70">
          {selectedIndex !== null ? selectedIndex + 1 : 0} / {images.length}
        </p>
      </DialogContent>
    </Dialog>
  );
}
