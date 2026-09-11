"use client";

import type { AccommodationReviewsEditorSection } from "@/lib/admin/accommodation/editor-sections";
import type { AccommodationUpdateData } from "@/lib/admin/accommodation/get-accommodation-for-update";
import { AccommodationReviewsContentEditor } from "./reviews/accommodation-reviews-content-editor";
import { AccommodationReviewsManagementEditor } from "./reviews/accommodation-reviews-management-editor";

type AccommodationReviewsEditorProps = {
  section: AccommodationReviewsEditorSection;
  accommodationId: string;
  reviews: AccommodationUpdateData["reviews"];
  lastReviewsImportAt: AccommodationUpdateData["lastReviewsImportAt"];
};

export const AccommodationReviewsEditor = ({
  section,
  accommodationId,
  reviews,
  lastReviewsImportAt,
}: AccommodationReviewsEditorProps) => {
  if (section === "content") {
    return <AccommodationReviewsContentEditor />;
  }

  return (
    <AccommodationReviewsManagementEditor
      accommodationId={accommodationId}
      reviews={reviews}
      lastReviewsImportAt={lastReviewsImportAt}
    />
  );
};
