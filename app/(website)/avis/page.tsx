import { ReviewsPageCta } from "@/components/features/reviews/reviews-page-cta";
import { ReviewsPageHero } from "@/components/features/reviews/reviews-page-hero";
import { ReviewsPageReviewsSection } from "@/components/features/reviews/reviews-page-reviews-section";
import { getReviewsPageContent } from "@/lib/reviews/queries/get-reviews-page-content";
import {
  getReviewsPageAccommodationFilters,
  getReviewsPageRecentReviews,
  getReviewsPageReviews,
} from "@/lib/reviews/queries/get-reviews-page-reviews";
import { getReviewsPageSummary } from "@/lib/reviews/queries/get-reviews-page-summary";
import { selectRandomReviews } from "@/lib/reviews/select-random-reviews";

export const dynamic = "force-dynamic";

const RECENT_REVIEWS_COUNT = 4;
const INITIAL_REVIEWS_COUNT = 6;

export default async function ReviewsPage() {
  const [content, summary, recentPool, initialReviews, accommodations] =
    await Promise.all([
      getReviewsPageContent(),
      getReviewsPageSummary(),
      getReviewsPageRecentReviews(),
      getReviewsPageReviews({
        take: INITIAL_REVIEWS_COUNT,
      }),
      getReviewsPageAccommodationFilters(),
    ]);

  const recentReviews = selectRandomReviews(recentPool, RECENT_REVIEWS_COUNT);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <ReviewsPageHero
        eyebrow={content.heroEyebrow}
        title={content.heroTitle}
        description={content.heroDescription}
        handwrittenFirstLine={content.heroHandwrittenFirstLine}
        handwrittenSecondLine={content.heroHandwrittenSecondLine}
        imageUrl={content.heroImageUrl}
        averageRating={summary.averageRating}
        totalReviews={summary.totalReviews}
      />

      <ReviewsPageReviewsSection
        recentReviewsEyebrow={content.recentReviewsEyebrow}
        recentReviewsTitle={content.recentReviewsTitle}
        recentReviewsDescription={content.recentReviewsDescription}
        recentReviews={recentReviews}
        allReviewsTitle={content.allReviewsTitle}
        allReviewsDescription={content.allReviewsDescription}
        initialReviews={initialReviews}
        accommodations={accommodations}
      />

      <ReviewsPageCta
        eyebrow={content.ctaEyebrow}
        title={content.ctaTitle}
        description={content.ctaDescription}
        handwrittenPrefix={content.ctaHandwrittenPrefix}
        handwrittenHighlight={content.ctaHandwrittenHighlight}
        buttonLabel={content.ctaButtonLabel}
        imageUrl={content.ctaImageUrl}
      />
    </main>
  );
}
