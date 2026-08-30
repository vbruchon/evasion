"use client";

import { Plus, Sparkles } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ACCOMMODATION_HIGHLIGHT_ICON_MAP,
  ACCOMMODATION_HIGHLIGHT_PRESETS,
  DEFAULT_ACCOMMODATION_HIGHLIGHT_ICON,
} from "@/lib/accommodations/accommodation-highlights";
import { cn } from "@/lib/utils";

type AccommodationHighlightPresetValue = {
  title: string;
  description: string;
  icon: string;
};

type AccommodationHighlightPresetPickerProps = {
  disabled?: boolean;
  compact?: boolean;
  empty?: boolean;
  onSelect: (highlight: AccommodationHighlightPresetValue) => void;
};

export const AccommodationHighlightPresetPicker = ({
  disabled = false,
  compact = false,
  empty = false,
  onSelect,
}: AccommodationHighlightPresetPickerProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (highlight: AccommodationHighlightPresetValue) => {
    onSelect(highlight);
    setOpen(false);
  };

  const handleCustomSelect = () => {
    handleSelect({
      title: "",
      description: "",
      icon: DEFAULT_ACCOMMODATION_HIGHLIGHT_ICON,
    });
  };

  return (
    <Popover open={open} onOpenChange={(nextOpen) => setOpen(nextOpen)}>
      <PopoverTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            disabled={disabled}
            className={cn(
              "w-full border border-dashed border-border/60 text-muted-foreground",
              empty
                ? compact
                  ? "h-auto py-5 text-xs"
                  : "h-auto py-6 text-sm"
                : compact
                  ? "h-9 text-xs"
                  : "h-10",
            )}
          />
        }
      >
        {empty ? (
          <Sparkles
            className={cn("text-primary", compact ? "size-4" : "size-4")}
            strokeWidth={1.5}
          />
        ) : (
          <Plus className={compact ? "size-3.5" : "size-4"} />
        )}

        {empty ? "Ajouter le premier point fort" : "Ajouter un point fort"}
      </PopoverTrigger>

      <PopoverContent align="start" sideOffset={6} className="w-80 p-0">
        <div className="border-b border-border/60 px-4 py-3">
          <p className="text-sm font-medium">Ajouter un point fort</p>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Choisissez un modèle puis adaptez librement son contenu.
          </p>
        </div>

        <div className="max-h-80 overflow-y-auto p-2">
          {ACCOMMODATION_HIGHLIGHT_PRESETS.map((preset) => {
            const Icon =
              ACCOMMODATION_HIGHLIGHT_ICON_MAP[preset.icon] ??
              ACCOMMODATION_HIGHLIGHT_ICON_MAP[
                DEFAULT_ACCOMMODATION_HIGHLIGHT_ICON
              ];

            return (
              <button
                key={preset.id}
                type="button"
                className="flex w-full items-center gap-3 px-3 py-3 text-left transition-colors hover:bg-muted/40"
                onClick={() =>
                  handleSelect({
                    title: preset.title,
                    description: preset.description,
                    icon: preset.icon,
                  })
                }
              >
                <span className="flex size-9 shrink-0 items-center justify-center border border-border/60 bg-background">
                  <Icon className="size-4 text-primary" strokeWidth={1.5} />
                </span>

                <span className="min-w-0">
                  <span className="block text-sm font-medium">
                    {preset.title}
                  </span>

                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {preset.description}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="border-t border-border/60 p-2">
          <button
            type="button"
            className="flex w-full items-center gap-3 px-3 py-3 text-left transition-colors hover:bg-muted/40"
            onClick={handleCustomSelect}
          >
            <span className="flex size-9 shrink-0 items-center justify-center border border-dashed border-border/70 bg-background">
              <Plus
                className="size-4 text-muted-foreground"
                strokeWidth={1.5}
              />
            </span>

            <span className="min-w-0">
              <span className="block text-sm font-medium">Personnalisé</span>

              <span className="mt-0.5 block text-xs text-muted-foreground">
                Créez votre propre point fort.
              </span>
            </span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
