"use client";

import type { MouseEvent } from "react";
import { useWatch } from "react-hook-form";

import type { AccommodationUpdateFormValues } from "~/app/admin/logements/schema";

import { AccommodationReviews } from "@/components/features/accommodations/slug/reviews/accommodation-reviews";
import type {
  AccommodationEditorSection,
  AccommodationReviewsEditorSection,
} from "@/lib/admin/accommodation/editor-sections";
import { isAccommodationReviewsEditorSection } from "@/lib/admin/accommodation/editor-sections";
import type { AccommodationUpdateData } from "@/lib/admin/accommodation/get-accommodation-for-update";

import { AccommodationEditorSection as EditorSection } from "./accommodation-editor-section";

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

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    const region = target.closest<HTMLElement>("[data-editor-region]");

    const regionId = region?.dataset.editorRegion;

    if (!regionId || !isAccommodationReviewsEditorSection(regionId)) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    onReviewsSectionChange(regionId);
    onSectionChange("reviews");
  };

  return (
    <EditorSection
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
    </EditorSection>
  );
};
