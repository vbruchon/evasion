import { Star } from "lucide-react";

import { AdminEditorSectionContent } from "@/components/layout/admin/editor/admin-editor-section-content";
import type { ReviewsPageReviewsEditorSection } from "@/lib/admin/reviews/editor/editor-sections";
import type { ReviewsPageAdminData } from "@/lib/admin/reviews/queries/get-reviews-page-admin-data";
import { formatRelativeDate } from "@/lib/admin/format-date";

import { ReviewsPageTextField } from "../../form/reviews-page-text-field";

type ReviewsPageReviewsEditorProps = {
  section: ReviewsPageReviewsEditorSection;
  summary: ReviewsPageAdminData["summary"];
  lastReviewsImportAt: string | null;
};

export const ReviewsPageReviewsEditor = ({
  section,
  summary,
  lastReviewsImportAt,
}: ReviewsPageReviewsEditorProps) => {
  if (section === "recent") {
    return (
      <AdminEditorSectionContent>
        <ReviewsPageTextField
          name="recentReviewsEyebrow"
          label="Sur-titre"
          placeholder="Ex. Derniers avis"
        />

        <ReviewsPageTextField
          name="recentReviewsTitle"
          label="Titre"
          placeholder="Titre de la sélection"
        />

        <ReviewsPageTextField
          name="recentReviewsDescription"
          label="Description"
          placeholder="Présentez la sélection des derniers avis"
          multiline
        />

        <p className="border-t border-border/60 pt-5 text-xs leading-5 text-muted-foreground">
          Cette section affiche automatiquement jusqu’à 4 avis récents, en
          privilégiant des logements différents.
        </p>
      </AdminEditorSectionContent>
    );
  }

  return (
    <AdminEditorSectionContent>
      <ReviewsPageTextField
        name="allReviewsTitle"
        label="Titre"
        placeholder="Ex. Tous les avis"
      />

      <ReviewsPageTextField
        name="allReviewsDescription"
        label="Description"
        placeholder="Présentez l’ensemble des avis"
        multiline
      />

      <div className="border-t border-border/60 pt-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Données des avis
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="border border-border/60 bg-card/20 p-4">
            <p className="text-xs text-muted-foreground">Note moyenne</p>

            <div className="mt-2 flex items-center gap-2">
              <Star
                className="size-4 text-primary"
                fill="currentColor"
                strokeWidth={1.4}
              />

              <p className="font-heading text-2xl">
                {summary.averageRating.toFixed(1).replace(".", ",")}
              </p>
            </div>
          </div>

          <div className="border border-border/60 bg-card/20 p-4">
            <p className="text-xs text-muted-foreground">Avis publiés</p>

            <p className="mt-2 font-heading text-2xl">{summary.totalReviews}</p>
          </div>
        </div>

        <div className="mt-3 border border-border/60 bg-card/20 p-4">
          <p className="text-xs text-muted-foreground">Dernière importation</p>

          <p className="mt-1.5 text-sm font-medium">
            {lastReviewsImportAt
              ? formatRelativeDate(new Date(lastReviewsImportAt))
              : "Aucune importation"}
          </p>
        </div>

        <p className="mt-4 text-xs leading-5 text-muted-foreground">
          Les avis sont gérés depuis les logements et apparaissent
          automatiquement ici lorsqu’ils sont publiés.
        </p>
      </div>
    </AdminEditorSectionContent>
  );
};
