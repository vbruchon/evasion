import type { ReactNode } from "react";
import Image from "next/image";

import { PageLinkButton } from "@/components/layout/page-link-button";
import { SiteContainer } from "@/components/layout/site-container";
import { SiteSection } from "@/components/layout/site-section";

type PageCtaProps = {
  background: ReactNode;
  children: ReactNode;
};

type PageCtaBackgroundProps = {
  imageUrl: string;
};

type PageCtaContentProps = {
  eyebrow: string;
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
  children?: ReactNode;
};

const highlightBrandName = (title: string) =>
  title.split(/(évasion)/gi).map((part, index) =>
    part.toLocaleLowerCase("fr-FR") === "évasion" ? (
      <span key={index} className="text-primary italic">
        {part}
      </span>
    ) : (
      part
    ),
  );

export const PageCta = ({ background, children }: PageCtaProps) => (
  <SiteSection
    bordered={false}
    className="relative flex items-center overflow-hidden border-t border-border/60 bg-background py-16 sm:py-18 lg:py-20"
  >
    <div className="absolute inset-0">{background}</div>

    <SiteContainer variant="inset" className="relative z-10">
      <div className="mx-auto max-w-4xl text-center">{children}</div>
    </SiteContainer>
  </SiteSection>
);

export const PageCtaBackground = ({ imageUrl }: PageCtaBackgroundProps) => (
  <div className="relative h-full">
    <Image
      src={imageUrl}
      alt=""
      fill
      unoptimized={imageUrl.startsWith("blob:")}
      sizes="100vw"
      className="scale-105 object-cover blur-[6px]"
    />

    <div className="absolute inset-0 bg-black/70" />

    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.14)_45%,rgba(0,0,0,0.62)_100%)]" />

    <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-background/65 to-transparent" />

    <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background/75 to-transparent" />
  </div>
);

export const PageCtaContent = ({
  eyebrow,
  title,
  description,
  buttonLabel,
  buttonHref,
  children,
}: PageCtaContentProps) => (
  <>
    <p className="text-xs font-medium uppercase tracking-[0.28em] text-primary">
      {eyebrow}
    </p>

    <div className="mx-auto mt-4 h-px w-10 bg-primary/75" />

    <h2 className="mx-auto mt-7 max-w-5xl font-heading text-4xl leading-snug tracking-[-0.04em] text-white md:text-5xl">
      {highlightBrandName(title)}
    </h2>

    <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/65 md:text-base">
      {description}
    </p>

    <PageLinkButton href={buttonHref} className="mt-9">
      {buttonLabel}
    </PageLinkButton>

    {children}
  </>
);
