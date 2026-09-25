import Image from "next/image";

import { PageHeroContent } from "@/components/layout/page-hero-content";
import { SiteContainer } from "@/components/layout/site-container";
import { SiteSection } from "@/components/layout/site-section";
import { FAQ_PAGE_DEFAULT_HERO_IMAGE } from "@/lib/faq/faq-page-defaults";

type FaqPageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  handwrittenFirstLine: string;
  handwrittenSecondLine: string;
};

export const FaqPageHero = ({
  eyebrow,
  title,
  description,
  handwrittenFirstLine,
  handwrittenSecondLine,
}: FaqPageHeroProps) => (
  <SiteSection
    bordered={false}
    className="relative min-h-145 overflow-hidden bg-background md:min-h-155 lg:min-h-165"
  >
    <div className="absolute inset-0">
      <Image
        src={FAQ_PAGE_DEFAULT_HERO_IMAGE}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute inset-0 bg-linear-to-r from-background from-0% via-background/95 via-38% to-background/15 to-82%" />

      <div className="absolute inset-y-0 right-0 w-[45%] bg-linear-to-l from-black/15 to-transparent" />

      <div className="absolute inset-x-0 top-0 h-28 bg-linear-to-b from-black/25 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-background/60 to-transparent" />
    </div>

    <SiteContainer
      variant="inset"
      className="relative z-10 flex min-h-145 items-center pb-14 pt-28 md:min-h-155 md:pb-16 md:pt-32 lg:min-h-165"
    >
      <div className="w-full max-w-sm lg:w-135 lg:max-w-none">
        <PageHeroContent
          eyebrow={eyebrow}
          title={title}
          description={description}
          variant="compact"
        />

        <div className="mt-10 hidden items-center gap-4 md:flex">
          <span className="h-px w-10 bg-primary/60" />

          <span className="text-[0.65rem] uppercase tracking-[0.3em] text-foreground/55">
            Préparer · Réserver · Profiter
          </span>
        </div>
      </div>
    </SiteContainer>

    <div className="absolute bottom-12 right-10 z-10 hidden -rotate-5 text-right font-handwritten md:block lg:bottom-14 lg:right-16 xl:right-24">
      <p className="text-[1.9rem] leading-none text-white/95">
        {handwrittenFirstLine}
      </p>

      <p className="mt-1 text-[1.8rem] leading-none text-primary">
        {handwrittenSecondLine}
      </p>
    </div>
  </SiteSection>
);
