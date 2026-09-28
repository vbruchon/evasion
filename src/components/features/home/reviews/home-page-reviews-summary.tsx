import { ReviewStars } from "@/components/features/reviews/shared/review-stars";
import { PageLinkButton } from "@/components/layout/page-link-button";

type HomePageReviewsSummaryProps = {
  eyebrow: string;
  averageRating: number;
  totalReviews: number;
};

export const HomePageReviewsSummary = ({
  eyebrow,
  averageRating,
  totalReviews,
}: HomePageReviewsSummaryProps) => (
  <div className="text-center lg:text-left">
    <p className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-primary">
      {eyebrow}
    </p>

    <div className="mt-5 flex items-end justify-center gap-0.5 lg:justify-start">
      <span className="font-heading text-6xl leading-none text-primary">
        {averageRating.toFixed(1).replace(".", ",")}
      </span>

      <span className="pb-1 font-heading text-2xl text-primary">/5</span>
    </div>

    <ReviewStars
      rating={averageRating}
      className="mt-3 justify-center gap-1.5 lg:justify-start"
      starClassName="size-4"
    />

    <p className="mt-3 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-foreground/70">
      {totalReviews} avis partagés
    </p>

    <PageLinkButton
      href="/avis"
      variant="text"
      className="mx-auto mt-7 text-[0.65rem] lg:mx-0"
    >
      Lire tous les avis
    </PageLinkButton>
  </div>
);
