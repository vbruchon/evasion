import { FileQuestion } from "lucide-react";
import Link from "next/link";

import { AdminDashboardStatusPage } from "@/components/layout/admin/status/admin-dashboard-status-page";
import { Button } from "@/components/ui/button";

export default function AdminDashboardNotFound() {
  return (
    <AdminDashboardStatusPage
      icon={FileQuestion}
      eyebrow="Erreur 404"
      title="Contenu introuvable"
      description="Le contenu que vous recherchez n’existe pas, a été supprimé ou n’est plus disponible."
    >
      <Button nativeButton={false} render={<Link href="/admin" />}>
        Tableau de bord
      </Button>

      <Button
        nativeButton={false}
        variant="outline"
        render={<Link href="/admin/logements" />}
      >
        Voir les logements
      </Button>
    </AdminDashboardStatusPage>
  );
}
