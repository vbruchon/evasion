import Link from "next/link";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

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

  variant?: "default" | "showcase" | "archive";
};

const formatReviewDate = (date: Date | string) =>
  new Intl.DateTimeFormat("fr-FR", {
    month: "long",
    year: "numeric",
  }).format(new Date(date));

const getAuthorInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

export const ReviewCard = ({
  review,
  accommodation,
  variant = "default",
}: ReviewCardProps) => (
  <Card
    className={cn(
      "relative flex h-full w-full flex-col gap-0 overflow-hidden border-border/60 py-0 transition-all duration-500",

      variant === "default" &&
        "min-h-72 bg-card/70 hover:border-primary/30 hover:bg-card/85",

      variant === "showcase" &&
        "min-h-80 border-border/45 bg-[linear-gradient(145deg,rgba(255,255,255,0.025),rgba(255,255,255,0.005))] hover:-translate-y-1 hover:border-primary/35",

      variant === "archive" &&
        "min-h-72 border-border/45 bg-card/35 hover:border-primary/30 hover:bg-card/50",
    )}
  >
    <CardContent className="flex flex-1 flex-col p-6 sm:p-7">
      <div
        className="flex items-center gap-1 text-primary"
        aria-label={`${review.rating} étoiles sur 5`}
      >
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            className="size-3.5"
            fill={index < review.rating ? "currentColor" : "none"}
            strokeWidth={1.4}
          />
        ))}
      </div>

      <p
        className={cn(
          "text-foreground/85",
          variant === "showcase"
            ? "mt-5 line-clamp-6 text-[0.95rem] leading-7"
            : "mt-5 line-clamp-5 text-sm leading-7",
        )}
      >
        “{review.comment}”
      </p>
    </CardContent>

    <CardFooter className="mx-6 mt-auto flex items-center gap-3 border-t border-border/50 px-0 py-5 sm:mx-7">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/6 font-heading text-sm text-primary">
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
