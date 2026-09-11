import { Card, CardContent } from "@/components/ui/card";

type AccommodationReviewsStatusCardProps = {
  reviewCount: number;
  lastReviewsImportAt: Date | null;
  shouldShowReminder: boolean;
};

const formatImportDate = (date: Date) =>
  new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export const AccommodationReviewsStatusCard = ({
  reviewCount,
  lastReviewsImportAt,
  shouldShowReminder,
}: AccommodationReviewsStatusCardProps) => (
  <Card className="gap-0 border-border/60 bg-card/30 py-0">
    <CardContent className="p-5">
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Avis enregistrés
          </p>

          <p className="mt-2 font-heading text-3xl leading-none">
            {reviewCount}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">avis voyageurs</p>
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
            <p className="mt-2 text-xs text-muted-foreground">Aucun import</p>
          )}
        </div>
      </div>
    </CardContent>
  </Card>
);
