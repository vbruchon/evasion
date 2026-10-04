import { HomePageAccommodations } from "@/components/features/home/accommodations/home-page-accommodations";
import { HomePageEscape } from "@/components/features/home/escape/home-page-escape";
import { HomePageHero } from "@/components/features/home/hero/home-page-hero";
import { HomePageCta } from "@/components/features/home/home-page-cta";
import { HomePageReviews } from "@/components/features/home/reviews/home-page-reviews";
import { getAccommodationCoverImage } from "@/lib/accommodations/accommodation-images";
import { getPublishedAccommodations } from "@/lib/accommodations/accommodations";
import {
  HOME_HERO_FALLBACK_IMAGES,
  HOME_PAGE_DEFAULT_ESCAPE_IMAGE,
} from "@/lib/home/home-page-defaults";
import { getHomePageContent } from "@/lib/home/queries/get-home-page-content";
import { getRecentReviewCandidates } from "@/lib/reviews/queries/get-recent-review-candidates";
import { getReviewsSummary } from "@/lib/reviews/queries/get-reviews-summary";
import { selectRecentDiverseReviews } from "@/lib/reviews/select-recent-diverse-reviews";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [content, accommodations, reviewsSummary, recentReviewCandidates] =
    await Promise.all([
      getHomePageContent(),
      getPublishedAccommodations(),
      getReviewsSummary(),
      getRecentReviewCandidates(),
    ]);

  const recentReviews = selectRecentDiverseReviews(recentReviewCandidates, 3);
  const homeAccommodations = accommodations.slice(0, 6);

  const databaseHeroImages = accommodations.flatMap((homeAccommodations) => {
    const image = getAccommodationCoverImage(homeAccommodations.images);

    if (!image) {
      return [];
    }

    return [
      {
        src: image.url,
        alt:
          image.alt?.trim() ||
          `${homeAccommodations.name}, hébergement Évasion`,
      },
    ];
  });

  const heroImages =
    databaseHeroImages.length > 0
      ? databaseHeroImages
      : HOME_HERO_FALLBACK_IMAGES;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <HomePageHero
        eyebrow={content.heroEyebrow}
        title={content.heroTitle}
        description={content.heroDescription}
        buttonLabel={content.heroButtonLabel}
        images={heroImages}
        totalAccommodations={accommodations.length}
        animated
      />

      <HomePageAccommodations
        eyebrow={content.accommodationsEyebrow}
        title={content.accommodationsTitle}
        description={content.accommodationsDescription}
        accommodations={homeAccommodations}
        animated
      />

      <HomePageEscape
        eyebrow={content.escapeEyebrow}
        title={content.escapeTitle}
        description={content.escapeDescription}
        handwritten={content.escapeHandwritten}
        imageUrl={content.escapeImageUrl ?? HOME_PAGE_DEFAULT_ESCAPE_IMAGE}
        animated
      />

      <HomePageReviews
        eyebrow={content.reviewsEyebrow}
        averageRating={reviewsSummary.averageRating}
        totalReviews={reviewsSummary.totalReviews}
        reviews={recentReviews}
        animated
      />

      <HomePageCta
        eyebrow={content.ctaEyebrow}
        title={content.ctaTitle}
        description={content.ctaDescription}
        buttonLabel={content.ctaButtonLabel}
        imageUrl={content.ctaImageUrl}
        animated
      />
    </main>
  );
}
