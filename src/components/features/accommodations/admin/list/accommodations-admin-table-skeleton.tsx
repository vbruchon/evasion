import { Skeleton } from "@/components/ui/skeleton";

const DESKTOP_ROWS = 5;
const MOBILE_ROWS = 3;

export const AccommodationsAdminTableSkeleton = () => (
  <div aria-busy="true" aria-label="Chargement des logements">
    <div className="mb-4 flex justify-end">
      <Skeleton className="h-10 w-32" />
    </div>

    <div className="hidden overflow-hidden rounded-sm border border-border/60 md:block">
      <div className="grid h-12 grid-cols-[minmax(240px,45%)_10rem_8rem_13rem_minmax(150px,13rem)] items-center border-b border-border/60 px-6">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-14" />
        <Skeleton className="mx-auto h-3 w-14" />
        <Skeleton className="h-3 w-20" />
        <Skeleton className="ml-auto h-3 w-16" />
      </div>

      {Array.from({ length: DESKTOP_ROWS }).map((_, index) => (
        <div
          key={index}
          className="grid h-24 grid-cols-[minmax(240px,45%)_10rem_8rem_13rem_minmax(150px,13rem)] items-center border-b border-border/60 px-6 last:border-b-0"
        >
          <div className="flex items-center gap-4">
            <Skeleton className="size-14 shrink-0" />

            <div>
              <Skeleton className="h-5 w-36" />
              <Skeleton className="mt-2 h-3 w-24" />
            </div>
          </div>

          <Skeleton className="h-7 w-20" />

          <Skeleton className="mx-auto h-4 w-6" />

          <div>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-2 h-3 w-16" />
          </div>

          <div className="flex justify-end gap-2">
            <Skeleton className="size-9" />
            <Skeleton className="size-9" />
            <Skeleton className="size-9" />
          </div>
        </div>
      ))}
    </div>

    <div className="space-y-3 md:hidden">
      {Array.from({ length: MOBILE_ROWS }).map((_, index) => (
        <div key={index} className="border border-border/60 bg-card">
          <div className="p-4">
            <div className="flex items-center gap-4">
              <Skeleton className="size-14 shrink-0" />

              <div className="min-w-0 flex-1">
                <Skeleton className="h-5 w-36 max-w-full" />
                <Skeleton className="mt-2 h-3 w-24" />
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between gap-4">
              <Skeleton className="h-7 w-20" />
              <Skeleton className="h-4 w-20" />
            </div>

            <div className="mt-5 flex justify-between border-t border-border/60 pt-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t border-border/60 p-3">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="size-9" />
          </div>
        </div>
      ))}
    </div>

    <div className="mt-3 flex items-center justify-between border border-border/60 px-4 py-4 md:mt-0 md:border-t-0 md:px-6">
      <Skeleton className="h-4 w-20" />

      <div className="flex gap-2">
        <Skeleton className="size-8" />
        <Skeleton className="size-8" />
      </div>
    </div>

    <span className="sr-only">Chargement des logements…</span>
  </div>
);
