"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { AdminSidebarFooter } from "./admin-sidebar-footer";
import { AdminSidebarNav } from "./admin-sidebar-nav";
import { adminNavigation } from "@/lib/admin/admin-sidebar";

export const AdminSidebar = () => {
  return (
    <Sidebar
      collapsible="offcanvas"
      className="border-r border-border/60 bg-card"
    >
      <SidebarHeader className="h-24 justify-center border-b border-border/60 px-6">
        <Link
          href="/admin"
          aria-label="Accueil de l’administration Évasion"
          className="inline-flex items-center"
        >
          <Image
            src="/logo-horizontal.svg"
            alt="Évasion"
            width={180}
            height={60}
            priority
            className="h-auto w-full"
          />
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-5">
        <AdminSidebarNav groups={adminNavigation} />
      </SidebarContent>

      <AdminSidebarFooter />
    </Sidebar>
  );
};
