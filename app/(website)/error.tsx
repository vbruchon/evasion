"use client";

import { Button } from "@/components/ui/button";
import { PageLinkButton } from "@/components/layout/page-link-button";
import { SiteStatusPage } from "@/components/layout/site-status-page";

type WebsiteErrorProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function WebsiteError({ reset }: WebsiteErrorProps) {
  return (
    <SiteStatusPage
      eyebrow="Une erreur est survenue"
      title="La page n’a pas pu être chargée."
      description="Un problème inattendu nous empêche d’afficher cette page pour le moment. Vous pouvez réessayer ou revenir à l’accueil."
    >
      <Button type="button" size="lg" onClick={reset} className="px-8">
        Réessayer
      </Button>

      <PageLinkButton href="/" variant="text-line">
        Retour à l’accueil
      </PageLinkButton>
    </SiteStatusPage>
  );
}
