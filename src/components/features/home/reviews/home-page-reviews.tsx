import { SiteSection } from "@/components/layout/site-section";
import type { ReviewWithAccommodation } from "@/lib/reviews/review.types";

import { HomePageReviewsList } from "./home-page-reviews-list";
import { HomePageReviewsSummary } from "./home-page-reviews-summary";

type HomePageReviewsProps = {
  eyebrow: string;
  averageRating: number;
  totalReviews: number;
  reviews: ReviewWithAccommodation[];
  activeEditorRegion?: "content";
  animated?: boolean;
};

export const HomePageReviews = ({
  eyebrow,
  averageRating,
  totalReviews,
  reviews,
  activeEditorRegion,
  animated = false,
}: HomePageReviewsProps) => {
  if (totalReviews === 0 || reviews.length === 0) {
    return null;
  }

  return (
    <SiteSection
      bordered={false}
      className="border-y border-border/40 px-6 py-16 sm:px-12 lg:px-20 lg:py-24 xl:px-24 xl:py-28"
    >
      <div className="mx-auto grid max-w-[1600px] gap-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
        <HomePageReviewsSummary
          eyebrow={eyebrow}
          averageRating={averageRating}
          totalReviews={totalReviews}
          activeEditorRegion={activeEditorRegion}
          animated={animated}
        />

        <HomePageReviewsList reviews={reviews} animated={animated} />
      </div>
    </SiteSection>
  );
};
