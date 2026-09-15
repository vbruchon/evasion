import { LocateFixed, Maximize2, Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AccommodationLocationMapControlButton } from "./accommodation-location-map-control-button";

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
        <AccommodationLocationMapControlButton
          icon={Plus}
          label="Zoomer"
          separated
          onClick={onZoomIn}
        />

        <AccommodationLocationMapControlButton
          icon={Minus}
          label="Dézoomer"
          separated
          onClick={onZoomOut}
        />

        <AccommodationLocationMapControlButton
          icon={LocateFixed}
          label="Recentrer la carte"
          onClick={onReset}
        />
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
