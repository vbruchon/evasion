import { ArrowRight, House } from "lucide-react";
import Link from "next/link";

import type { AdminDashboardData } from "@/lib/admin/dashboard/queries/get-admin-dashboard-data";

type AdminDashboardAccommodationsSummaryProps = {
  accommodations: AdminDashboardData["accommodations"];
};

export const AdminDashboardAccommodationsSummary = ({
  accommodations,
}: AdminDashboardAccommodationsSummaryProps) => {
  const totalAccommodationCount =
    accommodations.published + accommodations.draft + accommodations.archived;

  return (
    <div className="relative px-5 py-5 sm:px-7 xl:min-h-62.5">
      <div
        aria-hidden="true"
        className="absolute bottom-5 right-0 top-5 hidden w-px bg-border/60 xl:block"
      />

      <div className="flex items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary/4">
            <House className="size-4 text-primary" />
          </div>

          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-primary/75">
            Logements
          </p>
        </div>

        <Link
          href="/admin/logements"
          className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          Gérer les logements
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="mt-4 sm:pl-18">
        <div className="flex items-end gap-3">
          <p className="font-heading text-6xl leading-[0.82] tracking-[-0.06em] text-foreground">
            {accommodations.published}
          </p>

          <p className="pb-0.5 font-heading text-2xl tracking-[-0.03em] text-foreground">
            publié{accommodations.published > 1 ? "s" : ""}
          </p>
        </div>

        <p className="mt-2 text-sm text-muted-foreground">
          sur {totalAccommodationCount} logement
          {totalAccommodationCount > 1 ? "s" : ""} au total
        </p>

        <div className="mt-5 grid max-w-lg grid-cols-2 border-t border-border/50 pt-4">
          <div className="flex items-end gap-3 pr-7">
            <p className="font-heading text-3xl leading-none tracking-[-0.04em] text-foreground">
              {accommodations.draft}
            </p>

            <p className="pb-0.5 text-sm text-muted-foreground">
              {accommodations.draft > 1 ? "brouillons" : "brouillon"}
            </p>
          </div>

          <div className="flex items-end gap-3 border-l border-border/60 pl-7">
            <p className="font-heading text-3xl leading-none tracking-[-0.04em] text-foreground">
              {accommodations.archived}
            </p>

            <p className="pb-0.5 text-sm text-muted-foreground">
              {accommodations.archived > 1 ? "archivés" : "archivé"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
