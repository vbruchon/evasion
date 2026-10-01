import { LayoutDashboard, Plus } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type AdminDashboardHeaderProps = {
  firstName?: string;
};

export const AdminDashboardHeader = ({
  firstName,
}: AdminDashboardHeaderProps) => (
  <header className="flex flex-col gap-5 border-b border-border/50 pb-6 sm:gap-6 sm:pb-7 lg:flex-row lg:items-center lg:justify-between">
    <div>
      <div className="flex items-center gap-3 sm:gap-4">
        <LayoutDashboard className="size-4 text-primary sm:size-5" />

        <h1 className="font-heading text-2xl tracking-[-0.035em] sm:text-3xl">
          Bonjour{firstName ? `, ${firstName}` : ""} 👋
        </h1>
      </div>

      <p className="mt-1.5 text-xs text-muted-foreground sm:mt-2 sm:text-sm">
        Voici l’état actuel de votre site.
      </p>
    </div>

    <Button
      nativeButton={false}
      className="w-full sm:w-auto"
      render={<Link href="/admin/logements/nouveau" />}
    >
      <Plus />
      Ajouter un logement
    </Button>
  </header>
);
