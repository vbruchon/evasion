import { AdminDashboardSiteStatusAlerts } from "@/components/features/admin/dashboard/site-status/admin-dashboard-site-status-alerts";
import { AdminDashboardSiteStatusSuccess } from "@/components/features/admin/dashboard/site-status/admin-dashboard-site-status-success";
import { getAdminDashboardSiteStatusItems } from "@/lib/admin/dashboard/get-admin-dashboard-site-status-items";
import type { AdminDashboardData } from "@/lib/admin/dashboard/queries/get-admin-dashboard-data";

type AdminDashboardSiteStatusProps = {
  siteStatus: AdminDashboardData["siteStatus"];
};

export const AdminDashboardSiteStatus = ({
  siteStatus,
}: AdminDashboardSiteStatusProps) => {
  const attentionItems = getAdminDashboardSiteStatusItems(siteStatus);

  return (
    <section className="relative mt-6 rounded-xl border border-primary/25 bg-card/20 shadow-[0_18px_60px_-40px_rgba(184,134,55,0.55)] sm:mt-7">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-primary/85 via-primary/25 to-transparent"
      />

      {attentionItems.length > 0 ? (
        <AdminDashboardSiteStatusAlerts items={attentionItems} />
      ) : (
        <AdminDashboardSiteStatusSuccess />
      )}
    </section>
  );
};
