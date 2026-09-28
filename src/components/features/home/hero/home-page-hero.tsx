import type { AccommodationHeroImage } from "@/lib/accommodations/queries/get-accommodation-hero-images";
import { SiteSection } from "@/components/layout/site-section";
import { PageLinkButton } from "@/components/layout/page-link-button";
import { HomePageHeroCarousel } from "./home-page-hero-carousel";

type HomePageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  buttonLabel: string;
  images: readonly AccommodationHeroImage[];
  totalAccommodations: number;
};

export const HomePageHero = ({
  eyebrow,
  title,
  description,
  buttonLabel,
  images,
  totalAccommodations,
}: HomePageHeroProps) => {
  return (
    <SiteSection
      bordered={false}
      className="relative min-h-190 overflow-hidden bg-background lg:h-svh lg:min-h-180"
    >
      <HomePageHeroCarousel images={images} />

      <div className="relative z-10 mx-auto flex min-h-190 w-full max-w-[1920px] flex-col px-6 pb-10 pt-32 sm:px-12 lg:h-full lg:min-h-180 lg:px-20 lg:pt-36 xl:px-24">
        <div className="my-auto max-w-4xl">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.32em] text-primary">
            {eyebrow}
          </p>

          <h1 className="max-w-4xl font-serif text-5xl leading-[0.98] tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            {title}
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-7 text-white/90 sm:text-lg sm:leading-8">
            {description}
          </p>

          <div className="mt-9">
            <PageLinkButton href="/logements">{buttonLabel}</PageLinkButton>
          </div>
        </div>

        <div className="flex max-w-[calc(100%-180px)] items-center gap-4 pb-1 max-sm:hidden">
          <span className="h-px w-12 shrink-0 bg-primary/70" />

          <span className="text-[0.65rem] uppercase tracking-[0.3em] text-white/65">
            {totalAccommodations} {totalAccommodations > 1 ? "lieux" : "lieu"}
            <span className="mx-3 text-primary/70">·</span>
            Drôme & Vercors
            <span className="mx-3 text-primary/70">·</span>
            Pensés pour deux
          </span>
        </div>
      </div>
    </SiteSection>
  );
};
