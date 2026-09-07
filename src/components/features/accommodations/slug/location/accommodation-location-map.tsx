"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

import { useAccommodationLocationMap } from "@/hooks/use-accommodation-location-map";
import { AccommodationLocationMapEmptyState } from "../../admin/editor/section/location/accommodation-location-map-empty-state";
import { AccommodationLocationMapControls } from "./accommodation-location-map-controls";
import { AccommodationLocationMapDialog } from "./accommodation-location-map-dialog";

type AccommodationLocationMapProps = {
  latitude: number | null;
  longitude: number | null;
  radiusMeters: number | null;
  editorPreview?: boolean;
  active?: boolean;
  showControls?: boolean;
  allowExpand?: boolean;
  expanded?: boolean;
  className?: string;
};

export const AccommodationLocationMap = ({
  latitude,
  longitude,
  radiusMeters,
  editorPreview = false,
  active = false,
  showControls = true,
  allowExpand = true,
  expanded = false,
  className,
}: AccommodationLocationMapProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { containerRef, hasLocation, zoomIn, zoomOut, resetView } =
    useAccommodationLocationMap({
      latitude,
      longitude,
      radiusMeters,
      editorPreview,
    });

  const regionClassName = cn(
    "relative isolate min-h-90 overflow-hidden border border-transparent bg-[#080906] xl:min-h-115",

    editorPreview &&
      "cursor-pointer transition-colors hover:border-primary/60!",

    editorPreview && active && "border-primary!",

    expanded && "h-full min-h-0 border-0 xl:min-h-0",

    className,
  );

  const displayControls = hasLocation && showControls && !editorPreview;

  return (
    <>
      <div
        data-editor-region={editorPreview ? "map" : undefined}
        className={regionClassName}
      >
        <div
          ref={containerRef}
          className={cn(
            "absolute inset-0 bg-[#0b0b08]!",
            "[&_.leaflet-tile-pane]:brightness-[0.92]",
            "[&_.leaflet-tile-pane]:contrast-[1.08]",
            "[&_.leaflet-tile-pane]:saturate-[0.82]",
            "[&_.leaflet-tile-pane]:sepia-[0.18]",
            "[&_.leaflet-control-attribution]:rounded-tl-md!",
            "[&_.leaflet-control-attribution]:border-0!",
            "[&_.leaflet-control-attribution]:bg-[#080906]/70!",
            "[&_.leaflet-control-attribution]:px-1.5!",
            "[&_.leaflet-control-attribution]:py-0.5!",
            "[&_.leaflet-control-attribution]:text-[9px]!",
            "[&_.leaflet-control-attribution]:leading-4!",
            "[&_.leaflet-control-attribution]:text-white/40!",
            "[&_.leaflet-control-attribution]:backdrop-blur-sm",
            "[&_.leaflet-control-attribution_a]:text-primary/60!",
            "[&_.leaflet-control-attribution_a]:no-underline!",

            !hasLocation && "invisible",
            editorPreview && "pointer-events-none",
          )}
        />

        {hasLocation ? (
          <div
            aria-hidden
            className="
      pointer-events-none
      absolute inset-0
      z-450
      bg-[radial-gradient(circle_at_center,rgba(200,151,68,0.035)_0%,transparent_60%,rgba(0,0,0,0.16)_100%)]
      shadow-[inset_0_0_45px_rgba(0,0,0,0.18)]
    "
          />
        ) : null}

        {!hasLocation ? (
          <AccommodationLocationMapEmptyState editorPreview={editorPreview} />
        ) : editorPreview ? (
          <p className="pointer-events-none absolute bottom-5 left-1/2 z-500 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.16em] text-muted-foreground/60">
            Aperçu de la carte
          </p>
        ) : null}

        {displayControls ? (
          <AccommodationLocationMapControls
            allowExpand={allowExpand}
            expanded={expanded}
            onZoomIn={zoomIn}
            onZoomOut={zoomOut}
            onReset={resetView}
            onExpand={allowExpand ? () => setIsExpanded(true) : undefined}
          />
        ) : null}
      </div>

      {allowExpand ? (
        <AccommodationLocationMapDialog
          open={isExpanded}
          onOpenChange={setIsExpanded}
        >
          <AccommodationLocationMap
            latitude={latitude}
            longitude={longitude}
            radiusMeters={radiusMeters}
            showControls
            allowExpand={false}
            expanded
          />
        </AccommodationLocationMapDialog>
      ) : null}
    </>
  );
};
