import { ArrowUpRight, FileText } from "lucide-react";
import Link from "next/link";

import { AdminDashboardRecentActivityColumn } from "@/components/features/admin/dashboard/recent-activity/admin-dashboard-recent-activity-column";
import type { AdminDashboardData } from "@/lib/admin/dashboard/queries/get-admin-dashboard-data";

const activityDateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

type AdminDashboardRecentPagesProps = {
  recentPages: AdminDashboardData["recentPages"];
};

export const AdminDashboardRecentPages = ({
  recentPages,
}: AdminDashboardRecentPagesProps) => (
  <AdminDashboardRecentActivityColumn icon={FileText} title="Pages" divider>
    {recentPages.length > 0 ? (
      recentPages.map((page, index) => (
        <Link
          key={page.id}
          href={page.href}
          className={`group flex min-h-20 items-center justify-between gap-5 py-4 ${
            index > 0 ? "border-t border-border/50" : ""
          }`}
        >
          <div className="flex min-w-0 items-center gap-3">
            <FileText className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />

            <p className="truncate font-heading text-[1.05rem] tracking-[-0.02em] text-foreground transition-colors group-hover:text-primary">
              {page.label}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <time
              dateTime={page.updatedAt.toISOString()}
              className="text-xs text-muted-foreground"
            >
              {activityDateFormatter.format(page.updatedAt)}
            </time>

            <ArrowUpRight className="size-3.5 text-muted-foreground transition-colors group-hover:text-primary" />
          </div>
        </Link>
      ))
    ) : (
      <p className="py-4 text-sm text-muted-foreground">
        Aucune modification récente.
      </p>
    )}
  </AdminDashboardRecentActivityColumn>
);
