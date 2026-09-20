"use client";

import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useReviewsPageList } from "@/hooks/reviews/use-reviews-page-list";
import type { ReviewsPageReviewsResult } from "@/lib/reviews/reviews-page.types";
import { cn } from "@/lib/utils";

import {
  AllReviewsFilter,
  type ReviewsAccommodationFilter,
} from "./all-reviews-filter";
import { ReviewCard } from "./shared/review-card";

type AllReviewsSectionProps = {
  title: string;
  description: string;
  initialResult: ReviewsPageReviewsResult;
  accommodations: ReviewsAccommodationFilter[];
  editorPreview?: boolean;
};

const REVIEWS_PER_PAGE = 6;

export const AllReviewsSection = ({
  title,
  description,
  initialResult,
  accommodations,
  editorPreview = false,
}: AllReviewsSectionProps) => {
  const {
    reviews,
    hasMore,
    selectedAccommodation,
    isPending,
    handleAccommodationChange,
    handleLoadMore,
  } = useReviewsPageList({
    initialResult,
    reviewsPerPage: REVIEWS_PER_PAGE,
  });

  return (
    <div
      className={cn(
        "mt-24 border-t border-border/40 pt-20 lg:mt-28 lg:pt-24",
        editorPreview &&
          "[&_a]:pointer-events-none [&_button]:pointer-events-none",
      )}
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="font-heading text-3xl leading-[1.02] tracking-[-0.035em] md:text-4xl">
            {title}
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
            {description}
          </p>
        </div>

        <AllReviewsFilter
          accommodations={accommodations}
          value={selectedAccommodation}
          disabled={isPending}
          onValueChange={handleAccommodationChange}
        />
      </div>

      {reviews.length > 0 ? (
        <>
          <div
            className={`mt-10 grid gap-5 transition-opacity duration-200 md:grid-cols-2 xl:grid-cols-3 ${
              isPending ? "opacity-55" : "opacity-100"
            }`}
          >
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                accommodation={review.accommodation}
                variant="archive"
              />
            ))}
          </div>

          {hasMore ? (
            <div className="mt-12 flex justify-center">
              <Button
                type="button"
                variant="outline"
                size="lg"
                disabled={isPending}
                onClick={handleLoadMore}
                className="hover:border-primary/25 hover:bg-transparent hover:text-primary dark:hover:bg-transparent"
              >
                {isPending ? "Chargement..." : "Afficher plus d’avis"}

                {!isPending ? <ChevronDown className="ml-2 size-3.5" /> : null}
              </Button>
            </div>
          ) : null}
        </>
      ) : (
        <div className="mt-10 border border-border/60 px-6 py-14 text-center">
          <p className="font-heading text-2xl text-foreground">
            Aucun avis pour ce logement
          </p>

          <p className="mt-3 text-sm text-muted-foreground">
            Les prochains avis apparaîtront ici.
          </p>
        </div>
      )}
    </div>
  );
};
