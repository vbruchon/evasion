"use client";

import { RotateCcw, TriangleAlert } from "lucide-react";
import Link from "next/link";

import { AdminEditorStatusPage } from "@/components/layout/admin/status/admin-editor-status-page";
import { Button } from "@/components/ui/button";

type AdminEditorErrorProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function AdminEditorError({ reset }: AdminEditorErrorProps) {
  return (
    <AdminEditorStatusPage
      icon={TriangleAlert}
      eyebrow="Erreur"
      title="L’éditeur n’a pas pu être chargé"
      description="Une erreur inattendue empêche l’ouverture de cet éditeur. Vous pouvez réessayer ou revenir à l’administration."
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
        Administration
      </Button>
    </AdminEditorStatusPage>
  );
}
