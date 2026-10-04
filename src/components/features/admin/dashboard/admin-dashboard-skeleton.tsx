import { Skeleton } from "@/components/ui/skeleton";

const AdminDashboardSummarySkeleton = () => (
  <div className="relative px-5 py-5 sm:px-7 lg:min-h-62.5">
    <div className="flex items-center justify-between gap-5">
      <div className="flex items-center gap-4">
        <Skeleton className="size-11 shrink-0 rounded-full" />
        <Skeleton className="h-3 w-24" />
      </div>

      <Skeleton className="h-4 w-28" />
    </div>

    <div className="mt-5 sm:pl-18">
      <div className="flex items-end gap-3">
        <Skeleton className="h-12 w-16" />
        <Skeleton className="mb-1 h-6 w-20" />
      </div>

      <Skeleton className="mt-3 h-4 w-40" />

      <div className="mt-5 grid grid-cols-2 gap-7 border-t border-border/50 pt-4">
        <div>
          <Skeleton className="h-8 w-10" />
          <Skeleton className="mt-2 h-3 w-20" />
        </div>

        <div className="border-l border-border/60 pl-7">
          <Skeleton className="h-8 w-10" />
          <Skeleton className="mt-2 h-3 w-20" />
        </div>
      </div>
    </div>
  </div>
);

const AdminDashboardOperationalSkeleton = () => (
  <div className="px-5 py-6 sm:px-7 lg:min-h-52">
    <div className="flex items-center gap-4">
      <Skeleton className="size-10 rounded-full" />
      <Skeleton className="h-3 w-28" />
    </div>

    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-4 w-16" />
      </div>

      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-4 w-44" />
        <Skeleton className="h-4 w-20" />
      </div>

      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-14" />
      </div>
    </div>
  </div>
);

const AdminDashboardActivityColumnSkeleton = () => (
  <div className="px-5 py-5 sm:px-7">
    <div className="flex items-center justify-between">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-20" />
    </div>

    <div className="mt-5 space-y-5">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-4 border-b border-border/40 pb-5 last:border-b-0 last:pb-0"
        >
          <Skeleton className="size-10 shrink-0" />

          <div className="min-w-0 flex-1">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="mt-2 h-3 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const AdminDashboardSkeleton = () => (
  <main
    aria-busy="true"
    aria-label="Chargement du tableau de bord"
    className="px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-10 lg:py-10"
  >
    {/* Header */}
    <header className="flex flex-col gap-5 border-b border-border/50 pb-6 sm:gap-6 sm:pb-7 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <div className="flex items-center gap-3 sm:gap-4">
          <Skeleton className="size-5 rounded-full" />
          <Skeleton className="h-8 w-52 sm:w-64" />
        </div>

        <Skeleton className="mt-3 h-4 w-48" />
      </div>

      <Skeleton className="h-10 w-full sm:w-44" />
    </header>

    {/* Statut du site */}
    <section className="mt-6 border border-primary/15 bg-card/20 px-5 py-6 sm:mt-7 sm:px-7">
      <div className="flex items-start gap-4">
        <Skeleton className="size-10 shrink-0 rounded-full" />

        <div className="flex-1">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="mt-3 h-4 w-full max-w-xl" />
          <Skeleton className="mt-2 h-4 w-3/4 max-w-md" />
        </div>
      </div>
    </section>

    {/* Vue d’ensemble */}
    <section className="mt-4 sm:mt-6">
      <div className="border-y border-border/50">
        <div className="grid lg:grid-cols-2">
          <AdminDashboardSummarySkeleton />

          <div className="border-t border-border/50 lg:border-l lg:border-t-0">
            <AdminDashboardSummarySkeleton />
          </div>
        </div>

        <div className="border-t border-border/50">
          <div className="px-5 pt-5 sm:px-7">
            <Skeleton className="h-3 w-32" />
          </div>

          <div className="grid lg:grid-cols-2">
            <AdminDashboardOperationalSkeleton />

            <div className="border-t border-border/50 lg:border-l lg:border-t-0">
              <AdminDashboardOperationalSkeleton />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Activité récente */}
    <section className="mt-4 sm:mt-6">
      <div className="border-y border-border/50">
        <div className="px-5 py-4 sm:px-7">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="mt-3 h-7 w-56" />
          <Skeleton className="mt-3 h-4 w-72 max-w-full" />
        </div>

        <div className="grid border-t border-border/50 lg:grid-cols-2">
          <AdminDashboardActivityColumnSkeleton />

          <div className="border-t border-border/50 lg:border-l lg:border-t-0">
            <AdminDashboardActivityColumnSkeleton />
          </div>
        </div>
      </div>
    </section>

    <span className="sr-only">Chargement du tableau de bord…</span>
  </main>
);
