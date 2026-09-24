import type { ReviewsAccommodationFilter } from "@/components/features/reviews/all-reviews-filter";
import type { ReviewsPageReviewsEditorSection } from "@/lib/admin/reviews/editor/editor-sections";
import type {
  ReviewsPageReview,
  ReviewsPageReviewsResult,
} from "@/lib/reviews/reviews-page.types";
import { AdminEditorRegion } from "@/components/layout/admin/editor/admin-editor-region";
import { AllReviewsSection } from "@/components/features/reviews/all-reviews-section";
import { RecentReviewsSection } from "@/components/features/reviews/recent-reviews-section";
import { SiteContainer } from "@/components/layout/site-container";
import { SiteSection } from "@/components/layout/site-section";

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
  <SiteSection gutters spacing="large" className="relative overflow-hidden">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(184,134,55,0.055),transparent_30%)]" />

    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_75%,rgba(184,134,55,0.025),transparent_28%)]" />

    <SiteContainer className="relative">
      <AdminEditorRegion
        region="recent"
        activeRegion={activeEditorRegion}
        className={editorPreview ? "[&_a]:pointer-events-none" : undefined}
      >
        <RecentReviewsSection
          eyebrow={recentReviewsEyebrow}
          title={recentReviewsTitle}
          description={recentReviewsDescription}
          reviews={recentReviews}
        />
      </AdminEditorRegion>

      <AdminEditorRegion region="all" activeRegion={activeEditorRegion}>
        <AllReviewsSection
          title={allReviewsTitle}
          description={allReviewsDescription}
          initialResult={initialReviews}
          accommodations={accommodations}
          editorPreview={editorPreview}
        />
      </AdminEditorRegion>
    </SiteContainer>
  </SiteSection>
);
