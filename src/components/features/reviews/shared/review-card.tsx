import Link from "next/link";

import { ReviewStars } from "@/components/features/reviews/shared/review-stars";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  formatReviewDate,
  getAuthorInitials,
} from "@/lib/reviews/review-formatters";
import { cn } from "@/lib/utils";

type ReviewCardProps = {
  review: {
    authorName: string;
    rating: number;
    comment: string;
    reviewedAt: Date | string;
  };

  accommodation?: {
    name: string;
    slug: string;
  };

  variant?: "default" | "showcase" | "archive" | "home";
};

export const ReviewCard = ({
  review,
  accommodation,
  variant = "default",
}: ReviewCardProps) => {
  const isHome = variant === "home";

  return (
    <Card
      className={cn(
        "relative flex h-full w-full flex-col gap-0 overflow-hidden border-border/60 py-0 transition-all duration-500",

        variant === "default" &&
          "min-h-72 bg-card/70 hover:border-primary/30 hover:bg-card/85",

        variant === "showcase" &&
          "min-h-80 border-border/45 bg-[linear-gradient(145deg,rgba(255,255,255,0.025),rgba(255,255,255,0.005))] hover:-translate-y-1 hover:border-primary/35",

        variant === "archive" &&
          "min-h-72 border-border/45 bg-card/35 hover:border-primary/30 hover:bg-card/50",

        variant === "home" &&
          "min-h-70 border-border/40 bg-card/20 hover:border-primary/30",
      )}
    >
      <CardContent
        className={cn("flex flex-1 flex-col", isHome ? "p-6" : "p-6 sm:p-7")}
      >
        <ReviewStars
          rating={review.rating}
          starClassName={isHome ? "size-3.5" : undefined}
        />

        <p
          className={cn(
            "text-foreground/85",

            variant === "showcase" &&
              "mt-5 line-clamp-6 text-[0.95rem] leading-7",

            variant === "home" && "mt-4 line-clamp-4 text-sm leading-6",

            (variant === "default" || variant === "archive") &&
              "mt-5 line-clamp-5 text-sm leading-7",
          )}
        >
          “{review.comment}”
        </p>
      </CardContent>

      <CardFooter
        className={cn(
          "mt-auto flex items-center gap-3 border-t border-border/50 px-0",
          isHome ? "mx-6 py-5" : "mx-6 py-5 sm:mx-7",
        )}
      >
        <div
          className={cn(
            "flex shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/6 font-heading text-primary",
            isHome ? "size-9 text-xs" : "size-10 text-sm",
          )}
        >
          {getAuthorInitials(review.authorName)}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground">
            {review.authorName}
          </p>

          <p className="mt-0.5 text-xs capitalize text-muted-foreground">
            {formatReviewDate(review.reviewedAt)}
          </p>

          {accommodation ? (
            <Link
              href={`/logements/${accommodation.slug}`}
              className="mt-1 block truncate text-[10px] font-medium uppercase tracking-[0.14em] text-primary/75 transition-colors hover:text-primary sm:hidden"
            >
              {accommodation.name}
            </Link>
          ) : null}
        </div>

        {accommodation ? (
          <Link
            href={`/logements/${accommodation.slug}`}
            className="hidden max-w-32 truncate text-[10px] font-medium uppercase tracking-[0.14em] text-primary/75 transition-colors hover:text-primary sm:block"
          >
            {accommodation.name}
          </Link>
        ) : null}
      </CardFooter>
    </Card>
  );
};
