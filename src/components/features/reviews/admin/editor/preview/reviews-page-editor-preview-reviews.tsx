"use client";

import { AdminEditorSection } from "@/components/layout/admin/editor/admin-editor-section";
import { ReviewsPageReviewsSection } from "@/components/features/reviews/reviews-page-reviews-section";
import { useAdminEditorRegionClick } from "@/hooks/admin/editor/use-admin-editor-region-click";
import type {
  ReviewsPageEditorSection,
  ReviewsPageReviewsEditorSection,
} from "@/lib/admin/reviews/editor/editor-sections";
import { isReviewsPageReviewsEditorSection } from "@/lib/admin/reviews/editor/editor-sections";
import type { ReviewsPageAdminData } from "@/lib/admin/reviews/queries/get-reviews-page-admin-data";

type ReviewsPageEditorPreviewReviewsProps = {
  data: ReviewsPageAdminData;

  recentReviewsEyebrow: string;
  recentReviewsTitle: string;
  recentReviewsDescription: string;

  allReviewsTitle: string;
  allReviewsDescription: string;

  activeSection: ReviewsPageEditorSection;
  activeReviewsSection: ReviewsPageReviewsEditorSection;

  onSectionChange: (section: ReviewsPageEditorSection) => void;
  onReviewsSectionChange: (section: ReviewsPageReviewsEditorSection) => void;
};

export const ReviewsPageEditorPreviewReviews = ({
  data,
  recentReviewsEyebrow,
  recentReviewsTitle,
  recentReviewsDescription,
  allReviewsTitle,
  allReviewsDescription,
  activeSection,
  activeReviewsSection,
  onSectionChange,
  onReviewsSectionChange,
}: ReviewsPageEditorPreviewReviewsProps) => {
  const handleClick = useAdminEditorRegionClick({
    section: "reviews",
    isRegion: isReviewsPageReviewsEditorSection,
    onSectionChange,
    onRegionChange: onReviewsSectionChange,
  });

  return (
    <AdminEditorSection
      label="Avis"
      active={activeSection === "reviews"}
      interactiveChildren
      onSelect={() => onSectionChange("reviews")}
    >
      <div onClick={handleClick}>
        <ReviewsPageReviewsSection
          recentReviewsEyebrow={recentReviewsEyebrow}
          recentReviewsTitle={recentReviewsTitle}
          recentReviewsDescription={recentReviewsDescription}
          recentReviews={data.recentReviews}
          allReviewsTitle={allReviewsTitle}
          allReviewsDescription={allReviewsDescription}
          initialReviews={data.initialReviews}
          accommodations={data.accommodations}
          activeEditorRegion={
            activeSection === "reviews" ? activeReviewsSection : undefined
          }
          editorPreview
        />
      </div>
    </AdminEditorSection>
  );
};
