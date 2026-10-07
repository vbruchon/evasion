import { createPageMetadata } from "@/lib/seo/create-page-metadata";

import { LegalPageLayout } from "@/components/features/legal/legal-page-layout";
import { LegalSection } from "@/components/features/legal/legal-section";
import { displayLegalValue } from "@/lib/legal/legal-site-defaults";
import { getLegalSiteSettings } from "@/lib/legal/queries/get-legal-site-settings";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Mentions légales",
  description:
    "Mentions légales du site Évasion : éditeur, publication et hébergement.",
  path: "/mentions-legales",
});

type LegalInformationProps = {
  label: string;
  value?: string | null;
};

const LegalInformation = ({ label, value }: LegalInformationProps) => (
  <div>
    <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-foreground">
      {label}
    </dt>

    <dd className="mt-1.5">{displayLegalValue(value)}</dd>
  </div>
);

export default async function LegalNoticePage() {
  const settings = await getLegalSiteSettings();

  return (
    <LegalPageLayout
      eyebrow="Informations légales"
      title="Mentions légales"
      description="Les informations relatives à l’éditeur du site, à sa publication et à son hébergement."
    >
      <LegalSection title="Éditeur du site">
        <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
          <LegalInformation
            label="Dénomination sociale"
            value={settings.businessName}
          />

          <LegalInformation
            label="Forme juridique"
            value={settings.legalForm}
          />

          <LegalInformation label="Capital social" value={settings.capital} />

          <LegalInformation
            label="Siège social"
            value={settings.registeredOfficeAddress}
          />

          <LegalInformation label="Adresse e-mail" value={settings.email} />

          <LegalInformation label="Téléphone" value={settings.phone} />
        </dl>
      </LegalSection>

      <LegalSection title="Immatriculation">
        <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
          <LegalInformation label="SIREN" value={settings.siren} />

          <LegalInformation label="SIRET" value={settings.siret} />

          <LegalInformation label="RCS" value={settings.rcs} />

          <LegalInformation label="RNE" value={settings.rne} />

          <LegalInformation
            label="TVA intracommunautaire"
            value={settings.vatNumber}
          />
        </dl>
      </LegalSection>

      <LegalSection title="Publication">
        <dl>
          <LegalInformation
            label="Directeur de la publication"
            value={settings.publicationDirector}
          />
        </dl>
      </LegalSection>

      <LegalSection title="Hébergement">
        <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
          <LegalInformation label="Hébergeur" value={settings.hostName} />

          <LegalInformation
            label="Raison sociale"
            value={settings.hostCompany}
          />

          <LegalInformation label="Adresse" value={settings.hostAddress} />

          <LegalInformation label="Téléphone" value={settings.hostPhone} />
        </dl>
      </LegalSection>

      <LegalSection title="Propriété intellectuelle">
        <p>
          Les textes, photographies, illustrations, éléments graphiques, marques
          et autres contenus présents sur ce site peuvent être protégés par les
          dispositions applicables en matière de propriété intellectuelle.
        </p>

        <p>
          Les droits attachés à ces éléments restent la propriété de leurs
          titulaires respectifs. Toute reproduction, représentation, adaptation
          ou exploitation non autorisée est susceptible de porter atteinte à ces
          droits.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
