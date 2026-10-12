import { Check, Link2 } from "lucide-react";

import type { AdminDashboardData } from "@/lib/admin/dashboard/queries/get-admin-dashboard-data";

type AdminDashboardBookingSummaryProps = {
  accommodations: AdminDashboardData["accommodations"];
};

export const AdminDashboardBookingSummary = ({
  accommodations,
}: AdminDashboardBookingSummaryProps) => {
  const bookingLinkProgress =
    accommodations.published > 0
      ? Math.round(
          (accommodations.bookingLinks.configured / accommodations.published) *
            100,
        )
      : 0;

  return (
    <div className="border-t border-border/50 px-5 pb-5 pt-3 sm:px-7 xl:min-h-35 xl:border-t-0">
      <div className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-3">
        <div className="flex size-10 items-center justify-center rounded-full bg-primary/6">
          <Link2 className="size-4 text-primary" />
        </div>

        <div>
          <h3 className="font-heading text-xl tracking-tight text-foreground">
            Réservations
          </h3>

          <div className="mt-1 flex items-end gap-2">
            <p className="font-heading text-2xl leading-none tracking-[-0.04em] text-foreground">
              {accommodations.bookingLinks.configured}
            </p>

            <p className="pb-px text-sm text-muted-foreground">
              / {accommodations.published}
            </p>

            <p className="pb-px text-sm text-muted-foreground">
              liens de réservation configurés
            </p>
          </div>

          <div className="mt-3 h-1 overflow-hidden rounded-full bg-primary/15">
            <div
              className="h-full rounded-full bg-primary transition-[width]"
              style={{
                width: `${bookingLinkProgress}%`,
              }}
            />
          </div>

          <div className="mt-3">
            {accommodations.published === 0 ? (
              <p className="text-sm text-muted-foreground">
                Aucun logement publié pour le moment.
              </p>
            ) : accommodations.bookingLinks.missing === 0 ? (
              <div className="flex items-center gap-2">
                <Check className="size-3.5 shrink-0 text-primary" />

                <p className="text-sm text-muted-foreground">
                  Tous les liens sont configurés.
                </p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                {accommodations.bookingLinks.missing} lien
                {accommodations.bookingLinks.missing > 1 ? "s" : ""} à
                renseigner.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
