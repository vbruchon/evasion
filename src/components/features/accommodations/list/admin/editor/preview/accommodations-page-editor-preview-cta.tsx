"use client";

import { AccommodationsContactCta } from "@/components/features/accommodations/list/accommodations-contact-cta";
import { AdminEditorSection } from "@/components/layout/admin/editor/admin-editor-section";
import { useAdminEditorRegionClick } from "@/hooks/admin/editor/use-admin-editor-region-click";
import {
  isAccommodationsPageEditorRegion,
  type AccommodationsPageEditorRegion,
  type AccommodationsPageEditorSection,
} from "@/lib/admin/accommodations-page/editor/editor-sections";

type AccommodationsPageEditorPreviewCtaProps = {
  eyebrow: string;
  title: string;
  buttonLabel: string;
  imageUrl: string | null;

  activeSection: AccommodationsPageEditorSection;
  activeCtaSection: AccommodationsPageEditorRegion;

  onSectionChange: (section: AccommodationsPageEditorSection) => void;
  onCtaSectionChange: (section: AccommodationsPageEditorRegion) => void;
};

export const AccommodationsPageEditorPreviewCta = ({
  eyebrow,
  title,
  buttonLabel,
  imageUrl,
  activeSection,
  activeCtaSection,
  onSectionChange,
  onCtaSectionChange,
}: AccommodationsPageEditorPreviewCtaProps) => {
  const handleClick = useAdminEditorRegionClick({
    section: "cta",
    isRegion: isAccommodationsPageEditorRegion,
    onSectionChange,
    onRegionChange: onCtaSectionChange,
  });

  return (
    <AdminEditorSection
      label="Appel à l’action"
      active={activeSection === "cta"}
      interactiveChildren
      onSelect={() => onSectionChange("cta")}
    >
      <div onClick={handleClick}>
        <AccommodationsContactCta
          eyebrow={eyebrow}
          title={title}
          buttonLabel={buttonLabel}
          imageUrl={imageUrl}
          activeEditorRegion={
            activeSection === "cta" ? activeCtaSection : undefined
          }
          editorPreview
        />
      </div>
    </AdminEditorSection>
  );
};
