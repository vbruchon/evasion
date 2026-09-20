"use client";

import { useWatch } from "react-hook-form";

import type { AccommodationUpdateFormValues } from "@/lib/admin/accommodation/schema";

import type { AccommodationUpdateData } from "@/lib/admin/accommodation/queries/get-accommodation-for-update";
import type {
  AccommodationEditorSection,
  AccommodationReviewsEditorSection,
} from "@/lib/admin/accommodation/editor/editor-sections";
import { AccommodationReviews } from "@/components/features/accommodations/detail/reviews/accommodation-reviews";
import { isAccommodationReviewsEditorSection } from "@/lib/admin/accommodation/editor/editor-sections";

import { AdminEditorSection } from "@/components/layout/admin/editor/admin-editor-section";
import { useAdminEditorRegionClick } from "@/hooks/admin/editor/use-admin-editor-region-click";

type AccommodationEditorPreviewReviewsProps = {
  reviews: AccommodationUpdateData["reviews"];
  activeSection: AccommodationEditorSection;
  activeReviewsSection: AccommodationReviewsEditorSection;
  onSectionChange: (section: AccommodationEditorSection) => void;
  onReviewsSectionChange: (section: AccommodationReviewsEditorSection) => void;
};

export const AccommodationEditorPreviewReviews = ({
  reviews,
  activeSection,
  activeReviewsSection,
  onSectionChange,
  onReviewsSectionChange,
}: AccommodationEditorPreviewReviewsProps) => {
  const reviewsTitle = useWatch<AccommodationUpdateFormValues, "reviewsTitle">({
    name: "reviewsTitle",
  });

  const reviewsDescription = useWatch<
    AccommodationUpdateFormValues,
    "reviewsDescription"
  >({
    name: "reviewsDescription",
  });

  const handleClick = useAdminEditorRegionClick({
    section: "reviews",
    isRegion: isAccommodationReviewsEditorSection,
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
        <AccommodationReviews
          reviews={reviews}
          title={reviewsTitle}
          description={reviewsDescription}
          activeEditorRegion={
            activeSection === "reviews" ? activeReviewsSection : undefined
          }
          editorPreview
        />
      </div>
    </AdminEditorSection>
  );
};
