"use client";

import { AlertTriangle, CheckCircle2, FileUp, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAccommodationReviewsImport } from "@/hooks/use-accommodation-reviews-import";
import type { AccommodationUpdateData } from "@/lib/admin/accommodation/get-accommodation-for-update";

import { AccommodationEditorSectionContent } from "./accommodation-editor-section-content";

type AccommodationReviewsEditorProps = {
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

const formatImportDate = (date: Date) =>
  new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export const AccommodationReviewsEditor = ({
  accommodationId,
  reviews,
  lastReviewsImportAt,
}: AccommodationReviewsEditorProps) => {
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
      <Card className="gap-0 border-border/60 bg-card/30 py-0">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Avis enregistrés
              </p>

              <p className="mt-2 font-heading text-3xl leading-none">
                {reviews.length}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                avis voyageurs
              </p>
            </div>

            <div className="text-right">
              <span
                className={
                  shouldShowReminder
                    ? "inline-flex border border-amber-500/30 bg-amber-500/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-amber-500"
                    : "inline-flex border border-primary/25 bg-primary/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-primary"
                }
              >
                {shouldShowReminder ? "À actualiser" : "À jour"}
              </span>

              {lastReviewsImportAt ? (
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  {formatImportDate(lastReviewsImportAt)}
                </p>
              ) : (
                <p className="mt-2 text-xs text-muted-foreground">
                  Aucun import
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

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
