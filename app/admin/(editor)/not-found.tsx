import { FileQuestion } from "lucide-react";
import Link from "next/link";

import { AdminEditorStatusPage } from "@/components/layout/admin/status/admin-editor-status-page";
import { Button } from "@/components/ui/button";

export default function AdminEditorNotFound() {
  return (
    <AdminEditorStatusPage
      icon={FileQuestion}
      eyebrow="Erreur 404"
      title="Contenu introuvable"
      description="Le contenu que vous essayez de modifier n’existe pas ou n’est plus disponible."
    >
      <Button nativeButton={false} render={<Link href="/admin/logements" />}>
        Voir les logements
      </Button>

      <Button
        nativeButton={false}
        variant="outline"
        render={<Link href="/admin" />}
      >
        Administration
      </Button>
    </AdminEditorStatusPage>
  );
}
