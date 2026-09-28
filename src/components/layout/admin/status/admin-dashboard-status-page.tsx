import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type AdminDashboardStatusPageProps = {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export const AdminDashboardStatusPage = ({
  icon: Icon,
  eyebrow,
  title,
  description,
  children,
}: AdminDashboardStatusPageProps) => (
  <main className="min-h-full px-6 py-10 lg:px-10 lg:py-12">
    <div className="mx-auto max-w-6xl">
      <div className="border-b border-border/60 pb-6">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-primary">
          Administration
        </p>
      </div>

      <div className="relative py-16 sm:py-20 lg:py-24">
        <p
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-8 hidden font-heading text-[11rem] leading-none text-primary/[0.035] lg:block"
        >
          404
        </p>

        <div className="relative max-w-2xl">
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
  </main>
);
