"use client";

import { AccommodationsPageHero } from "@/components/features/accommodations/list/accommodations-page-hero";
import { AdminEditorSection } from "@/components/layout/admin/editor/admin-editor-section";
import { useAdminEditorRegionClick } from "@/hooks/admin/editor/use-admin-editor-region-click";
import {
  isAccommodationsPageEditorRegion,
  type AccommodationsPageEditorRegion,
  type AccommodationsPageEditorSection,
} from "@/lib/admin/accommodations-page/editor/editor-sections";

type AccommodationsPageEditorPreviewHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  imageUrl: string | null;

  activeSection: AccommodationsPageEditorSection;
  activeHeroSection: AccommodationsPageEditorRegion;

  onSectionChange: (section: AccommodationsPageEditorSection) => void;
  onHeroSectionChange: (section: AccommodationsPageEditorRegion) => void;
};

export const AccommodationsPageEditorPreviewHero = ({
  eyebrow,
  title,
  description,
  imageUrl,
  activeSection,
  activeHeroSection,
  onSectionChange,
  onHeroSectionChange,
}: AccommodationsPageEditorPreviewHeroProps) => {
  const handleClick = useAdminEditorRegionClick({
    section: "hero",
    isRegion: isAccommodationsPageEditorRegion,
    onSectionChange,
    onRegionChange: onHeroSectionChange,
  });

  return (
    <AdminEditorSection
      label="Hero"
      active={activeSection === "hero"}
      interactiveChildren
      onSelect={() => onSectionChange("hero")}
    >
      <div onClick={handleClick}>
        <AccommodationsPageHero
          eyebrow={eyebrow}
          title={title}
          description={description}
          imageUrl={imageUrl}
          activeEditorRegion={
            activeSection === "hero" ? activeHeroSection : undefined
          }
        />
      </div>
    </AdminEditorSection>
  );
};
