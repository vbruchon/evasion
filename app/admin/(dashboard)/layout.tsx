import type { ReactNode } from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/layout/admin/sidebar/admin-navigation";

type AdminDashboardLayoutProps = {
  children: ReactNode;
};

export default function AdminDashboardLayout({
  children,
}: AdminDashboardLayoutProps) {
  return (
    <SidebarProvider>
      <AdminSidebar />

      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
