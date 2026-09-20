"use client";

import { AdminEditorSection } from "@/components/layout/admin/editor/admin-editor-section";
import { ReviewsPageHero } from "@/components/features/reviews/reviews-page-hero";
import { useAdminEditorRegionClick } from "@/hooks/admin/editor/use-admin-editor-region-click";
import type {
  ReviewsPageEditorSection,
  ReviewsPageHeroEditorSection,
} from "@/lib/admin/reviews/editor/editor-sections";
import { isReviewsPageHeroEditorSection } from "@/lib/admin/reviews/editor/editor-sections";

type ReviewsPageEditorPreviewHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  handwrittenFirstLine: string;
  handwrittenSecondLine: string;
  imageUrl: string | null;
  averageRating: number;
  totalReviews: number;

  activeSection: ReviewsPageEditorSection;
  activeHeroSection: ReviewsPageHeroEditorSection;

  onSectionChange: (section: ReviewsPageEditorSection) => void;
  onHeroSectionChange: (section: ReviewsPageHeroEditorSection) => void;
};

export const ReviewsPageEditorPreviewHero = ({
  eyebrow,
  title,
  description,
  handwrittenFirstLine,
  handwrittenSecondLine,
  imageUrl,
  averageRating,
  totalReviews,
  activeSection,
  activeHeroSection,
  onSectionChange,
  onHeroSectionChange,
}: ReviewsPageEditorPreviewHeroProps) => {
  const handleClick = useAdminEditorRegionClick({
    section: "hero",
    isRegion: isReviewsPageHeroEditorSection,
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
        <ReviewsPageHero
          eyebrow={eyebrow}
          title={title}
          description={description}
          handwrittenFirstLine={handwrittenFirstLine}
          handwrittenSecondLine={handwrittenSecondLine}
          imageUrl={imageUrl}
          averageRating={averageRating}
          totalReviews={totalReviews}
          activeEditorRegion={
            activeSection === "hero" ? activeHeroSection : undefined
          }
          editorPreview
        />
      </div>
    </AdminEditorSection>
  );
};
