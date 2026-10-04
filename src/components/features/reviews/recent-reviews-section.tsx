import * as motion from "motion/react-client";

import { ReviewCard } from "@/components/features/reviews/shared/review-card";
import type { ReviewWithAccommodation } from "@/lib/reviews/review.types";

type RecentReviewsSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  reviews: ReviewWithAccommodation[];
  animated?: boolean;
};

const revealTransition = {
  duration: 0.85,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const RecentReviewsSection = ({
  eyebrow,
  title,
  description,
  reviews,
  animated = false,
}: RecentReviewsSectionProps) => {
  if (reviews.length === 0) {
    return null;
  }

  return (
    <div>
      <motion.div
        initial={animated ? { opacity: 0, y: 14 } : false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{
          once: true,
          amount: 0.35,
        }}
        transition={revealTransition}
      >
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-primary">
          {eyebrow}
        </p>

        <div className="mt-4 h-px w-10 bg-primary/70" />

        <h2 className="mt-6 max-w-3xl font-heading text-4xl leading-[1.02] tracking-[-0.035em] md:text-5xl">
          {title}
        </h2>

        <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">
          {description}
        </p>
      </motion.div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
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
              ...revealTransition,
              delay: index * 0.08,
            }}
            className="relative"
          >
            <span className="absolute right-5 top-4 z-10 font-heading text-xs italic text-primary/50">
              0{index + 1}
            </span>

            <ReviewCard
              review={review}
              accommodation={review.accommodation}
              variant="showcase"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
