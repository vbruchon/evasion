import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";

import type { AdminDashboardData } from "@/lib/admin/dashboard/queries/get-admin-dashboard-data";

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

type AdminDashboardReviewsSummaryProps = {
  accommodations: AdminDashboardData["accommodations"];
  reviews: AdminDashboardData["reviews"];
};

export const AdminDashboardReviewsSummary = ({
  accommodations,
  reviews,
}: AdminDashboardReviewsSummaryProps) => {
  const averageRating =
    reviews.total > 0
      ? reviews.averageRating.toFixed(1).replace(".", ",")
      : "—";

  return (
    <div className="relative border-t border-border/50 px-5 py-5 sm:px-7 lg:min-h-62.5 lg:border-t-0">
      <div className="flex items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary/4">
            <Star className="size-4 text-primary" />
          </div>

          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-primary/75">
            Avis voyageurs
          </p>
        </div>

        <Link
          href="/admin/avis"
          className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          Gérer les avis
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="mt-4 sm:pl-18">
        <div className="flex items-end gap-3">
          <p className="font-heading text-6xl leading-[0.82] tracking-[-0.06em] text-foreground">
            {reviews.total}
          </p>

          <p className="pb-0.5 font-heading text-2xl tracking-[-0.03em] text-foreground">
            avis
          </p>
        </div>

        <p className="mt-2 text-sm text-muted-foreground">
          sur {accommodations.published} logement
          {accommodations.published > 1 ? "s" : ""} publié
          {accommodations.published > 1 ? "s" : ""}
        </p>

        <div className="mt-5 grid grid-cols-[0.85fr_0.85fr_1.4fr] border-t border-border/50 pt-4">
          <div className="pr-6">
            <p className="font-heading text-3xl leading-none tracking-[-0.04em] text-foreground">
              {averageRating}

              {reviews.total > 0 ? (
                <span className="ml-1 text-sm text-muted-foreground">/ 5</span>
              ) : null}
            </p>

            <p className="mt-1.5 text-sm text-muted-foreground">note moyenne</p>
          </div>

          <div className="border-l border-border/60 px-6">
            <p className="font-heading text-3xl leading-none tracking-[-0.04em] text-foreground">
              {reviews.accommodations.withReviews}

              <span className="ml-1 text-sm text-muted-foreground">
                / {accommodations.published}
              </span>
            </p>

            <p className="mt-1.5 text-sm text-muted-foreground">avec avis</p>
          </div>

          <div className="border-l border-border/60 pl-6">
            <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Dernier import
            </p>

            <p className="mt-2 text-sm text-foreground">
              {reviews.lastImportAt
                ? dateFormatter.format(reviews.lastImportAt)
                : "Aucun import"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
