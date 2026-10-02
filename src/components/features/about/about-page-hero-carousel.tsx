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
          <div aria-hidden="true" className="absolute inset-0 bg-black/30" />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-r from-background from-0% via-background/94 via-42% to-background/18 to-82%"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-linear-to-b from-black/50 to-transparent"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background/85 via-background/35 to-transparent"
          />

          {images.length > 1 ? (
            <div className="absolute bottom-7 right-6 z-20 hidden items-center gap-3 sm:flex lg:bottom-9 lg:right-16 xl:right-20">
              <span className="font-serif text-xs tracking-[0.15em] text-foreground/70 sm:text-sm">
                {String(activeIndex + 1).padStart(2, "0")}

                <span className="mx-2 text-foreground/30">/</span>

                {String(images.length).padStart(2, "0")}
              </span>

              <div className="hidden items-center gap-2 sm:flex">
                {images.map((image, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={image.src}
                      type="button"
                      aria-label={`Afficher l’image ${index + 1}`}
                      aria-current={isActive ? "true" : undefined}
                      onClick={() => setActiveIndex(index)}
                      className="group flex h-8 w-9 cursor-pointer items-center"
                    >
                      <span
                        className={cn(
                          "h-px w-full transition-colors duration-500",
                          isActive
                            ? "bg-primary"
                            : "bg-foreground/20 group-hover:bg-foreground/50",
                        )}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </>
      )}
    </PageHeroCarousel>
  );
};
