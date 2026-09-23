"use client";

import { AboutPageSpirit } from "@/components/features/about/about-page-spirit";
import { AdminEditorSection } from "@/components/layout/admin/editor/admin-editor-section";
import { useAdminEditorRegionClick } from "@/hooks/admin/editor/use-admin-editor-region-click";
import type {
  AboutPageEditorSection,
  AboutPageSpiritEditorSection,
} from "@/lib/admin/about/editor/editor-sections";
import { isAboutPageSpiritEditorSection } from "@/lib/admin/about/editor/editor-sections";
import { ABOUT_PAGE_DEFAULT_SPIRIT_IMAGE } from "@/lib/about/about-page-defaults";

type AboutPageEditorPreviewSpiritProps = {
  eyebrow: string;
  title: string;
  firstParagraph: string;
  secondParagraph: string;
  handwritten: string;
  imageUrl: string | null;

  activeSection: AboutPageEditorSection;
  activeSpiritSection: AboutPageSpiritEditorSection;

  onSectionChange: (section: AboutPageEditorSection) => void;
  onSpiritSectionChange: (section: AboutPageSpiritEditorSection) => void;
};

export const AboutPageEditorPreviewSpirit = ({
  eyebrow,
  title,
  firstParagraph,
  secondParagraph,
  handwritten,
  imageUrl,
  activeSection,
  activeSpiritSection,
  onSectionChange,
  onSpiritSectionChange,
}: AboutPageEditorPreviewSpiritProps) => {
  const handleClick = useAdminEditorRegionClick({
    section: "spirit",
    isRegion: isAboutPageSpiritEditorSection,
    onSectionChange,
    onRegionChange: onSpiritSectionChange,
  });

  return (
    <AdminEditorSection
      label="L’esprit Évasion"
      active={activeSection === "spirit"}
      interactiveChildren
      onSelect={() => onSectionChange("spirit")}
    >
      <div onClick={handleClick}>
        <AboutPageSpirit
          eyebrow={eyebrow}
          title={title}
          firstParagraph={firstParagraph}
          secondParagraph={secondParagraph}
          handwritten={handwritten}
          imageUrl={imageUrl ?? ABOUT_PAGE_DEFAULT_SPIRIT_IMAGE}
          activeEditorRegion={
            activeSection === "spirit" ? activeSpiritSection : undefined
          }
          editorPreview
        />
      </div>
    </AdminEditorSection>
  );
};
