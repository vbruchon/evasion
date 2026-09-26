"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { ContactAccommodationCard } from "@/components/features/contact/form/contact-accommodation-card";
import { FieldLabel } from "@/components/ui/field";
import type { ContactPageAccommodation } from "@/lib/contact/queries/get-contact-page-accommodations";
import { cn } from "@/lib/utils";

type ContactAccommodationCarouselProps = {
  accommodations: ContactPageAccommodation[];
  selectedId: string | null;
  preview?: boolean;
  onSelect: (id: string) => void;
};

export const ContactAccommodationCarousel = ({
  accommodations,
  selectedId,
  preview = false,
  onSelect,
}: ContactAccommodationCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);

  const updateScrollState = useCallback(() => {
    const element = scrollRef.current;

    if (!element) {
      return;
    }

    const maxScrollLeft = element.scrollWidth - element.clientWidth;
    const overflowing = maxScrollLeft > 1;

    setHasOverflow(overflowing);
    setCanScrollLeft(element.scrollLeft > 1);
    setCanScrollRight(overflowing && element.scrollLeft < maxScrollLeft - 1);
  }, []);

  useEffect(() => {
    const element = scrollRef.current;

    if (!element) {
      return;
    }

    const frame = requestAnimationFrame(updateScrollState);

    element.addEventListener("scroll", updateScrollState, {
      passive: true,
    });

    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(element);

    return () => {
      cancelAnimationFrame(frame);
      element.removeEventListener("scroll", updateScrollState);
      resizeObserver.disconnect();
    };
  }, [updateScrollState]);

  const scroll = (direction: "previous" | "next") => {
    const element = scrollRef.current;

    if (!element) {
      return;
    }

    element.scrollBy({
      left:
        direction === "next"
          ? element.clientWidth * 0.7
          : -element.clientWidth * 0.7,
      behavior: "smooth",
    });
  };

  const handleSelect = (id: string, element: HTMLButtonElement) => {
    onSelect(id);

    element.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  return (
    <div className="min-w-0">
      <div className="mb-3 flex items-center justify-between">
        <FieldLabel>Quel logement ?</FieldLabel>

        {hasOverflow ? (
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Voir les logements précédents"
              disabled={!canScrollLeft}
              onClick={() => scroll("previous")}
              className="flex size-8 cursor-pointer items-center justify-center border border-border/60 text-muted-foreground transition-colors hover:border-primary/45 hover:text-primary disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronLeft className="size-4" />
            </button>

            <button
              type="button"
              aria-label="Voir les logements suivants"
              disabled={!canScrollRight}
              onClick={() => scroll("next")}
              className="flex size-8 cursor-pointer items-center justify-center border border-border/60 text-muted-foreground transition-colors hover:border-primary/45 hover:text-primary disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        ) : null}
      </div>

      <div className="relative min-w-0 max-w-full overflow-hidden">
        <div
          ref={scrollRef}
          className="flex w-full max-w-full snap-x snap-proximity gap-3 overflow-x-auto scroll-smooth pb-2 pr-10 scrollbar-none [&::-webkit-scrollbar]:hidden"
        >
          {accommodations.map((accommodation) => (
            <ContactAccommodationCard
              key={accommodation.id}
              accommodation={accommodation}
              selected={accommodation.id === selectedId}
              preview={preview}
              onSelect={(element) => {
                if (!preview) {
                  handleSelect(accommodation.id, element);
                }
              }}
            />
          ))}
        </div>

        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-y-0 left-0 w-10 bg-linear-to-r from-background via-background/70 to-transparent transition-opacity duration-300",
            canScrollLeft ? "opacity-100" : "opacity-0",
          )}
        />

        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-y-0 right-0 w-12 bg-linear-to-l from-background via-background/70 to-transparent transition-opacity duration-300",
            canScrollRight ? "opacity-100" : "opacity-0",
          )}
        />
      </div>
    </div>
  );
};
