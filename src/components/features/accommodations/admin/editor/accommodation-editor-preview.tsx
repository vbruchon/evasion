"use client";

import type {
  AccommodationEditorSection,
  AccommodationHeroEditorSection,
} from "@/lib/admin/accommodation/editor-sections";
import type { AccommodationPreviewImage } from "@/hooks/use-accommodation-images";
import { useAccommodationEditorPreviewData } from "@/hooks/use-accommodation-editor-preview-data";

import { AccommodationAmenities } from "../../slug/accommodation-amenities";
import { AccommodationGallery } from "../../slug/accommodation-gallery";
import { AccommodationPresentation } from "../../slug/accommodation-presentation";
import { AccommodationEditorPreviewHero } from "./accommodation-editor-preview-hero";
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
  const {
    accommodation,
    amenities,
    coverImage,
    highlights,
    name,
    presentationImage,
    previewImages,
  } = useAccommodationEditorPreviewData({
    images,
    coverImageId,
    presentationImageId,
  });

  return (
    <div className="min-w-0 bg-background p-2 sm:p-4">
      <AccommodationEditorPreviewHero
        accommodation={accommodation}
        coverImage={coverImage}
        highlights={highlights}
        hasGallery={previewImages.length > 0}
        activeSection={activeSection}
        activeHeroSection={activeHeroSection}
        onSectionChange={onSectionChange}
        onHeroSectionChange={onHeroSectionChange}
      />

      <EditorSection
        label="Présentation"
        active={activeSection === "presentation"}
        onSelect={() => onSectionChange("presentation")}
      >
        <AccommodationPresentation
          accommodation={accommodation}
          image={presentationImage}
          editorPreview
        />
      </EditorSection>

      <EditorSection
        label="Équipements"
        active={activeSection === "amenities"}
        onSelect={() => onSectionChange("amenities")}
      >
        <AccommodationAmenities amenities={amenities} editorPreview />
      </EditorSection>

      <EditorSection
        label="Galerie"
        active={activeSection === "gallery"}
        onSelect={() => onSectionChange("gallery")}
      >
        <AccommodationGallery
          accommodationName={name}
          images={previewImages}
          editorPreview
        />
      </EditorSection>
    </div>
  );
};
