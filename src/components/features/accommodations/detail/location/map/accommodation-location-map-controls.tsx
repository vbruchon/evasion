import { LocateFixed, Maximize2, Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AccommodationLocationMapControlsProps = {
  allowExpand?: boolean;
  expanded?: boolean;
  className?: string;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onExpand?: () => void;
};

export const AccommodationLocationMapControls = ({
  allowExpand = true,
  expanded = false,
  className,
  onZoomIn,
  onZoomOut,
  onReset,
  onExpand,
}: AccommodationLocationMapControlsProps) => {
  const controlButtonClassName =
    "size-10 rounded-none text-foreground/80 transition-colors hover:bg-primary/10 hover:text-primary";

  return (
    <>
      <div
        className={cn(
          `
            absolute left-4 top-4 z-700
            flex flex-col
            overflow-hidden
            rounded-md
            border border-primary/25
            bg-[#080806]/90
            shadow-lg
            backdrop-blur-md
          `,
          expanded && "left-5 top-5",
          className,
        )}
      >
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={cn(controlButtonClassName, "border-b border-primary/15")}
          aria-label="Zoomer"
          onClick={onZoomIn}
        >
          <Plus className="size-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={cn(controlButtonClassName, "border-b border-primary/15")}
          aria-label="Dézoomer"
          onClick={onZoomOut}
        >
          <Minus className="size-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={controlButtonClassName}
          aria-label="Recentrer la carte"
          onClick={onReset}
        >
          <LocateFixed className="size-4" />
        </Button>
      </div>

      {allowExpand ? (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="
            absolute right-4 top-4 z-700
            size-10
            rounded-md
            border border-primary/25
            bg-[#080806]/90
            text-foreground/80
            shadow-lg
            backdrop-blur-md
            transition-colors
            hover:border-primary/55
            hover:bg-primary/10
            hover:text-primary
          "
          aria-label="Agrandir la carte"
          onClick={onExpand}
        >
          <Maximize2 className="size-4" />
        </Button>
      ) : null}
    </>
  );
};
