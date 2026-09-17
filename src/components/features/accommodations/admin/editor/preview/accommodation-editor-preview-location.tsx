"use client";

import { useAdminEditorRegionClick } from "@/hooks/admin/editor/use-admin-editor-region-click";
import type {
  AccommodationEditorSection,
  AccommodationLocationEditorSection,
} from "@/lib/admin/accommodation/editor/editor-sections";
import { isAccommodationLocationEditorSection } from "@/lib/admin/accommodation/editor/editor-sections";

import { AdminEditorSection } from "@/components/layout/admin/editor/admin-editor-section";
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
  const handleClick = useAdminEditorRegionClick({
    section: "location",
    isRegion: isAccommodationLocationEditorSection,
    onSectionChange,
    onRegionChange: onLocationSectionChange,
  });

  return (
    <AdminEditorSection
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
    </AdminEditorSection>
  );
};
