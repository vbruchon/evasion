import { getAccommodationCoverImage } from "@/lib/accommodations/accommodation-images";
import { getPublishedAccommodations } from "@/lib/accommodations/accommodations";
import { getHomePageContent } from "@/lib/home/queries/get-home-page-content";
import { getRecentReviewCandidates } from "@/lib/reviews/queries/get-recent-review-candidates";
import { getReviewsSummary } from "@/lib/reviews/queries/get-reviews-summary";
import { selectRecentDiverseReviews } from "@/lib/reviews/select-recent-diverse-reviews";

const HOME_RECENT_REVIEWS_COUNT = 3;

export const getHomePageAdminData = async () => {
  const [content, accommodations, summary, recentReviewCandidates] =
    await Promise.all([
      getHomePageContent(),
      getPublishedAccommodations(),
      getReviewsSummary(),
      getRecentReviewCandidates(),
    ]);

  const heroImages = accommodations.flatMap((accommodation) => {
    const image = getAccommodationCoverImage(accommodation.images);

    if (!image) {
      return [];
    }

    return [
      {
        src: image.url,
        alt: image.alt?.trim() || `${accommodation.name}, hébergement Évasion`,
      },
    ];
  });

  return {
    content,
    accommodations,
    heroImages,
    summary,
    recentReviews: selectRecentDiverseReviews(
      recentReviewCandidates,
      HOME_RECENT_REVIEWS_COUNT,
    ),
  };
};

export type HomePageAdminData = Awaited<
  ReturnType<typeof getHomePageAdminData>
>;
