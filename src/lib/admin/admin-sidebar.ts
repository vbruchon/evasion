import { House, LayoutDashboard } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type AdminNavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type AdminNavigationGroup = {
  label: string;
  items: AdminNavigationItem[];
};

export const adminNavigation: AdminNavigationGroup[] = [
  {
    label: "Tableau de bord",
    items: [
      {
        label: "Vue d’ensemble",
        href: "/admin",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "Contenu",
    items: [
      {
        label: "Logements",
        href: "/admin/logements",
        icon: House,
      },
    ],
  },
];

export const isAdminRouteActive = (pathname: string, href: string) => {
  if (href === "/admin") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
};
