"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAccommodationReviewsCarousel } from "@/hooks/use-accommodation-reviews-carousel";
import type { AccommodationReviewData } from "@/lib/accommodations/reviews/accommodation-review.types";

import { AccommodationReviewCard } from "./accommodation-review-card";
import { AccommodationReviewsDialog } from "./accommodation-reviews-dialog";

type AccommodationReviewsProps = {
  reviews: AccommodationReviewData[];
  editorPreview?: boolean;
};

const MAX_FEATURED_REVIEWS = 12;

export const AccommodationReviews = ({
  reviews,
  editorPreview = false,
}: AccommodationReviewsProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const featuredReviews = reviews.slice(0, MAX_FEATURED_REVIEWS);

  const {
    viewportRef,
    canScrollPrevious,
    canScrollNext,
    pageCount,
    activePageIndex,
    updateScrollState,
    scroll,
  } = useAccommodationReviewsCarousel(featuredReviews.length);

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((total, review) => total + review.rating, 0) /
        reviews.length
      : null;

  if (reviews.length === 0 && !editorPreview) {
    return null;
  }

  return (
    <>
      <section
        id="avis"
        className="scroll-mt-20 border-b border-border/60 px-6 py-16 md:px-12 lg:px-20 lg:py-20 xl:px-24"
      >
        <div className="mx-auto max-w-420">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="section-eyebrow text-primary/85">Avis voyageurs</p>

              <h2 className="mt-4 max-w-3xl font-heading text-4xl leading-[1.03] tracking-[-0.035em] md:text-5xl xl:text-[3.4rem]">
                Leurs moments, leurs mots
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">
                Découvrez les impressions laissées par les voyageurs après leur
                séjour.
              </p>
            </div>

            {averageRating !== null ? (
              <div className="flex shrink-0 flex-col items-start gap-5 sm:flex-row sm:items-end">
                <div className="flex items-center gap-4 border-l border-primary/25 pl-5">
                  <Star
                    className="size-4 text-primary"
                    fill="currentColor"
                    strokeWidth={1.5}
                  />

                  <div>
                    <p className="font-heading text-4xl leading-none tracking-tighter">
                      {averageRating.toFixed(1).replace(".", ",")}
                    </p>

                    <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                      {reviews.length} avis
                    </p>
                  </div>
                </div>

                {!editorPreview ? (
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => setDialogOpen(true)}
                  >
                    Voir les {reviews.length} avis
                  </Button>
                ) : null}
              </div>
            ) : null}
          </div>

          {featuredReviews.length > 0 ? (
            <>
              <div className="relative mt-12">
                {!editorPreview ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    aria-label="Avis précédents"
                    disabled={!canScrollPrevious}
                    onClick={() => scroll("previous")}
                    className="absolute -left-5 top-1/2 z-10 size-10 -translate-y-1/2 rounded-full border-border/70 bg-background/95 text-muted-foreground shadow-lg backdrop-blur-sm hover:border-primary/50 hover:bg-primary hover:text-primary-foreground disabled:pointer-events-none disabled:opacity-0 xl:-left-14"
                  >
                    <ChevronLeft className="size-4" />
                  </Button>
                ) : null}

                <div
                  ref={viewportRef}
                  onScroll={updateScrollState}
                  className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth scrollbar-none [&::-webkit-scrollbar]:hidden"
                >
                  {featuredReviews.map((review) => (
                    <div
                      key={review.id}
                      className="shrink-0 snap-start basis-[88%] sm:basis-[calc(50%-0.5rem)] xl:basis-[calc(33.333%-0.67rem)]"
                    >
                      <AccommodationReviewCard review={review} />
                    </div>
                  ))}
                </div>

                {!editorPreview ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    aria-label="Avis suivants"
                    disabled={!canScrollNext}
                    onClick={() => scroll("next")}
                    className="absolute -right-5 top-1/2 z-10 size-10 -translate-y-1/2 rounded-full border-border/70 bg-background/95 text-muted-foreground shadow-lg backdrop-blur-sm hover:border-primary/50 hover:bg-primary hover:text-primary-foreground disabled:pointer-events-none disabled:opacity-0 xl:-right-14"
                  >
                    <ChevronRight className="size-4" />
                  </Button>
                ) : null}
              </div>

              {!editorPreview && pageCount > 1 ? (
                <div className="mt-7 flex justify-center gap-1.5">
                  {Array.from({
                    length: pageCount,
                  }).map((_, index) => (
                    <span
                      key={index}
                      className={
                        index === activePageIndex
                          ? "h-1 w-7 rounded-full bg-primary transition-[width,background-color] duration-300"
                          : "h-1 w-1 rounded-full bg-border transition-[width,background-color] duration-300"
                      }
                    />
                  ))}
                </div>
              ) : null}
            </>
          ) : (
            <div className="mt-12 border border-dashed border-border/60 px-6 py-10 text-center">
              <p className="text-sm font-medium">Aucun avis importé</p>

              <p className="mt-2 text-sm text-muted-foreground">
                Importez les avis du logement depuis le panneau d’édition.
              </p>
            </div>
          )}
        </div>
      </section>

      {!editorPreview && averageRating !== null ? (
        <AccommodationReviewsDialog
          reviews={reviews}
          averageRating={averageRating}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      ) : null}
    </>
  );
};
