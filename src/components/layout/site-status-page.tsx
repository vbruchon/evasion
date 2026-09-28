import Image from "next/image";
import type { ReactNode } from "react";

import { SiteContainer } from "@/components/layout/site-container";

type SiteStatusPageProps = {
  eyebrow: string;
  code?: string;
  title: string;
  description: string;
  children: ReactNode;
};

export const SiteStatusPage = ({
  eyebrow,
  code,
  title,
  description,
  children,
}: SiteStatusPageProps) => (
  <main className="relative flex min-h-[72svh] items-center overflow-hidden bg-background pb-16 pt-32 text-foreground sm:pb-20 sm:pt-36 lg:min-h-[78svh] lg:pb-24 lg:pt-40">
    <Image
      src="/images/pages/shared/evasion-page-hero.png"
      alt=""
      fill
      priority
      sizes="100vw"
      className="object-cover opacity-20"
    />

    <div
      aria-hidden="true"
      className="absolute inset-0 bg-linear-to-r from-background via-background/90 to-background/55"
    />

    <div
      aria-hidden="true"
      className="absolute inset-0 bg-linear-to-t from-background via-transparent to-background/35"
    />

    <SiteContainer variant="inset" className="relative z-10">
      <div className="max-w-3xl">
        <div className="flex items-center gap-4">
          <span className="h-px w-10 bg-primary/70" />

          <p className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-primary">
            {eyebrow}
          </p>
        </div>

        {code ? (
          <p
            aria-hidden="true"
            className="mt-5 font-heading text-6xl leading-none text-primary/25 sm:text-7xl"
          >
            {code}
          </p>
        ) : null}

        <h1 className="mt-5 max-w-2xl font-heading text-4xl leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
          {title}
        </h1>

        <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
          {description}
        </p>

        <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          {children}
        </div>
      </div>
    </SiteContainer>
  </main>
);
