"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import type { AccommodationWithImagesAndHighlights } from "@/lib/accommodations/accommodation-types";

import { HomePageAccommodationFeatured } from "./home-page-accommodation-featured";
import { HomePageAccommodationIntro } from "./home-page-accommodation-intro";
import { HomePageAccommodationThumbnails } from "./home-page-accommodation-thumbnails";

type HomePageAccommodationSelectorProps = {
  eyebrow: string;
  title: string;
  description: string;
  accommodations: AccommodationWithImagesAndHighlights[];
  activeEditorRegion?: "content";
  animated?: boolean;
};

export const HomePageAccommodationSelector = ({
  eyebrow,
  title,
  description,
  accommodations,
  activeEditorRegion,
  animated = false,
}: HomePageAccommodationSelectorProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeAccommodation = accommodations[activeIndex];

  return (
    <div className="mx-auto max-w-[1600px]">
      <div className="grid items-stretch gap-y-10 xl:grid-cols-[minmax(360px,0.9fr)_minmax(0,1.8fr)] xl:gap-x-14 xl:gap-y-0 2xl:grid-cols-[minmax(420px,0.95fr)_minmax(0,1.75fr)]">
        <motion.div
          initial={animated ? { opacity: 0, y: 14 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <HomePageAccommodationIntro
            eyebrow={eyebrow}
            title={title}
            description={description}
            activeEditorRegion={activeEditorRegion}
          />
        </motion.div>

        <motion.div
          initial={animated ? { opacity: 0, y: 18 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.9,
            delay: animated ? 0.08 : 0,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="min-w-0"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeAccommodation.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <HomePageAccommodationFeatured
                accommodation={activeAccommodation}
                index={activeIndex}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <HomePageAccommodationThumbnails
        accommodations={accommodations}
        activeIndex={activeIndex}
        onSelect={setActiveIndex}
        animated={animated}
      />
    </div>
  );
};
