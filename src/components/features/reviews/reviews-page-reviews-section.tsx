import type { ReviewsAccommodationFilter } from "@/components/features/reviews/all-reviews-filter";
import { AllReviewsSection } from "@/components/features/reviews/all-reviews-section";
import { RecentReviewsSection } from "@/components/features/reviews/recent-reviews-section";
import type {
  ReviewsPageReview,
  ReviewsPageReviewsResult,
} from "@/lib/reviews/reviews-page.types";

type ReviewsPageReviewsSectionProps = {
  recentReviewsEyebrow: string;
  recentReviewsTitle: string;
  recentReviewsDescription: string;
  recentReviews: ReviewsPageReview[];

  allReviewsTitle: string;
  allReviewsDescription: string;
  initialReviews: ReviewsPageReviewsResult;
  accommodations: ReviewsAccommodationFilter[];
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
}: ReviewsPageReviewsSectionProps) => (
  <section className="relative overflow-hidden border-b border-border/60 px-6 py-20 md:px-12 lg:px-20 lg:py-28 xl:px-24">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(184,134,55,0.055),transparent_30%)]" />

    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_75%,rgba(184,134,55,0.025),transparent_28%)]" />

    <div className="relative mx-auto max-w-420">
      <RecentReviewsSection
        eyebrow={recentReviewsEyebrow}
        title={recentReviewsTitle}
        description={recentReviewsDescription}
        reviews={recentReviews}
      />

      <AllReviewsSection
        title={allReviewsTitle}
        description={allReviewsDescription}
        initialResult={initialReviews}
        accommodations={accommodations}
      />
    </div>
  </section>
);
