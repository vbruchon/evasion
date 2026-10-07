import { ReviewsPageCta } from "@/components/features/reviews/reviews-page-cta";
import { ReviewsPageHero } from "@/components/features/reviews/reviews-page-hero";
import { ReviewsPageReviewsSection } from "@/components/features/reviews/reviews-page-reviews-section";
import { getRecentReviewCandidates } from "@/lib/reviews/queries/get-recent-review-candidates";
import { getReviewsPageContent } from "@/lib/reviews/queries/get-reviews-page-content";
import {
  getReviewsPageAccommodationFilters,
  getReviewsPageReviews,
} from "@/lib/reviews/queries/get-reviews-page-reviews";
import { getReviewsSummary } from "@/lib/reviews/queries/get-reviews-summary";
import { selectRecentDiverseReviews } from "@/lib/reviews/select-recent-diverse-reviews";
import { createPageMetadata } from "@/lib/seo/create-page-metadata";

export const metadata = createPageMetadata({
  title: "Avis voyageurs",
  description:
    "Découvrez les avis laissés par les voyageurs après leur séjour dans les hébergements Évasion et leurs expériences à deux.",
  path: "/avis",
});

export const dynamic = "force-dynamic";

const RECENT_REVIEWS_COUNT = 4;
const INITIAL_REVIEWS_COUNT = 6;

export default async function ReviewsPage() {
  const [content, summary, recentCandidates, initialReviews, accommodations] =
    await Promise.all([
      getReviewsPageContent(),
      getReviewsSummary(),
      getRecentReviewCandidates(),
      getReviewsPageReviews({
        take: INITIAL_REVIEWS_COUNT,
      }),
      getReviewsPageAccommodationFilters(),
    ]);

  const recentReviews = selectRecentDiverseReviews(
    recentCandidates,
    RECENT_REVIEWS_COUNT,
  );

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
        animated
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
        animated
      />

      <ReviewsPageCta
        eyebrow={content.ctaEyebrow}
        title={content.ctaTitle}
        description={content.ctaDescription}
        handwrittenPrefix={content.ctaHandwrittenPrefix}
        handwrittenHighlight={content.ctaHandwrittenHighlight}
        buttonLabel={content.ctaButtonLabel}
        imageUrl={content.ctaImageUrl}
        animated
      />
    </main>
  );
}
