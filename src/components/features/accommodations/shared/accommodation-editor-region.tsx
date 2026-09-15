import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type AccommodationEditorRegionProps<TRegion extends string> = {
  region: TRegion;
  activeRegion?: TRegion;
  className?: string;
  children: ReactNode;
};

export const AccommodationEditorRegion = <TRegion extends string>({
  region,
  activeRegion,
  className,
  children,
}: AccommodationEditorRegionProps<TRegion>) => {
  return (
    <div
      data-editor-region={region}
      className={cn(
        activeRegion &&
          "relative cursor-pointer transition-colors after:pointer-events-none after:absolute after:inset-0 after:z-50 after:transition-shadow",
        activeRegion === region
          ? "bg-primary/4 after:ring-1 after:ring-inset after:ring-primary"
          : activeRegion &&
              "hover:bg-primary/2 hover:after:ring-1 hover:after:ring-inset hover:after:ring-primary/40",
        className,
      )}
    >
      {children}
    </div>
  );
};
