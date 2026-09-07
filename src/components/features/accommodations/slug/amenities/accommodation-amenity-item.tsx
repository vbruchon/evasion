import { AccommodationAmenityIcon } from "@/components/features/accommodations/accommodation-amenity-icon";
import { cn } from "@/lib/utils";

import type { AccommodationAmenityDisplay } from "./accommodation-amenities.types";

type AccommodationAmenityItemProps = {
  amenity: AccommodationAmenityDisplay;
  compact?: boolean;
  showDetails?: boolean;
};

export const AccommodationAmenityItem = ({
  amenity,
  compact = false,
  showDetails = true,
}: AccommodationAmenityItemProps) => (
  <div
    className={cn(
      "flex items-start border-b border-border/50",
      compact ? "min-h-14 gap-2.5 py-3" : "min-h-12 gap-3 py-2.5",
    )}
  >
    <div
      className={cn(
        "flex shrink-0 items-center justify-center text-primary",
        compact ? "size-7" : "size-8",
      )}
    >
      <AccommodationAmenityIcon icon={amenity.icon} className="size-4" />
    </div>

    <div
      className={cn(
        "min-w-0 flex-1 overflow-hidden",
        compact ? "pt-0.5" : "pt-1",
      )}
    >
      <p title={amenity.label} className="truncate text-sm leading-5">
        {amenity.label}
      </p>

      {showDetails && amenity.details ? (
        <p
          title={amenity.details}
          className={cn(
            "mt-0.5 truncate text-xs text-muted-foreground",
            compact ? "leading-4" : "leading-5",
          )}
        >
          {amenity.details}
        </p>
      ) : null}
    </div>
  </div>
);
