"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import { cn } from "@/lib/utils";
import type { AboutHeroImage } from "@/lib/about/about-page.types";

type AboutPageHeroCarouselProps = {
  images: readonly AboutHeroImage[];
};

const AUTOPLAY_DELAY = 7500;

export const AboutPageHeroCarousel = ({
  images,
}: AboutPageHeroCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => {
        return (currentIndex + 1) % images.length;
      });
    }, AUTOPLAY_DELAY);

    return () => {
      window.clearInterval(interval);
    };
  }, [images.length]);

  return (
    <div
      className="absolute inset-0"
      aria-label="Découvrir les hébergements Évasion"
      aria-roledescription="carrousel"
    >
      {images.map((image, index) => {
        const isActive = index === activeIndex;

        return (
          <div
            key={image.src}
            aria-hidden={!isActive}
            className={cn(
              "absolute inset-0 transition-opacity duration-1400 ease-in-out",
              isActive ? "z-0 opacity-100" : "-z-10 opacity-0",
            )}
          >
            <Image
              src={image.src}
              alt={isActive ? image.alt : ""}
              fill
              priority={index === 0}
              sizes="100vw"
              style={{
                objectPosition: image.objectPosition ?? "center",
              }}
              className="object-cover"
            />
          </div>
        );
      })}

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
                  className="group flex h-8 w-10 items-center cursor-pointer"
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
    </div>
  );
};
