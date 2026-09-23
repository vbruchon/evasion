import { Building2, MessageSquareText, Star } from "lucide-react";

import { AdminEditorSectionContent } from "@/components/layout/admin/editor/admin-editor-section-content";
import type { AboutPageAdminData } from "@/lib/admin/about/queries/get-about-page-admin-data";

import { AboutPageTextField } from "../../form/about-page-text-field";

type AboutPageStatsEditorProps = {
  stats: AboutPageAdminData["stats"];
};

const ratingFormatter = new Intl.NumberFormat("fr-FR", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export const AboutPageStatsEditor = ({ stats }: AboutPageStatsEditorProps) => (
  <AdminEditorSectionContent>
    <AboutPageTextField
      name="statsEyebrow"
      label="Sur-titre"
      placeholder="Ex. Évasion en quelques chiffres"
    />

    <AboutPageTextField
      name="statsTitle"
      label="Titre"
      placeholder="Titre de la section"
    />

    <div className="border-t border-border/60 pt-6">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        Données automatiques
      </p>

      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between border border-border/60 bg-card/20 p-4">
          <div className="flex items-center gap-3">
            <Building2 className="size-4 text-primary" />

            <span className="text-sm text-muted-foreground">Logements</span>
          </div>

          <span className="font-heading text-xl">
            {stats.totalAccommodations}
          </span>
        </div>

        <div className="flex items-center justify-between border border-border/60 bg-card/20 p-4">
          <div className="flex items-center gap-3">
            <MessageSquareText className="size-4 text-primary" />

            <span className="text-sm text-muted-foreground">Avis partagés</span>
          </div>

          <span className="font-heading text-xl">{stats.totalReviews}</span>
        </div>

        <div className="flex items-center justify-between border border-border/60 bg-card/20 p-4">
          <div className="flex items-center gap-3">
            <Star
              className="size-4 text-primary"
              fill="currentColor"
              strokeWidth={1.4}
            />

            <span className="text-sm text-muted-foreground">Note moyenne</span>
          </div>

          <span className="font-heading text-xl">
            {stats.totalReviews > 0
              ? `${ratingFormatter.format(stats.averageRating)}/5`
              : "—"}
          </span>
        </div>
      </div>

      <p className="mt-4 text-xs leading-5 text-muted-foreground">
        Ces chiffres sont calculés automatiquement à partir des logements et des
        avis publiés.
      </p>
    </div>
  </AdminEditorSectionContent>
);
