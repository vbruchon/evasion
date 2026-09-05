"use client";

import type { MouseEvent } from "react";

import type {
  AccommodationEditorSection,
  AccommodationHeroEditorSection,
} from "@/lib/admin/accommodation/editor-sections";
import { isAccommodationHeroEditorSection } from "@/lib/admin/accommodation/editor-sections";

import { AccommodationHero } from "../../slug/accommodation-hero";
import { AccommodationEditorSection as EditorSection } from "./accommodation-editor-section";

type AccommodationEditorPreviewHeroProps = {
  accommodation: React.ComponentProps<
    typeof AccommodationHero
  >["accommodation"];
  coverImage: React.ComponentProps<typeof AccommodationHero>["coverImage"];
  highlights: React.ComponentProps<typeof AccommodationHero>["highlights"];
  hasGallery: boolean;
  activeSection: AccommodationEditorSection;
  activeHeroSection: AccommodationHeroEditorSection;
  onSectionChange: (section: AccommodationEditorSection) => void;
  onHeroSectionChange: (section: AccommodationHeroEditorSection) => void;
};

export const AccommodationEditorPreviewHero = ({
  accommodation,
  coverImage,
  highlights,
  hasGallery,
  activeSection,
  activeHeroSection,
  onSectionChange,
  onHeroSectionChange,
}: AccommodationEditorPreviewHeroProps) => {
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
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
    <EditorSection
      label="Hero"
      active={activeSection === "hero"}
      interactiveChildren
      onSelect={() => onSectionChange("hero")}
    >
      <div onClick={handleClick}>
        <AccommodationHero
          accommodation={accommodation}
          coverImage={coverImage}
          hasGallery={hasGallery}
          highlights={highlights}
          activeEditorRegion={
            activeSection === "hero" ? activeHeroSection : undefined
          }
          editorPreview
        />
      </div>
    </EditorSection>
  );
};
