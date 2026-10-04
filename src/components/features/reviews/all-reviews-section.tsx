"use client";

import { ChevronDown, Loader2 } from "lucide-react";
import { motion } from "motion/react";

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
  animated?: boolean;
};

const REVIEWS_PER_PAGE = 6;

const revealTransition = {
  duration: 0.85,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const AllReviewsSection = ({
  title,
  description,
  initialResult,
  accommodations,
  editorPreview = false,
  animated = false,
}: AllReviewsSectionProps) => {
  const {
    reviews,
    hasMore,
    selectedAccommodation,
    isPending,
    isFiltering,
    isLoadingMore,
    handleAccommodationChange,
    handleLoadMore,
  } = useReviewsPageList({
    initialResult,
    reviewsPerPage: REVIEWS_PER_PAGE,
  });

  const shouldAnimate = animated && !editorPreview;

  return (
    <div
      className={cn(
        "mt-24 border-t border-border/40 pt-20 lg:mt-28 lg:pt-24",
        editorPreview &&
          "[&_a]:pointer-events-none [&_button]:pointer-events-none",
      )}
    >
      <motion.div
        initial={shouldAnimate ? { opacity: 0, y: 14 } : false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{
          once: true,
          amount: 0.35,
        }}
        transition={revealTransition}
        className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
      >
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
          loading={isFiltering}
          onValueChange={handleAccommodationChange}
        />
      </motion.div>

      {reviews.length > 0 ? (
        <>
          <div
            aria-busy={isFiltering}
            className={cn(
              "mt-10 grid gap-5 transition-opacity duration-200 md:grid-cols-2 xl:grid-cols-3",
              isFiltering ? "opacity-55" : "opacity-100",
            )}
          >
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={shouldAnimate ? { opacity: 0, y: 16 } : false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  ...revealTransition,
                  delay: (index % 3) * 0.08,
                }}
              >
                <ReviewCard
                  review={review}
                  accommodation={review.accommodation}
                  variant="archive"
                />
              </motion.div>
            ))}
          </div>

          {hasMore ? (
            <motion.div
              initial={shouldAnimate ? { opacity: 0, y: 8 } : false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
                amount: 0.5,
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-12 flex justify-center"
            >
              <Button
                type="button"
                variant="outline"
                size="lg"
                disabled={isPending}
                aria-busy={isLoadingMore}
                onClick={handleLoadMore}
                className="hover:border-primary/25 hover:bg-transparent hover:text-primary dark:hover:bg-transparent"
              >
                {isLoadingMore ? (
                  <>
                    <Loader2 className="size-3.5 animate-spin" />
                    Chargement...
                  </>
                ) : (
                  <>
                    Afficher plus d’avis
                    <ChevronDown className="ml-2 size-3.5" />
                  </>
                )}
              </Button>
            </motion.div>
          ) : null}
        </>
      ) : (
        <motion.div
          initial={shouldAnimate ? { opacity: 0, y: 12 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={revealTransition}
          className="mt-10 border border-border/60 px-6 py-14 text-center"
        >
          <p className="font-heading text-2xl text-foreground">
            Aucun avis pour ce logement
          </p>

          <p className="mt-3 text-sm text-muted-foreground">
            Les prochains avis apparaîtront ici.
          </p>
        </motion.div>
      )}
    </div>
  );
};
