"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { AccommodationEditorRegion } from "@/components/features/accommodations/admin/editor/accommodation-editor-region";
import { Button } from "@/components/ui/button";
import { useAccommodationReviewsCarousel } from "@/hooks/use-accommodation-reviews-carousel";
import type { AccommodationReviewData } from "@/lib/accommodations/reviews/accommodation-review.types";
import type { AccommodationReviewsEditorSection } from "@/lib/admin/accommodation/editor-sections";

import { AccommodationReviewCard } from "./accommodation-review-card";

type AccommodationReviewsCarouselProps = {
  reviews: AccommodationReviewData[];
  editorPreview: boolean;
  activeEditorRegion?: AccommodationReviewsEditorSection;
};

const MAX_FEATURED_REVIEWS = 12;

export const AccommodationReviewsCarousel = ({
  reviews,
  editorPreview,
  activeEditorRegion,
}: AccommodationReviewsCarouselProps) => {
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

  return (
    <AccommodationEditorRegion
      region="management"
      activeRegion={activeEditorRegion}
      className="-m-3 mt-9 p-3"
    >
      {featuredReviews.length > 0 ? (
        <>
          <div className="relative">
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
        <div className="border border-dashed border-border/60 px-6 py-10 text-center">
          <p className="text-sm font-medium">Aucun avis importé</p>

          <p className="mt-2 text-sm text-muted-foreground">
            Importez les avis du logement depuis le panneau d’édition.
          </p>
        </div>
      )}
    </AccommodationEditorRegion>
  );
};
