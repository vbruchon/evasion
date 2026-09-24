import { AboutPageHeroCarousel } from "@/components/features/about/about-page-hero-carousel";
import type { AboutHeroImage } from "@/lib/about/about-page.types";
import { PageLinkButton } from "@/components/layout/page-link-button";
import { SiteSection } from "@/components/layout/site-section";
import { PageHeroContent } from "@/components/layout/page-hero-content";

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
          <PageHeroContent
            eyebrow={eyebrow}
            title={title}
            description={description}
          >
            <div className="mt-9 flex justify-center sm:justify-start">
              <PageLinkButton href="/logements">{buttonLabel}</PageLinkButton>
            </div>
          </PageHeroContent>
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
