import type { ReactNode } from "react";

import type { AccommodationHeroEditorSection } from "@/lib/admin/accommodation/editor-sections";
import { cn } from "@/lib/utils";

type AccommodationEditorRegionProps = {
  region: AccommodationHeroEditorSection;
  activeRegion?: AccommodationHeroEditorSection;
  className?: string;
  children: ReactNode;
};

export const AccommodationEditorRegion = ({
  region,
  activeRegion,
  className,
  children,
}: AccommodationEditorRegionProps) => {
  return (
    <div
      data-editor-region={region}
      className={cn(
        activeRegion &&
          "cursor-pointer ring-inset transition-[box-shadow,background-color]",
        activeRegion === region
          ? "ring-1 ring-primary bg-primary/4"
          : activeRegion &&
              "hover:ring-1 hover:ring-primary/40 hover:bg-primary/2",
        className,
      )}
    >
      {children}
    </div>
  );
};
