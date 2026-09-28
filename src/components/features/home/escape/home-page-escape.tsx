import { SiteSection } from "@/components/layout/site-section";
import { PageLinkButton } from "@/components/layout/page-link-button";

import { HomePageEscapeVisual } from "./home-page-escape-visual";

type HomePageEscapeProps = {
  eyebrow: string;
  title: string;
  description: string;
  handwritten: string;
  imageUrl: string;
};

export const HomePageEscape = ({
  eyebrow,
  title,
  description,
  handwritten,
  imageUrl,
}: HomePageEscapeProps) => {
  return (
    <SiteSection
      bordered={false}
      className="relative overflow-hidden border-y border-muted"
    >
      <HomePageEscapeVisual imageUrl={imageUrl} handwritten={handwritten} />

      <div className="relative z-10 mx-auto flex min-h-107.5 max-w-[1600px] items-center px-6 py-12 sm:py-16 lg:py-24 xl:py-28">
        <div className="w-full max-w-115">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-primary">
            {eyebrow}
          </p>

          <span
            aria-hidden="true"
            className="mt-3 block h-px w-9 bg-primary/60"
          />

          <h2 className="mt-5 font-heading text-4xl font-normal leading-[1.03] sm:text-[2.75rem] xl:text-[3rem]">
            {title}
          </h2>

          <p className="mt-5 max-w-100 text-sm leading-6 text-white/75 lg:text-muted-foreground">
            {description}
          </p>

          <PageLinkButton
            href="/a-propos"
            variant="text-line"
            className="mt-8 lg:text-primary/90"
          >
            Découvrir notre histoire
          </PageLinkButton>
        </div>
      </div>
    </SiteSection>
  );
};
