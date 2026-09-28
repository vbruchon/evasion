import { PageLinkButton } from "@/components/layout/page-link-button";
import { SiteStatusPage } from "@/components/layout/site-status-page";

export const SiteNotFound = () => (
  <SiteStatusPage
    eyebrow="Page introuvable"
    code="404"
    title="Cette parenthèse n’existe pas."
    description="La page que vous recherchez n’existe plus, a peut-être été déplacée ou l’adresse saisie est incorrecte."
  >
    <PageLinkButton href="/">Retour à l’accueil</PageLinkButton>

    <PageLinkButton href="/logements" variant="text-line">
      Découvrir nos logements
    </PageLinkButton>
  </SiteStatusPage>
);
