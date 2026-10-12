import * as motion from "motion/react-client";

import type { AccommodationHeroGeneralData } from "@/lib/accommodations/accommodation-types";
import { ACCOMMODATION_PREVIEW_PLACEHOLDERS } from "@/lib/accommodations/accommodation-preview-placeholders";
import {
  pageHeroContainerVariants,
  pageHeroItemVariants,
} from "@/lib/motion/page-hero-motion";

type AccommodationHeroGeneralProps = {
  accommodation: AccommodationHeroGeneralData;
  editorPreview?: boolean;
  animated?: boolean;
};

export const AccommodationHeroGeneral = ({
  accommodation,
  editorPreview = false,
  animated = false,
}: AccommodationHeroGeneralProps) => {
  const accommodationSubtitleVariants = {
    hidden: {
      opacity: 0.01,
      y: 12,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.95,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };
  return (
    <motion.div
      variants={pageHeroContainerVariants}
      initial={animated ? "hidden" : false}
      animate="visible"
    >
      {accommodation.type ? (
        <motion.p
          variants={pageHeroItemVariants}
          className="font-heading text-lg italic text-primary md:text-xl"
        >
          {accommodation.type}
        </motion.p>
      ) : editorPreview ? (
        <p className="font-heading text-lg italic text-primary/60 md:text-xl">
          {ACCOMMODATION_PREVIEW_PLACEHOLDERS.hero.type}
        </p>
      ) : null}

      <motion.h1
        variants={pageHeroItemVariants}
        className="mt-4 font-heading text-4xl leading-[0.92] uppercase tracking-tight text-white md:text-6xl lg:mt-7"
      >
        {accommodation.name}
      </motion.h1>

      {accommodation.subtitle ? (
        <motion.p
          variants={accommodationSubtitleVariants}
          className="mt-5 text-base leading-7 text-white/85 md:text-lg lg:mt-8"
        >
          {accommodation.subtitle}
        </motion.p>
      ) : editorPreview ? (
        <p className="mt-5 text-base leading-7 text-white/45 md:text-lg lg:mt-8">
          {ACCOMMODATION_PREVIEW_PLACEHOLDERS.hero.subtitle}
        </p>
      ) : null}
    </motion.div>
  );
};
