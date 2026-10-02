import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ACCOMMODATIONS_PAGE_DEFAULT_CTA_IMAGE } from "@/lib/accommodations-page/accommodations-page-defaults";

type AccommodationsContactCtaProps = {
  eyebrow: string;
  title: string;
  buttonLabel: string;
  imageUrl: string | null;
};

export const AccommodationsContactCta = ({
  eyebrow,
  title,
  buttonLabel,
  imageUrl,
}: AccommodationsContactCtaProps) => (
  <section className="relative overflow-hidden border-y border-border/60">
    <Image
      src={imageUrl ?? ACCOMMODATIONS_PAGE_DEFAULT_CTA_IMAGE}
      alt=""
      fill
      aria-hidden="true"
      sizes="100vw"
      className="object-cover object-center"
    />

    <div className="absolute inset-0 bg-background/60" />

    <div className="absolute inset-0 bg-linear-to-r from-background/90 via-background/70 to-background/90" />

    <div className="relative mx-auto grid min-h-48 max-w-360 items-center gap-8 px-6 py-10 text-center md:px-12 lg:grid-cols-[1fr_auto] lg:px-16 lg:text-left xl:px-20">
      <div className="lg:text-center">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-primary/80">
          {eyebrow}
        </p>

        <h2 className="mx-auto mt-3 max-w-2xl font-heading text-2xl leading-tight tracking-[-0.025em] sm:text-3xl">
          {title}
        </h2>
      </div>

      <Link
        href="/contact"
        className="group mx-auto inline-flex h-12 min-w-52 items-center justify-center gap-3 border border-primary/55 px-7 text-sm text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground lg:mx-0"
      >
        {buttonLabel}

        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </div>
  </section>
);
