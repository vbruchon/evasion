import { ReviewCard } from "@/components/features/reviews/shared/review-card";
import type { ReviewWithAccommodation } from "@/lib/reviews/review.types";

type HomePageReviewsListProps = {
  reviews: ReviewWithAccommodation[];
};

export const HomePageReviewsList = ({ reviews }: HomePageReviewsListProps) => (
  <div className="grid gap-4 sm:flex sm:snap-x sm:snap-mandatory sm:overflow-x-auto sm:scroll-smooth sm:scroll-pl-1 sm:pl-1 sm:pr-10 sm:py-px sm:scrollbar-none xl:grid xl:grid-cols-3 xl:overflow-visible xl:p-0">
    {reviews.map((review, index) => (
      <div
        key={review.id}
        className={`min-w-0 sm:w-[46%] sm:shrink-0 sm:snap-start xl:w-auto ${
          index === 2 ? "hidden sm:block" : ""
        }`}
      >
        <ReviewCard
          review={review}
          accommodation={review.accommodation}
          variant="home"
        />
      </div>
    ))}
  </div>
);
