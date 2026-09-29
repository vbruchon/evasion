import type { Metadata } from "next";
import Link from "next/link";

import { LegalPageLayout } from "@/components/features/legal/legal-page-layout";
import { LegalSection } from "@/components/features/legal/legal-section";
import { displayLegalValue } from "@/lib/legal/legal-site-defaults";
import { getLegalSiteSettings } from "@/lib/legal/queries/get-legal-site-settings";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Informations sur la collecte et le traitement des données personnelles sur le site Évasion.",
};

export default async function PrivacyPolicyPage() {
  const settings = await getLegalSiteSettings();

  const privacyEmail = displayLegalValue(
    settings.privacyEmail || settings.email,
  );

  const retentionPeriod = displayLegalValue(
    settings.contactDataRetentionPeriod,
  );

  return (
    <LegalPageLayout
      eyebrow="Vos données"
      title="Politique de confidentialité"
      description="Cette page explique quelles données personnelles peuvent être collectées sur le site, pourquoi elles le sont et quels sont vos droits."
    >
      <LegalSection title="Responsable du traitement">
        <p>
          Le responsable du traitement des données collectées sur ce site est{" "}
          <span className="text-foreground">
            {displayLegalValue(settings.businessName)}
          </span>
          , dont le siège social est situé à{" "}
          <span className="text-foreground">
            {displayLegalValue(settings.registeredOfficeAddress)}
          </span>
          .
        </p>

        <p>
          Pour toute question relative à vos données personnelles, vous pouvez
          nous contacter à l’adresse{" "}
          <span className="text-foreground">{privacyEmail}</span>.
        </p>
      </LegalSection>

      <LegalSection title="Données collectées">
        <p>
          Lorsque vous utilisez le formulaire de contact, les informations
          susceptibles d’être collectées sont :
        </p>

        <ul className="list-disc space-y-2 pl-5">
          <li>votre prénom, lorsque vous choisissez de le renseigner ;</li>
          <li>votre adresse e-mail ;</li>
          <li>le motif de votre demande ;</li>
          <li>
            le logement concerné, lorsque votre demande porte sur un logement ;
          </li>
          <li>le contenu de votre message.</li>
        </ul>

        <p>
          Des informations techniques, notamment votre adresse IP, peuvent
          également être utilisées temporairement afin de sécuriser le
          formulaire et de limiter les envois abusifs.
        </p>
      </LegalSection>

      <LegalSection title="Finalités du traitement">
        <p>
          Les données transmises par le formulaire sont utilisées uniquement
          afin de recevoir votre demande, comprendre son objet et vous apporter
          une réponse.
        </p>

        <p>
          Les données techniques utilisées par les mécanismes de sécurité ont
          pour finalité de prévenir les usages automatisés, abusifs ou
          frauduleux du formulaire.
        </p>
      </LegalSection>

      <LegalSection title="Base juridique">
        <p>
          Lorsqu’une demande concerne un séjour ou un logement, le traitement
          peut être nécessaire à la mise en œuvre de mesures précontractuelles
          prises à votre demande.
        </p>

        <p>
          Pour les autres sollicitations et pour la sécurisation du formulaire,
          le traitement repose sur l’intérêt légitime à répondre aux demandes
          reçues et à protéger le site contre les abus.
        </p>
      </LegalSection>

      <LegalSection title="Destinataires et prestataires">
        <p>
          Les informations transmises sont destinées aux personnes habilitées à
          traiter les demandes reçues par Évasion.
        </p>

        <p>
          Certains prestataires techniques interviennent également dans le
          fonctionnement du formulaire :
        </p>

        <ul className="list-disc space-y-2 pl-5">
          <li>
            <span className="text-foreground">Resend</span>, pour l’acheminement
            des messages par e-mail ;
          </li>
          <li>
            <span className="text-foreground">Cloudflare Turnstile</span>, pour
            la protection contre les envois automatisés ;
          </li>
          <li>
            <span className="text-foreground">Upstash</span>, pour la limitation
            du nombre de demandes envoyées.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Durée de conservation">
        <p>
          Les données liées aux demandes de contact sont conservées pendant la
          durée suivante :
        </p>

        <p className="text-foreground">{retentionPeriod}</p>

        <p>
          Les informations techniques utilisées pour la sécurité et la
          limitation des envois ne sont conservées que pendant la durée
          nécessaire au fonctionnement de ces mécanismes.
        </p>
      </LegalSection>

      <LegalSection title="Vos droits">
        <p>
          Conformément à la réglementation applicable à la protection des
          données personnelles, vous pouvez notamment demander l’accès à vos
          données, leur rectification ou leur effacement ainsi que, lorsque les
          conditions sont réunies, la limitation ou l’opposition à leur
          traitement et la portabilité de vos données.
        </p>

        <p>
          Vous pouvez exercer vos droits en écrivant à{" "}
          <span className="text-foreground">{privacyEmail}</span>.
        </p>

        <p>
          Si vous estimez, après nous avoir contactés, que vos droits ne sont
          pas respectés, vous pouvez introduire une réclamation auprès de la
          Commission nationale de l’informatique et des libertés (CNIL).
        </p>
      </LegalSection>

      <LegalSection title="Cookies et sécurité">
        <p>
          Le site n’utilise actuellement aucun cookie publicitaire ni outil de
          mesure d’audience nécessitant un suivi publicitaire des visiteurs.
        </p>

        <p>
          Le formulaire de contact utilise Cloudflare Turnstile afin de détecter
          les utilisations automatisées et de protéger le service contre les
          abus.
        </p>
      </LegalSection>

      <LegalSection title="Nous contacter">
        <p>
          Pour toute question concernant cette politique ou le traitement de vos
          données personnelles, vous pouvez utiliser notre{" "}
          <Link
            href="/contact"
            className="text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
          >
            formulaire de contact
          </Link>{" "}
          ou écrire à <span className="text-foreground">{privacyEmail}</span>.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
