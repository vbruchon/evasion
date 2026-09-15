"use client";

import { useAccommodationEditorRegionClick } from "@/hooks/accommodations/admin/editor/use-accommodation-editor-region-click";
import type {
  AccommodationEditorSection,
  AccommodationLocationEditorSection,
} from "@/lib/admin/accommodation/editor/editor-sections";
import { isAccommodationLocationEditorSection } from "@/lib/admin/accommodation/editor/editor-sections";

import { AccommodationEditorSection as EditorSection } from "../accommodation-editor-section";
import { AccommodationLocation } from "../../../detail/location/accommodation-location";

type AccommodationEditorPreviewLocationProps = {
  accommodation: React.ComponentProps<
    typeof AccommodationLocation
  >["accommodation"];
  accesses: React.ComponentProps<typeof AccommodationLocation>["accesses"];
  activeSection: AccommodationEditorSection;
  activeLocationSection: AccommodationLocationEditorSection;
  onSectionChange: (section: AccommodationEditorSection) => void;
  onLocationSectionChange: (
    section: AccommodationLocationEditorSection,
  ) => void;
};

export const AccommodationEditorPreviewLocation = ({
  accommodation,
  accesses,
  activeSection,
  activeLocationSection,
  onSectionChange,
  onLocationSectionChange,
}: AccommodationEditorPreviewLocationProps) => {
  const handleClick = useAccommodationEditorRegionClick({
    section: "location",
    isRegion: isAccommodationLocationEditorSection,
    onSectionChange,
    onRegionChange: onLocationSectionChange,
  });

  return (
    <EditorSection
      label="Localisation"
      active={activeSection === "location"}
      interactiveChildren
      onSelect={() => onSectionChange("location")}
    >
      <div onClick={handleClick}>
        <AccommodationLocation
          accommodation={accommodation}
          accesses={accesses}
          activeEditorRegion={
            activeSection === "location" ? activeLocationSection : undefined
          }
          editorPreview
        />
      </div>
    </EditorSection>
  );
};
