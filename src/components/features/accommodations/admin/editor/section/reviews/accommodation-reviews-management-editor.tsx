"use client";

import { AlertTriangle, CheckCircle2, FileUp, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAccommodationReviewsImport } from "@/hooks/use-accommodation-reviews-import";
import type { AccommodationUpdateData } from "@/lib/admin/accommodation/get-accommodation-for-update";

import { AccommodationEditorSectionContent } from "../accommodation-editor-section-content";
import { AccommodationReviewsStatusCard } from "./accommodation-reviews-status-card";

type AccommodationReviewsManagementEditorProps = {
  accommodationId: string;
  reviews: AccommodationUpdateData["reviews"];
  lastReviewsImportAt: AccommodationUpdateData["lastReviewsImportAt"];
};

const REVIEWS_IMPORT_REMINDER_DAYS = 90;

const isReviewsImportStale = (lastImportAt: Date | null) => {
  if (!lastImportAt) return true;

  const reminderAt = new Date(lastImportAt);

  reminderAt.setDate(reminderAt.getDate() + REVIEWS_IMPORT_REMINDER_DAYS);

  return reminderAt.getTime() <= Date.now();
};

export const AccommodationReviewsManagementEditor = ({
  accommodationId,
  reviews,
  lastReviewsImportAt,
}: AccommodationReviewsManagementEditorProps) => {
  const {
    inputRef,
    isPending,
    result,
    error,
    openFilePicker,
    handleFileChange,
  } = useAccommodationReviewsImport(accommodationId);

  const shouldShowReminder = isReviewsImportStale(lastReviewsImportAt);

  return (
    <AccommodationEditorSectionContent>
      <AccommodationReviewsStatusCard
        reviewCount={reviews.length}
        lastReviewsImportAt={lastReviewsImportAt}
        shouldShowReminder={shouldShowReminder}
      />

      {shouldShowReminder ? (
        <div className="border border-amber-500/30 bg-amber-500/5 p-4">
          <div className="flex gap-3">
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-500" />

            <div>
              <p className="text-sm font-medium">Mise à jour recommandée</p>

              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Les avis n’ont pas été actualisés depuis plus de trois mois.
                Récupérez un nouvel export puis importez-le ici.
              </p>
            </div>
          </div>
        </div>
      ) : null}

      <div className="border-t border-border/60 pt-6">
        <p className="text-sm font-medium">Mettre à jour les avis</p>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Importez le dernier fichier CSV du logement. Les avis déjà présents
          seront automatiquement ignorés.
        </p>

        <input
          ref={inputRef}
          type="file"
          accept=".csv,text/csv"
          className="hidden"
          onChange={handleFileChange}
        />

        <Button
          type="button"
          variant="outline"
          disabled={isPending}
          onClick={openFilePicker}
          className="mt-5 h-auto w-full flex-col border-dashed border-border/70 bg-transparent px-5 py-8 hover:border-primary/40 hover:bg-primary/3"
        >
          <div className="flex size-10 items-center justify-center border border-primary/20 bg-primary/5 text-primary">
            {isPending ? (
              <RefreshCw className="size-4 animate-spin" />
            ) : (
              <FileUp className="size-4" />
            )}
          </div>

          <span className="mt-4 text-sm font-medium">
            {isPending ? "Import en cours..." : "Sélectionner un fichier CSV"}
          </span>

          <span className="mt-1 text-xs font-normal text-muted-foreground">
            Seuls les nouveaux avis seront ajoutés
          </span>
        </Button>
      </div>

      {result ? (
        <div className="border border-primary/25 bg-primary/5 p-4">
          <div className="flex gap-3">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />

            <div>
              <p className="text-sm font-medium">Avis mis à jour</p>

              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {result.imported} nouveau
                {result.imported > 1 ? "x" : ""} avis ajouté
                {result.imported > 1 ? "s" : ""}.
              </p>

              <p className="text-xs leading-5 text-muted-foreground/70">
                {result.total} lus · {result.existing} déjà présent
                {result.existing > 1 ? "s" : ""}
                {result.duplicates > 0
                  ? ` · ${result.duplicates} doublon${result.duplicates > 1 ? "s" : ""} ignoré${result.duplicates > 1 ? "s" : ""}`
                  : ""}
              </p>
            </div>
          </div>
        </div>
      ) : null}

      {error ? (
        <div className="border border-destructive/30 bg-destructive/5 p-4 text-sm leading-6 text-destructive">
          {error}
        </div>
      ) : null}
    </AccommodationEditorSectionContent>
  );
};
