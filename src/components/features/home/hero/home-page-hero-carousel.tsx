"use client";

import { PageHeroCarousel } from "@/components/layout/page-hero-carousel";
import type { AccommodationHeroImage } from "@/lib/accommodations/queries/get-accommodation-hero-images";
import { cn } from "@/lib/utils";

type HomePageHeroCarouselProps = {
  images: readonly AccommodationHeroImage[];
};

export const HomePageHeroCarousel = ({ images }: HomePageHeroCarouselProps) => {
  return (
    <PageHeroCarousel images={images}>
      {(activeIndex, setActiveIndex) => (
        <>
          <div aria-hidden="true" className="absolute inset-0 bg-black/20" />

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-r from-black/85 from-0% via-black/55 via-38% to-black/5 to-78%"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-linear-to-b from-black/60 to-transparent"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-linear-to-t from-background via-background/45 to-transparent"
          />

          {images.length > 1 && (
            <div className="absolute bottom-8 right-6 z-20 flex items-center gap-4 sm:bottom-20 sm:right-12 lg:bottom-10 lg:right-20 xl:right-24">
              <span className="font-serif text-sm tracking-[0.15em] text-white/80">
                {String(activeIndex + 1).padStart(2, "0")}
                <span className="mx-2 text-white/35">/</span>
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
                            : "bg-white/30 group-hover:bg-white/60",
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
