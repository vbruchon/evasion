import { Quote, Star } from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { AccommodationReviewData } from "@/lib/accommodations/reviews/accommodation-review.types";

type AccommodationReviewCardProps = {
  review: AccommodationReviewData;
};

const formatReviewDate = (date: Date) =>
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

export const AccommodationReviewCard = ({
  review,
}: AccommodationReviewCardProps) => (
  <Card className="flex h-full min-h-72 w-full flex-col gap-0 border-border/60 bg-card/70 py-0 transition-[border-color,background-color,box-shadow] duration-300 hover:border-primary/30 hover:bg-card/85 hover:shadow-[0_16px_45px_-30px_rgba(184,134,55,0.35)]">
    <CardContent className="p-6 sm:p-7">
      <Quote className="size-5 text-primary/70" strokeWidth={1.5} />

      <p className="mt-4 line-clamp-5 text-sm leading-7 text-foreground/85">
        {review.comment}
      </p>

      <div
        className="mt-5 flex items-center gap-1 text-primary"
        aria-label={`${review.rating} étoiles sur 5`}
      >
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            className="size-3.5"
            fill={index < review.rating ? "currentColor" : "none"}
            strokeWidth={1.5}
          />
        ))}
      </div>
    </CardContent>

    <CardFooter className="mx-6 mt-auto flex items-center gap-3 border-t border-border/50 px-0 py-5 sm:mx-7">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/6 font-heading text-sm text-primary">
        {getAuthorInitials(review.authorName)}
      </div>

      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-foreground">
          {review.authorName}
        </p>

        <p className="mt-0.5 text-xs capitalize text-muted-foreground">
          {formatReviewDate(review.reviewedAt)}
        </p>
      </div>
    </CardFooter>
  </Card>
);
