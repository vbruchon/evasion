import { Skeleton } from "@/components/ui/skeleton";

const AdminEditorPreviewSkeleton = () => (
  <div className="h-full overflow-hidden bg-card/10 p-4 sm:p-6 lg:p-8">
    <div className="mx-auto max-w-5xl">
      <Skeleton className="h-64 w-full sm:h-80 lg:h-96" />

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Skeleton className="h-36 w-full" />
        <Skeleton className="h-36 w-full" />
      </div>

      <div className="mt-6 space-y-3">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  </div>
);

const AdminEditorSidebarSkeleton = () => (
  <aside className="hidden h-full min-h-0 flex-col border-l border-border/60 bg-background lg:flex">
    <header className="shrink-0 border-b border-border/60 bg-card/20 px-6 py-6">
      <Skeleton className="h-3 w-14" />
      <Skeleton className="mt-3 h-7 w-40" />
      <Skeleton className="mt-3 h-4 w-full" />
      <Skeleton className="mt-2 h-4 w-4/5" />
    </header>

    <div className="grid grid-cols-3 border-b border-border/60 px-6">
      <div className="flex h-12 items-center justify-center">
        <Skeleton className="h-3 w-14" />
      </div>

      <div className="flex h-12 items-center justify-center">
        <Skeleton className="h-3 w-14" />
      </div>

      <div className="flex h-12 items-center justify-center">
        <Skeleton className="h-3 w-14" />
      </div>
    </div>

    <div className="min-h-0 flex-1 space-y-7 overflow-hidden px-6 py-7">
      <div>
        <Skeleton className="h-4 w-24" />
        <Skeleton className="mt-2 h-10 w-full" />
      </div>

      <div>
        <Skeleton className="h-4 w-32" />
        <Skeleton className="mt-2 h-10 w-full" />
      </div>

      <div>
        <Skeleton className="h-4 w-28" />
        <Skeleton className="mt-2 h-24 w-full" />
      </div>

      <div>
        <Skeleton className="h-4 w-20" />
        <Skeleton className="mt-2 h-40 w-full" />
      </div>
    </div>
  </aside>
);

export const AdminEditorSkeleton = () => (
  <div
    aria-busy="true"
    aria-label="Chargement de l’éditeur"
    className="flex min-h-0 flex-1 flex-col overflow-hidden"
  >
    <header className="flex shrink-0 items-center justify-between gap-2 border-b border-border/60 px-2 py-3 sm:px-4 lg:gap-6 lg:px-6 lg:py-4">
      <div className="flex min-w-0 items-center gap-3">
        <Skeleton className="size-9 sm:hidden" />
        <Skeleton className="hidden h-10 w-36 sm:block" />
        <Skeleton className="hidden h-5 w-32 lg:block" />
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Skeleton className="size-9 sm:hidden" />
        <Skeleton className="hidden h-10 w-28 sm:block" />
        <Skeleton className="h-9 w-28 sm:h-10 sm:w-32" />
      </div>
    </header>

    <div className="relative z-40 grid shrink-0 grid-cols-2 border-b border-border/60 bg-background p-2 lg:hidden">
      <div className="flex h-11 items-center justify-center">
        <Skeleton className="h-4 w-20" />
      </div>

      <div className="flex h-11 items-center justify-center">
        <Skeleton className="h-4 w-20" />
      </div>
    </div>

    <div className="min-h-0 flex-1 overflow-hidden lg:grid lg:grid-cols-[minmax(0,1fr)_420px]">
      <AdminEditorPreviewSkeleton />

      <AdminEditorSidebarSkeleton />
    </div>

    <span className="sr-only">Chargement de l’éditeur…</span>
  </div>
);
