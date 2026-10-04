import * as motion from "motion/react-client";

import { ReviewCard } from "@/components/features/reviews/shared/review-card";
import type { ReviewWithAccommodation } from "@/lib/reviews/review.types";

type HomePageReviewsListProps = {
  reviews: ReviewWithAccommodation[];
  animated?: boolean;
};

export const HomePageReviewsList = ({
  reviews,
  animated = false,
}: HomePageReviewsListProps) => (
  <div className="grid gap-4 sm:flex sm:snap-x sm:snap-mandatory sm:overflow-x-auto sm:scroll-smooth sm:scroll-pl-1 sm:pl-1 sm:pr-10 sm:py-px sm:scrollbar-none xl:grid xl:grid-cols-3 xl:overflow-visible xl:p-0">
    {reviews.map((review, index) => (
      <motion.div
        key={review.id}
        initial={animated ? { opacity: 0, y: 18 } : false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{
          once: true,
          amount: 0.15,
        }}
        transition={{
          duration: 0.85,
          delay: animated ? index * 0.09 : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`min-w-0 sm:w-[46%] sm:shrink-0 sm:snap-start xl:w-auto ${
          index === 2 ? "hidden sm:block" : ""
        }`}
      >
        <ReviewCard
          review={review}
          accommodation={review.accommodation}
          variant="home"
        />
      </motion.div>
    ))}
  </div>
);
