import * as motion from "motion/react-client";
import Image from "next/image";

import { AdminEditorRegion } from "@/components/layout/admin/editor/admin-editor-region";
import { SiteContainer } from "@/components/layout/site-container";
import { SiteSection } from "@/components/layout/site-section";
import { ACCOMMODATIONS_PAGE_DEFAULT_HERO_IMAGE } from "@/lib/accommodations-page/accommodations-page-defaults";
import type { AccommodationsPageEditorRegion } from "@/lib/admin/accommodations-page/editor/editor-sections";
import {
  pageHeroContainerVariants,
  pageHeroItemVariants,
} from "@/lib/motion/page-hero-motion";

type AccommodationsPageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  imageUrl: string | null;
  activeEditorRegion?: AccommodationsPageEditorRegion;
  animated?: boolean;
};

export const AccommodationsPageHero = ({
  eyebrow,
  title,
  description,
  imageUrl,
  activeEditorRegion,
  animated = false,
}: AccommodationsPageHeroProps) => (
  <SiteSection
    bordered={false}
    className="relative min-h-105 overflow-hidden border-b border-border/60 bg-background md:min-h-110 lg:min-h-120"
  >
    <AdminEditorRegion
      region="image"
      activeRegion={activeEditorRegion}
      className="absolute inset-0"
    >
      <Image
        src={imageUrl ?? ACCOMMODATIONS_PAGE_DEFAULT_HERO_IMAGE}
        alt=""
        fill
        quality={65}
        priority
        fetchPriority="high"
        unoptimized={imageUrl?.startsWith("blob:")}
        aria-hidden="true"
        sizes="100vw"
        className="scale-[1.01] object-cover object-center opacity-80 blur-[1px] saturate-[0.85]"
      />

      <div aria-hidden="true" className="absolute inset-0 bg-black/50" />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-background from-0% via-background/95 via-42% to-background/35 to-82%"
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-black/55 to-transparent"
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-background/90 via-background/45 to-transparent"
      />
    </AdminEditorRegion>

    <SiteContainer
      variant="inset"
      className="relative z-10 flex min-h-105 items-center pb-10 pt-28 md:min-h-110 md:pb-12 md:pt-30 lg:min-h-120 lg:pb-14 lg:pt-32"
    >
      <AdminEditorRegion
        region="content"
        activeRegion={activeEditorRegion}
        className="w-full max-w-xl lg:max-w-2xl"
      >
        <motion.div
          variants={pageHeroContainerVariants}
          initial={animated ? "hidden" : "visible"}
          animate="visible"
        >
          <motion.div
            variants={pageHeroItemVariants}
            className="flex items-center gap-4"
          >
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-primary sm:text-xs">
              {eyebrow}
            </p>

            <span
              aria-hidden="true"
              className="h-px w-10 bg-primary/65 sm:w-14"
            />
          </motion.div>

          <motion.h1
            variants={pageHeroItemVariants}
            className="mt-5 max-w-3xl font-heading text-[2.9rem] leading-[0.94] tracking-[-0.045em] sm:text-6xl lg:text-7xl"
          >
            {title}
          </motion.h1>

          <motion.div
            variants={pageHeroItemVariants}
            aria-hidden="true"
            className="mt-5 flex items-center gap-3"
          >
            <span className="h-px w-10 bg-primary/40 sm:w-14" />

            <Image
              src="/logo-icon.svg"
              alt=""
              width={42}
              height={40}
              className="h-auto w-11 shrink-0 object-contain sm:w-13"
            />

            <span className="h-px w-10 bg-primary/40 sm:w-14" />
          </motion.div>

          <motion.p
            variants={pageHeroItemVariants}
            className="mt-5 max-w-lg text-sm leading-6 text-foreground/75 sm:text-base sm:leading-7"
          >
            {description}
          </motion.p>
        </motion.div>
      </AdminEditorRegion>
    </SiteContainer>
  </SiteSection>
);
