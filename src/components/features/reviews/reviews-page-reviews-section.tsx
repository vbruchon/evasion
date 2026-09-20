import { AdminEditorRegion } from "@/components/layout/admin/editor/admin-editor-region";
import type { ReviewsAccommodationFilter } from "@/components/features/reviews/all-reviews-filter";
import { AllReviewsSection } from "@/components/features/reviews/all-reviews-section";
import { RecentReviewsSection } from "@/components/features/reviews/recent-reviews-section";
import type { ReviewsPageReviewsEditorSection } from "@/lib/admin/reviews/editor/editor-sections";
import type {
  ReviewsPageReview,
  ReviewsPageReviewsResult,
} from "@/lib/reviews/reviews-page.types";
import { cn } from "@/lib/utils";

type ReviewsPageReviewsSectionProps = {
  recentReviewsEyebrow: string;
  recentReviewsTitle: string;
  recentReviewsDescription: string;
  recentReviews: ReviewsPageReview[];

  allReviewsTitle: string;
  allReviewsDescription: string;
  initialReviews: ReviewsPageReviewsResult;
  accommodations: ReviewsAccommodationFilter[];

  activeEditorRegion?: ReviewsPageReviewsEditorSection;
  editorPreview?: boolean;
};

export const ReviewsPageReviewsSection = ({
  recentReviewsEyebrow,
  recentReviewsTitle,
  recentReviewsDescription,
  recentReviews,
  allReviewsTitle,
  allReviewsDescription,
  initialReviews,
  accommodations,
  activeEditorRegion,
  editorPreview = false,
}: ReviewsPageReviewsSectionProps) => (
  <section className="relative overflow-hidden border-b border-border/60 px-6 py-20 md:px-12 lg:px-20 lg:py-28 xl:px-24">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(184,134,55,0.055),transparent_30%)]" />

    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_75%,rgba(184,134,55,0.025),transparent_28%)]" />

    <div className="relative mx-auto max-w-420">
      <AdminEditorRegion
        region="recent"
        activeRegion={activeEditorRegion}
        className={cn(
          editorPreview && "-m-3 p-3",
          editorPreview && "[&_a]:pointer-events-none",
        )}
      >
        <RecentReviewsSection
          eyebrow={recentReviewsEyebrow}
          title={recentReviewsTitle}
          description={recentReviewsDescription}
          reviews={recentReviews}
        />
      </AdminEditorRegion>

      <AdminEditorRegion
        region="all"
        activeRegion={activeEditorRegion}
        className={cn(editorPreview && "-m-3 p-3")}
      >
        <AllReviewsSection
          title={allReviewsTitle}
          description={allReviewsDescription}
          initialResult={initialReviews}
          accommodations={accommodations}
          editorPreview={editorPreview}
        />
      </AdminEditorRegion>
    </div>
  </section>
);
