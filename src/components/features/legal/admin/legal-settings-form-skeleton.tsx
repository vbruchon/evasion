import { Skeleton } from "@/components/ui/skeleton";

type LegalSettingsSectionSkeletonProps = {
  fields: number;
};

const LegalSettingsSectionSkeleton = ({
  fields,
}: LegalSettingsSectionSkeletonProps) => (
  <section className="grid gap-8 border border-primary/10 bg-card p-6 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-12 lg:p-8">
    <div>
      <Skeleton className="h-7 w-36" />
      <Skeleton className="mt-3 h-4 w-full max-w-56" />
      <Skeleton className="mt-2 h-4 w-4/5 max-w-48" />
    </div>

    <div className="grid gap-6 sm:grid-cols-2">
      {Array.from({ length: fields }).map((_, index) => (
        <div
          key={index}
          className={fields % 2 !== 0 && index === 0 ? "sm:col-span-2" : ""}
        >
          <Skeleton className="mb-2 h-4 w-28" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
    </div>
  </section>
);

export const LegalSettingsFormSkeleton = () => (
  <div
    aria-busy="true"
    aria-label="Chargement des informations légales"
    className="mt-8 w-full space-y-6"
  >
    <LegalSettingsSectionSkeleton fields={5} />

    <LegalSettingsSectionSkeleton fields={6} />

    <LegalSettingsSectionSkeleton fields={2} />

    <LegalSettingsSectionSkeleton fields={4} />

    <div className="flex justify-end border-t border-border/60 pt-6">
      <Skeleton className="h-10 w-48" />
    </div>

    <span className="sr-only">Chargement des informations légales…</span>
  </div>
);
