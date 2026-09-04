"use client";

import type { MouseEvent } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import type { AccommodationUpdateFormValues } from "~/app/admin/logements/schema";

import type { AccommodationPreviewImage } from "@/hooks/use-accommodation-images";
import { getAccommodationDisplayImages } from "@/lib/accommodations/accommodation-images";
import {
  isAccommodationHeroEditorSection,
  type AccommodationEditorSection,
  type AccommodationHeroEditorSection,
} from "@/lib/admin/accommodation/editor-sections";

import { AccommodationGallery } from "../../slug/accommodation-gallery";
import { AccommodationHero } from "../../slug/accommodation-hero";
import { AccommodationPresentation } from "../../slug/accommodation-presentation";
import { AccommodationEditorSection as EditorSection } from "./accommodation-editor-section";

type AccommodationEditorPreviewProps = {
  images: AccommodationPreviewImage[];
  coverImageId: string | null;
  presentationImageId: string | null;
  activeSection: AccommodationEditorSection;
  activeHeroSection: AccommodationHeroEditorSection;
  onSectionChange: (section: AccommodationEditorSection) => void;
  onHeroSectionChange: (section: AccommodationHeroEditorSection) => void;
};

export const AccommodationEditorPreview = ({
  images,
  coverImageId,
  presentationImageId,
  activeSection,
  activeHeroSection,
  onSectionChange,
  onHeroSectionChange,
}: AccommodationEditorPreviewProps) => {
  const { control } = useFormContext<AccommodationUpdateFormValues>();

  const [
    name,
    type,
    subtitle,
    shortDescription,
    description,
    guestCapacity,
    bedrooms,
    beds,
    bathrooms,
    surface,
    highlights,
  ] = useWatch({
    control,
    name: [
      "name",
      "type",
      "subtitle",
      "shortDescription",
      "description",
      "guestCapacity",
      "bedrooms",
      "beds",
      "bathrooms",
      "surface",
      "highlights",
    ],
  });

  const accommodation = {
    name,
    type,
    subtitle,
    shortDescription,
    description,
    guestCapacity,
    bedrooms,
    beds,
    bathrooms,
    surface,
  };

  const previewImages = images.map((image) => ({
    id: image.id,
    url: image.url,
    alt: image.alt ?? null,
  }));

  const { coverImage, presentationImage } = getAccommodationDisplayImages(
    previewImages,
    coverImageId,
    presentationImageId,
  );

  const handleHeroClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    const region = target.closest<HTMLElement>("[data-editor-region]");

    const regionId = region?.dataset.editorRegion;

    if (!regionId || !isAccommodationHeroEditorSection(regionId)) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    onHeroSectionChange(regionId);
    onSectionChange("hero");
  };

  return (
    <div className="min-w-0 bg-background p-2 sm:p-4">
      <EditorSection
        label="Hero"
        active={activeSection === "hero"}
        interactiveChildren
        onSelect={() => onSectionChange("hero")}
      >
        <div onClick={handleHeroClick}>
          <AccommodationHero
            accommodation={accommodation}
            coverImage={coverImage}
            hasGallery={previewImages.length > 0}
            highlights={highlights}
            activeEditorRegion={
              activeSection === "hero" ? activeHeroSection : undefined
            }
          />
        </div>
      </EditorSection>

      <EditorSection
        label="Présentation"
        active={activeSection === "presentation"}
        onSelect={() => onSectionChange("presentation")}
      >
        <AccommodationPresentation
          accommodation={accommodation}
          image={presentationImage}
        />
      </EditorSection>

      <EditorSection
        label="Galerie"
        active={activeSection === "gallery"}
        onSelect={() => onSectionChange("gallery")}
      >
        <AccommodationGallery accommodationName={name} images={previewImages} />
      </EditorSection>
    </div>
  );
};
