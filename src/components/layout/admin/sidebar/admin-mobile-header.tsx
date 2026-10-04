import Image from "next/image";
import Link from "next/link";

import { SidebarTrigger } from "@/components/ui/sidebar";

export const AdminMobileHeader = () => (
  <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center gap-3 border-b border-border/60 bg-background/95 px-4 backdrop-blur md:hidden">
    <SidebarTrigger
      aria-label="Ouvrir le menu de l’administration"
      className="-ml-2"
    />

    <Link
      href="/admin"
      aria-label="Accueil de l’administration Évasion"
      className="inline-flex items-center"
    >
      <Image
        src="/logo-horizontal.svg"
        alt="Évasion"
        width={120}
        height={34}
        priority
        className="h-auto w-28"
      />
    </Link>

    <span className="ml-auto text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
      Administration
    </span>
  </header>
);
