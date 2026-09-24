"use client";

import { AdminEditorSection } from "@/components/layout/admin/editor/admin-editor-section";
import { useAdminEditorRegionClick } from "@/hooks/admin/editor/use-admin-editor-region-click";
import type {
  AccommodationEditorSection,
  AccommodationPresentationEditorSection,
} from "@/lib/admin/accommodation/editor/editor-sections";
import { isAccommodationPresentationEditorSection } from "@/lib/admin/accommodation/editor/editor-sections";

import { AccommodationPresentation } from "../../../detail/accommodation-presentation";

type AccommodationEditorPreviewPresentationProps = {
  accommodation: React.ComponentProps<
    typeof AccommodationPresentation
  >["accommodation"];
  image: React.ComponentProps<typeof AccommodationPresentation>["image"];
  activeSection: AccommodationEditorSection;
  activePresentationSection: AccommodationPresentationEditorSection;
  onSectionChange: (section: AccommodationEditorSection) => void;
  onPresentationSectionChange: (
    section: AccommodationPresentationEditorSection,
  ) => void;
};

export const AccommodationEditorPreviewPresentation = ({
  accommodation,
  image,
  activeSection,
  activePresentationSection,
  onSectionChange,
  onPresentationSectionChange,
}: AccommodationEditorPreviewPresentationProps) => {
  const handleClick = useAdminEditorRegionClick({
    section: "presentation",
    isRegion: isAccommodationPresentationEditorSection,
    onSectionChange,
    onRegionChange: onPresentationSectionChange,
  });

  return (
    <AdminEditorSection
      label="Présentation"
      active={activeSection === "presentation"}
      interactiveChildren
      onSelect={() => onSectionChange("presentation")}
    >
      <div onClick={handleClick}>
        <AccommodationPresentation
          accommodation={accommodation}
          image={image}
          activeEditorRegion={
            activeSection === "presentation"
              ? activePresentationSection
              : undefined
          }
          editorPreview
        />
      </div>
    </AdminEditorSection>
  );
};
