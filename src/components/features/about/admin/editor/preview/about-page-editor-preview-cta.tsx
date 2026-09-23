"use client";

import { AboutPageCta } from "@/components/features/about/about-page-cta";
import { AdminEditorSection } from "@/components/layout/admin/editor/admin-editor-section";
import { useAdminEditorRegionClick } from "@/hooks/admin/editor/use-admin-editor-region-click";
import type {
  AboutPageCtaEditorSection,
  AboutPageEditorSection,
} from "@/lib/admin/about/editor/editor-sections";
import { isAboutPageCtaEditorSection } from "@/lib/admin/about/editor/editor-sections";

type AboutPageEditorPreviewCtaProps = {
  eyebrow: string;
  title: string;
  description: string;
  buttonLabel: string;
  imageUrl: string | null;

  activeSection: AboutPageEditorSection;
  activeCtaSection: AboutPageCtaEditorSection;

  onSectionChange: (section: AboutPageEditorSection) => void;
  onCtaSectionChange: (section: AboutPageCtaEditorSection) => void;
};

export const AboutPageEditorPreviewCta = ({
  eyebrow,
  title,
  description,
  buttonLabel,
  imageUrl,
  activeSection,
  activeCtaSection,
  onSectionChange,
  onCtaSectionChange,
}: AboutPageEditorPreviewCtaProps) => {
  const handleClick = useAdminEditorRegionClick({
    section: "cta",
    isRegion: isAboutPageCtaEditorSection,
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
        <AboutPageCta
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
