"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  AdminNavigationGroup,
  isAdminRouteActive,
} from "@/lib/admin/admin-sidebar";

type AdminSidebarNavProps = {
  groups: AdminNavigationGroup[];
};

export const AdminSidebarNav = ({ groups }: AdminSidebarNavProps) => {
  const pathname = usePathname();

  return groups.map((group) => (
    <SidebarGroup key={group.label}>
      <SidebarGroupLabel className="px-3 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-primary/70">
        {group.label}
      </SidebarGroupLabel>

      <SidebarGroupContent>
        <SidebarMenu>
          {group.items.map((item) => {
            const active = isAdminRouteActive(pathname, item.href);
            const Icon = item.icon;

            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  isActive={active}
                  tooltip={item.label}
                  className="h-11 gap-3 rounded-sm px-3"
                  render={<Link href={item.href} />}
                >
                  <Icon className="size-4" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  ));
};
