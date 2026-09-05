import { ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AccommodationAmenitiesToggleProps = {
  expanded: boolean;
  total: number;
  className?: string;
  onToggle: () => void;
};

export const AccommodationAmenitiesToggle = ({
  expanded,
  total,
  className,
  onToggle,
}: AccommodationAmenitiesToggleProps) => (
  <div
    className={cn("flex w-full items-center justify-center gap-4", className)}
  >
    <span className="h-px w-10 bg-border/60 sm:w-16" />

    <Button
      type="button"
      variant="link"
      className="group h-auto cursor-pointer rounded-none py-2 text-sm font-normal text-primary no-underline hover:bg-transparent hover:text-primary hover:no-underline"
      onClick={onToggle}
    >
      <span className="relative">
        {expanded ? "Afficher moins" : `Voir tous les équipements (${total})`}

        <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-primary/60 transition-transform duration-300 group-hover:scale-x-100" />
      </span>

      {expanded ? (
        <ChevronUp
          className="size-3.5 text-primary/70 transition-transform duration-300 group-hover:-translate-y-0.5"
          strokeWidth={1.5}
        />
      ) : (
        <ChevronDown
          className="size-3.5 text-primary/70 transition-transform duration-300 group-hover:translate-y-0.5"
          strokeWidth={1.5}
        />
      )}
    </Button>

    <span className="h-px w-10 bg-border/60 sm:w-16" />
  </div>
);
