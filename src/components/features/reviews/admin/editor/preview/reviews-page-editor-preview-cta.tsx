"use client";

import { AdminEditorSection } from "@/components/layout/admin/editor/admin-editor-section";
import { ReviewsPageCta } from "@/components/features/reviews/reviews-page-cta";
import { useAdminEditorRegionClick } from "@/hooks/admin/editor/use-admin-editor-region-click";
import type {
  ReviewsPageCtaEditorSection,
  ReviewsPageEditorSection,
} from "@/lib/admin/reviews/editor/editor-sections";
import { isReviewsPageCtaEditorSection } from "@/lib/admin/reviews/editor/editor-sections";

type ReviewsPageEditorPreviewCtaProps = {
  eyebrow: string;
  title: string;
  description: string;
  handwrittenPrefix: string;
  handwrittenHighlight: string;
  buttonLabel: string;
  imageUrl: string | null;

  activeSection: ReviewsPageEditorSection;
  activeCtaSection: ReviewsPageCtaEditorSection;

  onSectionChange: (section: ReviewsPageEditorSection) => void;
  onCtaSectionChange: (section: ReviewsPageCtaEditorSection) => void;
};

export const ReviewsPageEditorPreviewCta = ({
  eyebrow,
  title,
  description,
  handwrittenPrefix,
  handwrittenHighlight,
  buttonLabel,
  imageUrl,
  activeSection,
  activeCtaSection,
  onSectionChange,
  onCtaSectionChange,
}: ReviewsPageEditorPreviewCtaProps) => {
  const handleClick = useAdminEditorRegionClick({
    section: "cta",
    isRegion: isReviewsPageCtaEditorSection,
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
        <ReviewsPageCta
          eyebrow={eyebrow}
          title={title}
          description={description}
          handwrittenPrefix={handwrittenPrefix}
          handwrittenHighlight={handwrittenHighlight}
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
