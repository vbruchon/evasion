"use client";

import { AccommodationReviewsContentEditor } from "./accommodation-reviews-content-editor";
import { AccommodationReviewsManagementEditor } from "./accommodation-reviews-management-editor";

import type { AccommodationReviewsEditorSection } from "@/lib/admin/accommodation/editor/editor-sections";
import type { AccommodationUpdateData } from "@/lib/admin/accommodation/queries/get-accommodation-for-update";

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
