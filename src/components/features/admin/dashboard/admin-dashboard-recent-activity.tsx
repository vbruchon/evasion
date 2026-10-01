import { AdminDashboardRecentAccommodations } from "@/components/features/admin/dashboard/recent-activity/admin-dashboard-recent-accommodations";
import { AdminDashboardRecentPages } from "@/components/features/admin/dashboard/recent-activity/admin-dashboard-recent-pages";
import type { AdminDashboardData } from "@/lib/admin/dashboard/queries/get-admin-dashboard-data";

type AdminDashboardRecentActivityProps = {
  recentPages: AdminDashboardData["recentPages"];
  recentAccommodations: AdminDashboardData["recentAccommodations"];
};

export const AdminDashboardRecentActivity = ({
  recentPages,
  recentAccommodations,
}: AdminDashboardRecentActivityProps) => (
  <section className="mt-4 sm:mt-6">
    <div className="border-y border-border/50">
      <div className="px-5 py-4 sm:px-7">
        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-primary/70">
          Activité
        </p>

        <h2 className="mt-1 font-heading text-2xl tracking-[-0.03em]">
          Dernières modifications
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Les derniers contenus mis à jour sur votre site.
        </p>
      </div>

      <div className="grid border-t border-border/50 lg:grid-cols-2">
        <AdminDashboardRecentPages recentPages={recentPages} />

        <AdminDashboardRecentAccommodations
          recentAccommodations={recentAccommodations}
        />
      </div>
    </div>
  </section>
);
