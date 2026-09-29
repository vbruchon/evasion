import type { ReactNode } from "react";

import { SiteContainer } from "@/components/layout/site-container";

type LegalPageLayoutProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export const LegalPageLayout = ({
  eyebrow,
  title,
  description,
  children,
}: LegalPageLayoutProps) => (
  <main className="min-h-screen bg-background text-foreground">
    <SiteContainer
      variant="inset"
      className="pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-40"
    >
      <div className="mx-auto max-w-5xl">
        <header className="border-b border-border/60 pb-8 sm:pb-10">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
            {eyebrow}
          </p>

          <h1 className="mt-4 font-heading text-4xl tracking-[-0.035em] sm:text-5xl">
            {title}
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            {description}
          </p>
        </header>

        <div className="mt-10 space-y-10">{children}</div>
      </div>
    </SiteContainer>
  </main>
);
