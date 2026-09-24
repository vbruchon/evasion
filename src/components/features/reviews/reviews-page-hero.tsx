import { Star } from "lucide-react";

import { AdminEditorRegion } from "@/components/layout/admin/editor/admin-editor-region";
import type { ReviewsPageHeroEditorSection } from "@/lib/admin/reviews/editor/editor-sections";
import { REVIEWS_PAGE_DEFAULT_HERO_IMAGE } from "@/lib/reviews/reviews-page-defaults";
import Image from "next/image";
import { SiteSection } from "@/components/layout/site-section";

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
}: ReviewsPageHeroProps) => (
  <SiteSection className="relative min-h-155 overflow-hidden bg-background md:min-h-165 lg:min-h-175">
    <AdminEditorRegion
      region="image"
      activeRegion={activeEditorRegion}
      className="absolute inset-0"
    >
      <Image
        src={imageUrl ?? REVIEWS_PAGE_DEFAULT_HERO_IMAGE}
        alt=""
        fill
        priority
        unoptimized={imageUrl?.startsWith("blob:")}
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/45" />

      <div className="absolute inset-0 bg-linear-to-r from-background from-0% via-background/94 via-30% to-transparent to-68%" />

      <div className="absolute inset-x-0 top-0 h-28 bg-linear-to-b from-black/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-black/30 to-transparent" />
    </AdminEditorRegion>

    <div className="relative z-10 flex min-h-155 items-center px-6 pb-16 pt-28 md:min-h-165 md:px-12 md:pb-20 md:pt-32 lg:min-h-175 lg:px-20 xl:px-24">
      <AdminEditorRegion
        region="content"
        activeRegion={activeEditorRegion}
        className="w-full max-w-sm lg:w-120 lg:max-w-none"
      >
        <p className="text-sm font-medium uppercase tracking-[0.28em] text-primary">
          {eyebrow}
        </p>

        <div className="mt-4 h-px w-8 bg-primary/80" />

        <h1 className="mt-6 font-heading text-[2.8rem] leading-[1.02] tracking-[-0.035em] text-foreground sm:text-5xl lg:w-120 lg:text-[3.7rem]">
          {title}
        </h1>

        <p className="mt-6 max-w-xs text-sm leading-6 text-foreground/72">
          {description}
        </p>

        {totalReviews > 0 ? (
          <div className="mt-10 ml-8 space-y-4 border-l border-primary/20 pl-4">
            <div className="flex items-end gap-1.5">
              <span className="font-heading text-[3.5rem] leading-[0.9] text-primary">
                {averageRating.toFixed(1).replace(".", ",")}
              </span>

              <span className="pb-1 text-primary/85">/5</span>
            </div>

            <div
              className="mt-4 flex items-center gap-1.5 text-primary"
              aria-label={`${averageRating.toFixed(1)} étoiles sur 5`}
            >
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  className="size-[1.15rem]"
                  fill={
                    index < Math.round(averageRating) ? "currentColor" : "none"
                  }
                  strokeWidth={1.4}
                />
              ))}
            </div>

            <p className="mt-3 text-xs uppercase tracking-widest text-foreground/70">
              Basé sur {totalReviews} avis
            </p>
          </div>
        ) : null}
      </AdminEditorRegion>
    </div>

    <AdminEditorRegion
      region="content"
      activeRegion={activeEditorRegion}
      className="absolute bottom-12 right-10 z-10 hidden -rotate-6 text-right font-handwritten md:block lg:bottom-14 lg:right-16 xl:right-24"
    >
      <p className="mt-0.5 text-[1.8rem] leading-[1.05] tracking-[-0.02em] text-white/90">
        {handwrittenFirstLine}
      </p>

      <p className="text-[1.7rem] leading-[1.05] tracking-[-0.02em] text-primary">
        {handwrittenSecondLine}
      </p>
    </AdminEditorRegion>
  </SiteSection>
);
