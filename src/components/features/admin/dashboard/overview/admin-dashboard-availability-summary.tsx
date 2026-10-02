import { CalendarDays, Check } from "lucide-react";

import type { AdminDashboardData } from "@/lib/admin/dashboard/queries/get-admin-dashboard-data";

type AdminDashboardAvailabilitySummaryProps = {
  accommodations: AdminDashboardData["accommodations"];
};

export const AdminDashboardAvailabilitySummary = ({
  accommodations,
}: AdminDashboardAvailabilitySummaryProps) => {
  const calendarProgress =
    accommodations.published > 0
      ? Math.round(
          (accommodations.calendars.configured / accommodations.published) *
            100,
        )
      : 0;

  return (
    <div className="relative px-5 pb-5 pt-3 sm:px-7 lg:min-h-35">
      <div
        aria-hidden="true"
        className="absolute bottom-5 right-0 top-2 hidden w-px bg-border/60 lg:block"
      />

      <div className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-3">
        <div className="flex size-10 items-start justify-center pt-1">
          <CalendarDays className="size-4 text-primary" />
        </div>

        <div>
          <h3 className="font-heading text-xl tracking-tight text-foreground">
            Disponibilités
          </h3>

          <div className="mt-1 flex items-end gap-2">
            <p className="font-heading text-2xl leading-none tracking-[-0.04em] text-foreground">
              {accommodations.calendars.configured}
            </p>

            <p className="pb-px text-sm text-muted-foreground">
              / {accommodations.published}
            </p>

            <p className="pb-px text-sm text-muted-foreground">
              calendriers configurés
            </p>
          </div>

          <div className="mt-3 h-1 overflow-hidden rounded-full bg-primary/15">
            <div
              className="h-full rounded-full bg-primary transition-[width]"
              style={{
                width: `${calendarProgress}%`,
              }}
            />
          </div>

          <div className="mt-3">
            {accommodations.published === 0 ? (
              <p className="text-sm text-muted-foreground">
                Aucun logement publié pour le moment.
              </p>
            ) : accommodations.calendars.missing === 0 ? (
              <div className="flex items-center gap-2">
                <Check className="size-3.5 shrink-0 text-primary" />

                <p className="text-sm text-muted-foreground">
                  Tous les calendriers sont configurés.
                </p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                {accommodations.calendars.missing} calendrier
                {accommodations.calendars.missing > 1 ? "s" : ""} à configurer.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
