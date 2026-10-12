import type { ReactNode } from "react";

import { AdminMobileHeader } from "@/components/layout/admin/sidebar/admin-mobile-header";
import { AdminSidebar } from "@/components/layout/admin/sidebar/admin-navigation";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

type AdminDashboardLayoutProps = {
  children: ReactNode;
  modal: ReactNode;
};

export default function AdminDashboardLayout({
  children,
  modal,
}: AdminDashboardLayoutProps) {
  return (
    <SidebarProvider>
      <AdminSidebar />

      <SidebarInset>
        <AdminMobileHeader />

        {children}
        {modal}
      </SidebarInset>
    </SidebarProvider>
  );
}
