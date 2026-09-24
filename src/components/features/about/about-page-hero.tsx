import { AboutPageHeroCarousel } from "@/components/features/about/about-page-hero-carousel";
import type { AboutHeroImage } from "@/lib/about/about-page.types";
import { AboutPageLinkButton } from "@/components/features/about/about-page-link-button";
import { SiteSection } from "@/components/layout/site-section";

type AboutPageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  buttonLabel: string;
  images: AboutHeroImage[];
};

export const AboutPageHero = ({
  eyebrow,
  title,
  description,
  buttonLabel,
  images,
}: AboutPageHeroProps) => {
  return (
    <SiteSection
      bordered={false}
      className="relative min-h-190 overflow-hidden bg-background lg:h-[clamp(720px,86svh,860px)] lg:min-h-0"
    >
      <AboutPageHeroCarousel images={images} />

      <div className="relative z-10 mx-auto flex h-full min-h-190 w-full max-w-[1920px] flex-col px-6 pb-10 pt-32 sm:px-12 lg:min-h-0 lg:px-20 lg:pt-36 xl:px-24">
        <div className="my-auto max-w-4xl">
          <p className="text-xs uppercase tracking-[0.35em] text-primary">
            {eyebrow}
          </p>

          <div className="mt-4 h-px w-10 bg-primary" />

          <h1 className="mt-6 font-heading text-[2.8rem] leading-[1.02] tracking-[-0.035em] text-foreground sm:text-5xl lg:w-4xl lg:text-[3.7rem]">
            {title}
          </h1>

          <p className="mt-8 max-w-lg text-base leading-7 text-muted-foreground">
            {description}
          </p>

          <div className="mt-9 flex justify-center sm:justify-start">
            <AboutPageLinkButton href="/logements">
              {buttonLabel}
            </AboutPageLinkButton>
          </div>
        </div>

        <div className="hidden items-center gap-4 pb-1 lg:flex">
          <span className="h-px w-12 bg-primary/60" />

          <span className="text-[0.65rem] uppercase tracking-[0.32em] text-muted-foreground/90">
            Ralentir · Se retrouver · Profiter
          </span>
        </div>
      </div>
    </SiteSection>
  );
};
