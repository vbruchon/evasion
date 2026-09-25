"use client";

import { FaqPageHero } from "@/components/features/faq/faq-page-hero";
import { AdminEditorSection } from "@/components/layout/admin/editor/admin-editor-section";
import { useAdminEditorRegionClick } from "@/hooks/admin/editor/use-admin-editor-region-click";
import {
  isFaqPageHeroEditorSection,
  type FaqPageEditorSection,
  type FaqPageHeroEditorSection,
} from "@/lib/admin/faq/editor/editor-sections";

type FaqPageEditorPreviewHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  handwrittenFirstLine: string;
  handwrittenSecondLine: string;
  imageUrl: string | null;

  activeSection: FaqPageEditorSection;
  activeHeroSection: FaqPageHeroEditorSection;

  onSectionChange: (section: FaqPageEditorSection) => void;
  onHeroSectionChange: (section: FaqPageHeroEditorSection) => void;
};

export const FaqPageEditorPreviewHero = ({
  eyebrow,
  title,
  description,
  handwrittenFirstLine,
  handwrittenSecondLine,
  imageUrl,
  activeSection,
  activeHeroSection,
  onSectionChange,
  onHeroSectionChange,
}: FaqPageEditorPreviewHeroProps) => {
  const handleClick = useAdminEditorRegionClick({
    section: "hero",
    isRegion: isFaqPageHeroEditorSection,
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
        <FaqPageHero
          eyebrow={eyebrow}
          title={title}
          description={description}
          handwrittenFirstLine={handwrittenFirstLine}
          handwrittenSecondLine={handwrittenSecondLine}
          imageUrl={imageUrl}
          activeEditorRegion={
            activeSection === "hero" ? activeHeroSection : undefined
          }
        />
      </div>
    </AdminEditorSection>
  );
};
