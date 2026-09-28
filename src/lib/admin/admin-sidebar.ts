import type { LucideIcon } from "lucide-react";
import {
  CircleHelp,
  CircleUserRound,
  Home,
  House,
  LayoutDashboard,
  Mail,
  Star,
} from "lucide-react";

type AdminNavigationItem = {
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
        label: "Accueil",
        href: "/admin/accueil",
        icon: Home,
      },
      {
        label: "Logements",
        href: "/admin/logements",
        icon: House,
      },
      {
        label: "Avis",
        href: "/admin/avis",
        icon: Star,
      },
      {
        label: "FAQ",
        href: "/admin/faq",
        icon: CircleHelp,
      },
      {
        label: "À propos",
        href: "/admin/a-propos",
        icon: CircleUserRound,
      },
      {
        label: "Contact",
        href: "/admin/contact",
        icon: Mail,
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
