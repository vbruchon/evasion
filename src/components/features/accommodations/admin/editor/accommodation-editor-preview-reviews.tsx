import { AccommodationReviews } from "@/components/features/accommodations/slug/reviews/accommodation-reviews";
import type { AccommodationUpdateData } from "@/lib/admin/accommodation/get-accommodation-for-update";
import type { AccommodationEditorSection } from "@/lib/admin/accommodation/editor-sections";

type AccommodationEditorPreviewReviewsProps = {
  reviews: AccommodationUpdateData["reviews"];
  onSectionChange: (section: AccommodationEditorSection) => void;
};

export const AccommodationEditorPreviewReviews = ({
  reviews,
  onSectionChange,
}: AccommodationEditorPreviewReviewsProps) => (
  <div
    className="cursor-pointer ring-inset transition-shadow hover:ring-1 hover:ring-primary/40"
    onClick={() => onSectionChange("reviews")}
  >
    <div className="pointer-events-none">
      <AccommodationReviews reviews={reviews} editorPreview />
    </div>
  </div>
);
