import type { LucideIcon } from "lucide-react";
import {
  CircleHelp,
  CircleUserRound,
  FileText,
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
    label: "Logements",
    items: [
      {
        label: "Tous les logements",
        href: "/admin/logements",
        icon: House,
      },
    ],
  },
  {
    label: "Pages du site",
    items: [
      {
        label: "Accueil",
        href: "/admin/accueil",
        icon: Home,
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
  {
    label: "Configuration",
    items: [
      {
        label: "Informations légales",
        href: "/admin/informations-legales",
        icon: FileText,
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
