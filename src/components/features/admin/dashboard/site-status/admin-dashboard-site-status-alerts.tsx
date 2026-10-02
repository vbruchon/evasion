import { TriangleAlert } from "lucide-react";

import { AdminDashboardAttentionGroup } from "./admin-dashboard-attention-group";
import {
  type AdminDashboardAttentionItemProps,
  AdminDashboardAttentionItem,
} from "./admin-dashboard-attention-item";
import {
  getAdminDashboardAttentionItemClassName,
  getAdminDashboardSiteStatusGridClassName,
} from "@/lib/admin/dashboard/site-status/admin-dashboard-site-status-layout";

type AdminDashboardSiteStatusAlertsProps = {
  items: AdminDashboardAttentionItemProps[];
};

export const AdminDashboardSiteStatusAlerts = ({
  items,
}: AdminDashboardSiteStatusAlertsProps) => (
  <>
    <div className="flex items-start gap-4 px-5 py-5 sm:gap-5 sm:px-6 sm:py-6">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/[0.07] text-primary shadow-[0_0_28px_-12px_rgba(184,134,55,0.8)] sm:size-12">
        <TriangleAlert className="size-5" />
      </div>

      <div className="min-w-0">
        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-primary sm:text-[0.65rem]">
          État du site
        </p>

        <h2 className="mt-1.5 font-heading text-2xl tracking-[-0.03em] sm:text-3xl">
          À surveiller
        </h2>

        <p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm">
          Les éléments essentiels au bon fonctionnement du site.
        </p>
      </div>
    </div>

    <AdminDashboardAttentionGroup
      className={`grid border-t border-border/50 ${getAdminDashboardSiteStatusGridClassName(
        items.length,
      )}`}
    >
      {items.map((item, index) => (
        <AdminDashboardAttentionItem
          key={item.title}
          {...item}
          className={getAdminDashboardAttentionItemClassName(
            index,
            items.length,
          )}
        />
      ))}
    </AdminDashboardAttentionGroup>
  </>
);
