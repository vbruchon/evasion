"use client";

import { HomePageEscape } from "@/components/features/home/escape/home-page-escape";
import { AdminEditorSection } from "@/components/layout/admin/editor/admin-editor-section";
import { useAdminEditorRegionClick } from "@/hooks/admin/editor/use-admin-editor-region-click";
import {
  isHomePageEscapeEditorSection,
  type HomePageEditorSection,
  type HomePageEscapeEditorSection,
} from "@/lib/admin/home/editor/editor-sections";
import { HOME_PAGE_DEFAULT_ESCAPE_IMAGE } from "@/lib/home/home-page-defaults";

type HomePageEditorPreviewEscapeProps = {
  eyebrow: string;
  title: string;
  description: string;
  handwritten: string;
  imageUrl: string | null;

  activeSection: HomePageEditorSection;
  activeEscapeSection: HomePageEscapeEditorSection;

  onSectionChange: (section: HomePageEditorSection) => void;
  onEscapeSectionChange: (section: HomePageEscapeEditorSection) => void;
};

export const HomePageEditorPreviewEscape = ({
  eyebrow,
  title,
  description,
  handwritten,
  imageUrl,
  activeSection,
  activeEscapeSection,
  onSectionChange,
  onEscapeSectionChange,
}: HomePageEditorPreviewEscapeProps) => {
  const handleClick = useAdminEditorRegionClick({
    section: "escape",
    isRegion: isHomePageEscapeEditorSection,
    onSectionChange,
    onRegionChange: onEscapeSectionChange,
  });

  return (
    <AdminEditorSection
      label="L’esprit Évasion"
      active={activeSection === "escape"}
      interactiveChildren
      onSelect={() => onSectionChange("escape")}
    >
      <div onClick={handleClick}>
        <HomePageEscape
          eyebrow={eyebrow}
          title={title}
          description={description}
          handwritten={handwritten}
          imageUrl={imageUrl ?? HOME_PAGE_DEFAULT_ESCAPE_IMAGE}
          activeEditorRegion={
            activeSection === "escape" ? activeEscapeSection : undefined
          }
          editorPreview
        />
      </div>
    </AdminEditorSection>
  );
};
