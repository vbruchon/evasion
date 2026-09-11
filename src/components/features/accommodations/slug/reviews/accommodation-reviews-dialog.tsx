"use client";

import { Star } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { AccommodationReviewData } from "@/lib/accommodations/reviews/accommodation-review.types";

type AccommodationReviewsDialogProps = {
  reviews: AccommodationReviewData[];
  averageRating: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
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

export const AccommodationReviewsDialog = ({
  reviews,
  averageRating,
  open,
  onOpenChange,
}: AccommodationReviewsDialogProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent
      className="
        flex max-h-[90vh] w-[calc(100vw-2rem)] max-w-none
        flex-col gap-0 overflow-hidden p-0
        sm:w-[min(92vw,1080px)] sm:max-w-none
      "
    >
      <DialogHeader className="relative shrink-0 border-b border-border/60 px-7 py-6 text-left sm:px-9 lg:px-10">
        <DialogTitle className="sr-only">Avis voyageurs</DialogTitle>

        <DialogDescription className="sr-only">
          Consultez les {reviews.length} avis voyageurs associés à ce logement.
        </DialogDescription>

        <div className="flex items-center gap-7 sm:gap-8">
          <div className="flex shrink-0 items-center">
            <p className="font-heading text-6xl leading-none tracking-[-0.06em] text-foreground sm:text-7xl">
              {averageRating.toFixed(1).replace(".", ",")}
            </p>
          </div>

          <div className="h-15 w-px shrink-0 bg-primary/25" />

          <div className="pt-0.5">
            <div
              className="flex items-center gap-1 text-primary"
              aria-hidden="true"
            >
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  className="size-3.5"
                  fill="currentColor"
                  strokeWidth={1.5}
                />
              ))}
            </div>

            <p className="mt-2.5 font-heading text-2xl leading-none tracking-tight text-foreground sm:text-3xl">
              Leurs moments, leurs mots
            </p>

            <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {reviews.length} expériences partagées
            </p>
          </div>
        </div>
      </DialogHeader>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="w-full px-6 sm:px-8">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="border-b border-border/60 py-6 last:border-b-0"
            >
              <header className="flex items-start justify-between gap-6">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary/8 font-heading text-sm text-primary">
                    {getAuthorInitials(review.authorName)}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {review.authorName}
                    </p>

                    <p className="mt-1 text-xs capitalize text-muted-foreground">
                      {formatReviewDate(review.reviewedAt)}
                    </p>
                  </div>
                </div>

                <div
                  className="flex shrink-0 items-center gap-1 text-primary"
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
              </header>

              <p className="mt-5 max-w-4xl whitespace-pre-line text-sm leading-7 text-foreground/85 sm:text-[15px]">
                {review.comment}
              </p>
            </article>
          ))}
        </div>
      </div>
    </DialogContent>
  </Dialog>
);
