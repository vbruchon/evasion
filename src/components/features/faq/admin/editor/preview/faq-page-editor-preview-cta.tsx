"use client";

import { FaqPageCta } from "@/components/features/faq/faq-page-cta";
import { AdminEditorSection } from "@/components/layout/admin/editor/admin-editor-section";
import { useAdminEditorRegionClick } from "@/hooks/admin/editor/use-admin-editor-region-click";
import {
  isFaqPageCtaEditorSection,
  type FaqPageCtaEditorSection,
  type FaqPageEditorSection,
} from "@/lib/admin/faq/editor/editor-sections";

type FaqPageEditorPreviewCtaProps = {
  eyebrow: string;
  title: string;
  description: string;
  buttonLabel: string;
  imageUrl: string | null;

  activeSection: FaqPageEditorSection;
  activeCtaSection: FaqPageCtaEditorSection;

  onSectionChange: (section: FaqPageEditorSection) => void;
  onCtaSectionChange: (section: FaqPageCtaEditorSection) => void;
};

export const FaqPageEditorPreviewCta = ({
  eyebrow,
  title,
  description,
  buttonLabel,
  imageUrl,
  activeSection,
  activeCtaSection,
  onSectionChange,
  onCtaSectionChange,
}: FaqPageEditorPreviewCtaProps) => {
  const handleClick = useAdminEditorRegionClick({
    section: "cta",
    isRegion: isFaqPageCtaEditorSection,
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
        <FaqPageCta
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
