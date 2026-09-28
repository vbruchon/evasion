import { ChevronLeft } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";

type AdminEditorStatusPageProps = {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export const AdminEditorStatusPage = ({
  icon: Icon,
  eyebrow,
  title,
  description,
  children,
}: AdminEditorStatusPageProps) => (
  <div className="flex min-h-0 flex-1 flex-col">
    <header className="flex shrink-0 items-center border-b border-border/60 px-2 py-3 sm:px-4 lg:px-6 lg:py-4">
      <Button
        nativeButton={false}
        variant="ghost"
        size="icon"
        className="sm:hidden"
        render={<Link href="/admin" />}
        aria-label="Retour à l’administration"
      >
        <ChevronLeft />
      </Button>

      <Button
        nativeButton={false}
        variant="ghost"
        className="hidden sm:inline-flex"
        render={<Link href="/admin" />}
      >
        <ChevronLeft />
        Administration
      </Button>

      <span className="ml-3 hidden text-muted-foreground lg:inline">/</span>

      <p className="ml-3 hidden font-medium lg:block">Erreur</p>
    </header>

    <div className="relative flex min-h-0 flex-1 items-center overflow-hidden px-6 py-12 sm:px-10 lg:px-16">
      <p
        aria-hidden="true"
        className="pointer-events-none absolute right-8 top-1/2 hidden -translate-y-1/2 font-heading text-[18rem] leading-none text-primary/[0.035] xl:block"
      >
        404
      </p>

      <div className="relative mx-auto w-full max-w-5xl">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4">
            <div className="flex size-10 items-center justify-center border border-primary/30 bg-primary/5 text-primary">
              <Icon className="size-4" />
            </div>

            <span className="h-px w-8 bg-primary/60" />

            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary">
              {eyebrow}
            </p>
          </div>

          <h1 className="mt-7 max-w-xl font-heading text-4xl leading-tight tracking-[-0.035em] sm:text-5xl">
            {title}
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">
            {description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">{children}</div>
        </div>
      </div>
    </div>
  </div>
);
