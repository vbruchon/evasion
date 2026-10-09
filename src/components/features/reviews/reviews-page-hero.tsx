import Image from "next/image";

import { ReviewStars } from "@/components/features/reviews/shared/review-stars";
import { AdminEditorRegion } from "@/components/layout/admin/editor/admin-editor-region";
import { PageHeroContent } from "@/components/layout/page-hero-content";
import { SiteContainer } from "@/components/layout/site-container";
import { SiteSection } from "@/components/layout/site-section";
import { HandwrittenReveal } from "@/components/motion/handwritten-reveal";
import type { ReviewsPageHeroEditorSection } from "@/lib/admin/reviews/editor/editor-sections";
import { REVIEWS_PAGE_DEFAULT_HERO_IMAGE } from "@/lib/reviews/reviews-page-defaults";

type ReviewsPageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  handwrittenFirstLine: string;
  handwrittenSecondLine: string;
  imageUrl: string | null;
  averageRating: number;
  totalReviews: number;
  activeEditorRegion?: ReviewsPageHeroEditorSection;
  animated?: boolean;
};

export const ReviewsPageHero = ({
  eyebrow,
  title,
  description,
  handwrittenFirstLine,
  handwrittenSecondLine,
  imageUrl,
  averageRating,
  totalReviews,
  activeEditorRegion,
  animated = false,
}: ReviewsPageHeroProps) => (
  <SiteSection
    bordered={false}
    className="relative min-h-130 overflow-hidden border-b border-border/60 bg-background md:min-h-140 lg:min-h-150"
  >
    <AdminEditorRegion
      region="image"
      activeRegion={activeEditorRegion}
      className="absolute inset-0"
    >
      <Image
        src={imageUrl ?? REVIEWS_PAGE_DEFAULT_HERO_IMAGE}
        alt=""
        fill
        quality={65}
        priority
        unoptimized={imageUrl?.startsWith("blob:")}
        sizes="100vw"
        className="scale-[1.01] object-cover object-center opacity-90 blur-[1.5px] saturate-[0.88]"
      />

      <div aria-hidden="true" className="absolute inset-0 bg-black/45" />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-background from-0% via-background/94 via-42% to-background/20 to-82%"
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-36 bg-linear-to-b from-black/50 to-transparent"
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-36 bg-linear-to-t from-background/80 via-background/30 to-transparent"
      />
    </AdminEditorRegion>

    <SiteContainer
      variant="inset"
      className="relative z-10 flex min-h-130 items-center pb-12 pt-28 md:min-h-140 md:pb-14 md:pt-32 lg:min-h-150"
    >
      <AdminEditorRegion
        region="content"
        activeRegion={activeEditorRegion}
        className="w-full max-w-sm lg:w-120 lg:max-w-none"
      >
        <PageHeroContent
          eyebrow={eyebrow}
          title={title}
          description={description}
          variant="compact"
          animated={animated}
        >
          {totalReviews > 0 ? (
            <div className="mt-8 border-l border-primary/25 pl-4 sm:mt-9">
              <div className="flex items-end gap-1.5">
                <span className="font-heading text-[3.25rem] leading-[0.9] text-primary sm:text-[3.5rem]">
                  {averageRating.toFixed(1).replace(".", ",")}
                </span>

                <span className="pb-1 text-primary/80">/5</span>
              </div>

              <ReviewStars
                rating={averageRating}
                className="mt-3 gap-1.5"
                starClassName="size-[1.05rem]"
              />

              <p className="mt-3 text-[0.65rem] uppercase tracking-[0.2em] text-foreground/60">
                Basé sur {totalReviews} avis
              </p>
            </div>
          ) : null}
        </PageHeroContent>
      </AdminEditorRegion>
    </SiteContainer>

    <div className="absolute bottom-10 right-10 z-10 hidden md:block lg:bottom-12 lg:right-16 xl:right-20">
      <AdminEditorRegion
        region="content"
        activeRegion={activeEditorRegion}
        className="-rotate-6 text-right font-handwritten"
      >
        <p className="text-[1.7rem] leading-[1.05] tracking-[-0.02em] text-white/85">
          <HandwrittenReveal animated={animated} delay={0.35} duration={1.15}>
            {handwrittenFirstLine}
          </HandwrittenReveal>
        </p>

        <p className="text-[1.65rem] leading-[1.05] tracking-[-0.02em] text-primary">
          <HandwrittenReveal animated={animated} delay={1.05} duration={1.1}>
            {handwrittenSecondLine}
          </HandwrittenReveal>
        </p>
      </AdminEditorRegion>
    </div>
  </SiteSection>
);
