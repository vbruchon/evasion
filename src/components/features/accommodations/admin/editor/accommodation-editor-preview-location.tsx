"use client";

import type { MouseEvent } from "react";

import type {
  AccommodationEditorSection,
  AccommodationLocationEditorSection,
} from "@/lib/admin/accommodation/editor-sections";
import { isAccommodationLocationEditorSection } from "@/lib/admin/accommodation/editor-sections";

import { AccommodationLocation } from "../../slug/accommodation-location";
import { AccommodationEditorSection as EditorSection } from "./accommodation-editor-section";

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
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    const region = target.closest<HTMLElement>("[data-editor-region]");
    const regionId = region?.dataset.editorRegion;

    if (!regionId || !isAccommodationLocationEditorSection(regionId)) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    onLocationSectionChange(regionId);
    onSectionChange("location");
  };

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
