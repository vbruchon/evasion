"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import { cn } from "@/lib/utils";

export type PageHeroCarouselImage = {
  src: string;
  alt: string;
  objectPosition?: string;
};

type PageHeroCarouselProps = {
  images: readonly PageHeroCarouselImage[];
  children?: (
    activeIndex: number,
    setActiveIndex: (index: number) => void,
  ) => React.ReactNode;
};

const AUTOPLAY_DELAY = 7500;

export const PageHeroCarousel = ({
  images,
  children,
}: PageHeroCarouselProps) => {
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

      {children?.(activeIndex, setActiveIndex)}
    </div>
  );
};
