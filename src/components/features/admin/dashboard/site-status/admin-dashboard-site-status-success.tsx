import { CircleCheckBig } from "lucide-react";

export const AdminDashboardSiteStatusSuccess = () => (
  <div className="flex flex-col gap-5 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-6">
    <div className="flex items-start gap-4 sm:gap-5">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/[0.07] text-primary shadow-[0_0_28px_-12px_rgba(184,134,55,0.8)] sm:size-12">
        <CircleCheckBig className="size-5" />
      </div>

      <div className="min-w-0">
        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-primary sm:text-[0.65rem]">
          État du site
        </p>

        <h2 className="mt-1.5 font-heading text-2xl tracking-[-0.03em] sm:text-3xl">
          Tout est à jour
        </h2>

        <p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm">
          Aucun élément ne nécessite votre attention pour le moment.
        </p>
      </div>
    </div>

    <div className="flex items-center gap-3 sm:border-l sm:border-border/50 sm:pl-6 sm:pr-2">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary/[0.05] text-primary">
        <CircleCheckBig className="size-3.5" />
      </div>

      <div>
        <p className="text-xs font-medium text-foreground">
          Aucune action requise
        </p>

        <p className="mt-0.5 text-[0.7rem] text-muted-foreground">
          Tous les contrôles sont au vert.
        </p>
      </div>
    </div>
  </div>
);
