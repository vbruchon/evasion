import { ReviewCard } from "@/components/features/reviews/shared/review-card";
import type { ReviewsPageReview } from "@/lib/reviews/reviews-page.types";

type RecentReviewsSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  reviews: ReviewsPageReview[];
};

export const RecentReviewsSection = ({
  eyebrow,
  title,
  description,
  reviews,
}: RecentReviewsSectionProps) => {
  if (reviews.length === 0) {
    return null;
  }

  return (
    <div>
      <div>
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
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {reviews.map((review, index) => (
          <div key={review.id} className="relative">
            <span className="absolute right-5 top-4 z-10 font-heading text-xs italic text-primary/50">
              0{index + 1}
            </span>

            <ReviewCard
              review={review}
              accommodation={review.accommodation}
              variant="showcase"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
