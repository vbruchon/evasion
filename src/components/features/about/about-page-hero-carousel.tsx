"use client";

import { PageHeroCarousel } from "@/components/layout/page-hero-carousel";
import type { AboutHeroImage } from "@/lib/about/about-page.types";
import { cn } from "@/lib/utils";

type AboutPageHeroCarouselProps = {
  images: readonly AboutHeroImage[];
};

export const AboutPageHeroCarousel = ({
  images,
}: AboutPageHeroCarouselProps) => {
  return (
    <PageHeroCarousel images={images}>
      {(activeIndex, setActiveIndex) => (
        <>
          <div aria-hidden="true" className="absolute inset-0 bg-black/15" />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-r from-background from-0% via-background/90 via-32% to-transparent to-76%"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-linear-to-b from-background/35 to-transparent"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-linear-to-t from-background via-background/65 to-transparent sm:h-60"
          />

          {images.length > 1 && (
            <div className="absolute bottom-8 right-6 z-20 flex items-center gap-4 sm:right-12 lg:bottom-10 lg:right-16">
              <span className="font-serif text-sm tracking-[0.15em] text-foreground/80">
                {String(activeIndex + 1).padStart(2, "0")}
                <span className="mx-2 text-foreground/35">/</span>
                {String(images.length).padStart(2, "0")}
              </span>

              <div className="flex items-center gap-2">
                {images.map((image, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={image.src}
                      type="button"
                      aria-label={`Afficher l’image ${index + 1}`}
                      aria-current={isActive ? "true" : undefined}
                      onClick={() => setActiveIndex(index)}
                      className="group flex h-8 w-10 cursor-pointer items-center"
                    >
                      <span
                        className={cn(
                          "h-px w-full transition-colors duration-500",
                          isActive
                            ? "bg-primary"
                            : "bg-foreground/25 group-hover:bg-foreground/55",
                        )}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </PageHeroCarousel>
  );
};
