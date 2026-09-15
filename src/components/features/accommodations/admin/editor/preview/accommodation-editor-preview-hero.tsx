"use client";

import { useAccommodationEditorRegionClick } from "@/hooks/accommodations/admin/editor/use-accommodation-editor-region-click";
import type {
  AccommodationEditorSection,
  AccommodationHeroEditorSection,
} from "@/lib/admin/accommodation/editor/editor-sections";
import { isAccommodationHeroEditorSection } from "@/lib/admin/accommodation/editor/editor-sections";

import { AccommodationEditorSection as EditorSection } from "../accommodation-editor-section";
import { AccommodationHero } from "../../../detail/hero/accommodation-hero";

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
  const handleClick = useAccommodationEditorRegionClick({
    section: "hero",
    isRegion: isAccommodationHeroEditorSection,
    onSectionChange,
    onRegionChange: onHeroSectionChange,
  });

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
