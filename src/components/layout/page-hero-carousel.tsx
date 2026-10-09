"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

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
  const shouldReduceMotion = useReducedMotion();

  const activeImage = images[activeIndex];

  useEffect(() => {
    if (images.length <= 1 || shouldReduceMotion) {
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
  }, [images.length, shouldReduceMotion]);

  return (
    <div
      className="absolute inset-0"
      aria-label="Découvrir les hébergements Évasion"
      aria-roledescription="carrousel"
    >
      <AnimatePresence initial={false}>
        {activeImage ? (
          <motion.div
            key={activeImage.src}
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 1.4,
              ease: "easeInOut",
            }}
            className="absolute inset-0"
          >
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              loading="eager"
              fetchPriority={activeIndex === 0 ? "high" : "auto"}
              sizes="100vw"
              style={{
                objectPosition: activeImage.objectPosition ?? "center",
              }}
              className="object-cover"
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {children?.(activeIndex, setActiveIndex)}
    </div>
  );
};
