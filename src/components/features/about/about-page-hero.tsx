import * as motion from "motion/react-client";

import { AboutPageHeroCarousel } from "@/components/features/about/about-page-hero-carousel";
import { PageHeroContent } from "@/components/layout/page-hero-content";
import { PageLinkButton } from "@/components/layout/page-link-button";
import { SiteContainer } from "@/components/layout/site-container";
import { SiteSection } from "@/components/layout/site-section";
import type { AboutHeroImage } from "@/lib/about/about-page.types";

type AboutPageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  buttonLabel: string;
  images: AboutHeroImage[];
  animated?: boolean;
};

export const AboutPageHero = ({
  eyebrow,
  title,
  description,
  buttonLabel,
  images,
  animated = false,
}: AboutPageHeroProps) => (
  <SiteSection
    bordered={false}
    className="relative min-h-145 overflow-hidden border-b border-border/60 bg-background md:min-h-155 lg:h-[clamp(600px,72svh,700px)] lg:min-h-0"
  >
    <AboutPageHeroCarousel images={images} />

    <SiteContainer
      variant="inset"
      className="relative z-10 flex min-h-145 flex-col pb-10 pt-28 md:min-h-155 md:pb-12 md:pt-32 lg:h-full lg:min-h-0"
    >
      <div className="my-auto max-w-xl lg:max-w-2xl">
        <PageHeroContent
          eyebrow={eyebrow}
          title={title}
          description={description}
          animated={animated}
        >
          <div className="mt-8 flex sm:mt-9">
            <PageLinkButton href="/logements">{buttonLabel}</PageLinkButton>
          </div>
        </PageHeroContent>
      </div>

      <motion.div
        initial={animated ? { opacity: 0, y: 8 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.9,
          delay: animated ? 0.5 : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="hidden items-center gap-4 pb-1 lg:flex"
      >
        <span className="h-px w-10 bg-primary/60" />

        <span className="text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground/80">
          Ralentir · Se retrouver · Profiter
        </span>
      </motion.div>
    </SiteContainer>
  </SiteSection>
);
