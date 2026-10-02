import Image from "next/image";

import { ACCOMMODATIONS_PAGE_DEFAULT_HERO_IMAGE } from "@/lib/accommodations-page/accommodations-page-defaults";

type AccommodationsPageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  imageUrl: string | null;
};

export const AccommodationsPageHero = ({
  eyebrow,
  title,
  description,
  imageUrl,
}: AccommodationsPageHeroProps) => (
  <section className="relative flex min-h-105 overflow-hidden border-b border-border/60 lg:min-h-120">
    <Image
      src={imageUrl ?? ACCOMMODATIONS_PAGE_DEFAULT_HERO_IMAGE}
      alt=""
      fill
      priority
      aria-hidden="true"
      sizes="100vw"
      className="object-cover object-center blur-[3px]"
    />

    <div className="absolute inset-0 bg-black/35" />

    <div className="absolute inset-0 bg-linear-to-r from-background via-background/75 to-background/10" />

    <div className="absolute inset-0 bg-linear-to-t from-background/65 via-transparent to-black/25" />

    <div className="relative mx-auto flex w-full max-w-360 items-end px-6 pb-14 pt-32 md:px-12 md:pb-16 lg:px-16 lg:pb-20 lg:pt-36 xl:px-20">
      <div className="max-w-2xl">
        <div className="flex items-center gap-4">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-primary">
            {eyebrow}
          </p>

          <span
            aria-hidden="true"
            className="hidden h-px w-16 bg-primary/55 sm:block"
          />
        </div>

        <h1 className="mt-4 font-heading text-5xl leading-[0.92] tracking-[-0.045em] text-primary sm:text-6xl lg:text-7xl">
          {title}
        </h1>

        <div
          aria-hidden="true"
          className="relative z-10 mt-5 flex items-center gap-4"
        >
          <span className="w-14 shrink-0 border-t border-primary/45" />

          <Image
            src="/logo-icon.svg"
            alt=""
            width={42}
            height={40}
            className="h-auto w-14 shrink-0 object-contain"
          />

          <span className="w-14 shrink-0 border-t border-primary/45" />
        </div>

        <p className="mt-5 max-w-xl text-sm leading-6 text-foreground/75 md:text-base md:leading-7">
          {description}
        </p>
      </div>
    </div>
  </section>
);
