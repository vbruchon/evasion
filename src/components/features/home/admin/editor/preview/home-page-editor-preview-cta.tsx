"use client";

import { HomePageCta } from "@/components/features/home/home-page-cta";
import { AdminEditorSection } from "@/components/layout/admin/editor/admin-editor-section";
import { useAdminEditorRegionClick } from "@/hooks/admin/editor/use-admin-editor-region-click";
import {
  isHomePageCtaEditorSection,
  type HomePageCtaEditorSection,
  type HomePageEditorSection,
} from "@/lib/admin/home/editor/editor-sections";

type HomePageEditorPreviewCtaProps = {
  eyebrow: string;
  title: string;
  description: string;
  buttonLabel: string;
  imageUrl: string | null;

  activeSection: HomePageEditorSection;
  activeCtaSection: HomePageCtaEditorSection;

  onSectionChange: (section: HomePageEditorSection) => void;
  onCtaSectionChange: (section: HomePageCtaEditorSection) => void;
};

export const HomePageEditorPreviewCta = ({
  eyebrow,
  title,
  description,
  buttonLabel,
  imageUrl,
  activeSection,
  activeCtaSection,
  onSectionChange,
  onCtaSectionChange,
}: HomePageEditorPreviewCtaProps) => {
  const handleClick = useAdminEditorRegionClick({
    section: "cta",
    isRegion: isHomePageCtaEditorSection,
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
        <HomePageCta
          eyebrow={eyebrow}
          title={title}
          description={description}
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
