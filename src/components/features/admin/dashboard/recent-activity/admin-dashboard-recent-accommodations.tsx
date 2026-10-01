import { ArrowUpRight, House } from "lucide-react";
import Link from "next/link";

import { AdminDashboardRecentActivityColumn } from "@/components/features/admin/dashboard/recent-activity/admin-dashboard-recent-activity-column";
import type { AdminDashboardData } from "@/lib/admin/dashboard/queries/get-admin-dashboard-data";
import { AdminDashboardAccommodationThumbnail } from "./admin-dashboard-accommodation-thumbnail";

const activityDateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

type AdminDashboardRecentAccommodationsProps = {
  recentAccommodations: AdminDashboardData["recentAccommodations"];
};

export const AdminDashboardRecentAccommodations = ({
  recentAccommodations,
}: AdminDashboardRecentAccommodationsProps) => (
  <AdminDashboardRecentActivityColumn
    icon={House}
    title="Logements"
    borderedOnMobile
  >
    {recentAccommodations.length > 0 ? (
      recentAccommodations.map((accommodation, index) => (
        <Link
          key={accommodation.id}
          href={`/admin/logements/${accommodation.id}/modifier`}
          className={`group flex min-h-20 items-center justify-between gap-5 py-4 ${
            index > 0 ? "border-t border-border/50" : ""
          }`}
        >
          <div className="flex min-w-0 items-center gap-3">
            <AdminDashboardAccommodationThumbnail
              src={accommodation.coverImage?.url ?? null}
              alt={
                accommodation.coverImage?.alt ??
                `Photo de ${accommodation.name}`
              }
            />

            <div className="min-w-0">
              <p className="truncate font-heading text-[1.05rem] tracking-[-0.02em] text-foreground transition-colors group-hover:text-primary">
                {accommodation.name}
              </p>

              <div className="mt-0.5 flex items-center gap-2">
                <span className="size-1 rounded-full bg-primary" />

                <span className="text-[0.7rem] text-muted-foreground">
                  {accommodation.status === "PUBLISHED"
                    ? "Publié"
                    : accommodation.status === "DRAFT"
                      ? "Brouillon"
                      : "Archivé"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <time
              dateTime={accommodation.updatedAt.toISOString()}
              className="text-xs text-muted-foreground"
            >
              {activityDateFormatter.format(accommodation.updatedAt)}
            </time>

            <ArrowUpRight className="size-3.5 text-muted-foreground transition-colors group-hover:text-primary" />
          </div>
        </Link>
      ))
    ) : (
      <p className="py-4 text-sm text-muted-foreground">
        Aucun logement modifié récemment.
      </p>
    )}
  </AdminDashboardRecentActivityColumn>
);
