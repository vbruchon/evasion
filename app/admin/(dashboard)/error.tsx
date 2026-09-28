"use client";

import { RotateCcw, TriangleAlert } from "lucide-react";
import Link from "next/link";

import { AdminDashboardStatusPage } from "@/components/layout/admin/status/admin-dashboard-status-page";
import { Button } from "@/components/ui/button";

type AdminDashboardErrorProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function AdminDashboardError({
  reset,
}: AdminDashboardErrorProps) {
  return (
    <AdminDashboardStatusPage
      icon={TriangleAlert}
      eyebrow="Erreur"
      title="Une erreur est survenue"
      description="L’administration n’a pas pu charger correctement ce contenu. Vous pouvez réessayer ou revenir au tableau de bord."
    >
      <Button type="button" onClick={reset}>
        <RotateCcw />
        Réessayer
      </Button>

      <Button
        nativeButton={false}
        variant="outline"
        render={<Link href="/admin" />}
      >
        Tableau de bord
      </Button>
    </AdminDashboardStatusPage>
  );
}
