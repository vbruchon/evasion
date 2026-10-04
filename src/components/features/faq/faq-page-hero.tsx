import Image from "next/image";

import { AdminEditorRegion } from "@/components/layout/admin/editor/admin-editor-region";
import { PageHeroContent } from "@/components/layout/page-hero-content";
import { SiteContainer } from "@/components/layout/site-container";
import { SiteSection } from "@/components/layout/site-section";
import type { FaqPageHeroEditorSection } from "@/lib/admin/faq/editor/editor-sections";
import { FAQ_PAGE_DEFAULT_HERO_IMAGE } from "@/lib/faq/faq-page-defaults";
import { HandwrittenReveal } from "@/components/motion/handwritten-reveal";

type FaqPageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  handwrittenFirstLine: string;
  handwrittenSecondLine: string;
  imageUrl: string | null;
  activeEditorRegion?: FaqPageHeroEditorSection;
  animated?: boolean;
};

export const FaqPageHero = ({
  eyebrow,
  title,
  description,
  handwrittenFirstLine,
  handwrittenSecondLine,
  imageUrl,
  activeEditorRegion,
  animated = false,
}: FaqPageHeroProps) => (
  <SiteSection
    bordered={false}
    className="relative min-h-115 overflow-hidden border-b border-border/60 bg-background md:min-h-125 lg:min-h-135"
  >
    <AdminEditorRegion
      region="image"
      activeRegion={activeEditorRegion}
      className="absolute inset-0"
    >
      <Image
        src={imageUrl ?? FAQ_PAGE_DEFAULT_HERO_IMAGE}
        alt=""
        fill
        priority
        unoptimized={imageUrl?.startsWith("blob:")}
        aria-hidden="true"
        sizes="100vw"
        className="scale-[1.01] object-cover object-center opacity-90 blur-[1.5px] saturate-[0.88]"
      />

      <div aria-hidden="true" className="absolute inset-0 bg-black/48" />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-background from-0% via-background/95 via-42% to-background/25 to-82%"
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-36 bg-linear-to-b from-black/50 to-transparent"
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-36 bg-linear-to-t from-background/85 via-background/35 to-transparent"
      />
    </AdminEditorRegion>

    <SiteContainer
      variant="inset"
      className="relative z-10 flex min-h-115 items-center pb-10 pt-28 md:min-h-125 md:pb-12 md:pt-32 lg:min-h-135"
    >
      <AdminEditorRegion
        region="content"
        activeRegion={activeEditorRegion}
        className="w-full max-w-sm lg:w-135 lg:max-w-none"
      >
        <PageHeroContent
          eyebrow={eyebrow}
          title={title}
          description={description}
          variant="compact"
          animated={animated}
        >
          <div className="mt-8 hidden items-center gap-4 md:flex">
            <span className="h-px w-10 bg-primary/60" />

            <span className="text-[0.65rem] uppercase tracking-[0.3em] text-foreground/55">
              Préparer · Réserver · Profiter
            </span>
          </div>
        </PageHeroContent>
      </AdminEditorRegion>
    </SiteContainer>

    <div className="absolute bottom-10 right-10 z-10 hidden md:block lg:bottom-12 lg:right-16 xl:right-20">
      <AdminEditorRegion
        region="content"
        activeRegion={activeEditorRegion}
        className="-rotate-5 text-right font-handwritten"
      >
        <p className="text-[1.7rem] leading-none text-white/85">
          <HandwrittenReveal animated={animated} delay={0} duration={1.15}>
            {handwrittenFirstLine}
          </HandwrittenReveal>
        </p>

        <p className="mt-1 text-[1.65rem] leading-none text-primary">
          <HandwrittenReveal animated={animated} delay={0.5} duration={1.1}>
            {handwrittenSecondLine}
          </HandwrittenReveal>
        </p>
      </AdminEditorRegion>
    </div>
  </SiteSection>
);
