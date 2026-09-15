"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ACCOMMODATION_HIGHLIGHT_ICON_MAP,
  ACCOMMODATION_HIGHLIGHT_ICONS,
  DEFAULT_ACCOMMODATION_HIGHLIGHT_ICON,
} from "@/lib/accommodations/accommodation-highlights";
import { cn } from "@/lib/utils";

type AccommodationHighlightIconPickerProps = {
  index: number;
  selectedIcon?: string | null;
  compact?: boolean;
  disabled?: boolean;
  onChange: (icon: string) => void;
};

export const AccommodationHighlightIconPicker = ({
  index,
  selectedIcon,
  compact = false,
  disabled = false,
  onChange,
}: AccommodationHighlightIconPickerProps) => {
  const [open, setOpen] = useState(false);

  const CurrentIcon =
    (selectedIcon
      ? ACCOMMODATION_HIGHLIGHT_ICON_MAP[selectedIcon]
      : undefined) ??
    ACCOMMODATION_HIGHLIGHT_ICON_MAP[DEFAULT_ACCOMMODATION_HIGHLIGHT_ICON];

  const handleChange = (icon: string) => {
    onChange(icon);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={(nextOpen) => setOpen(nextOpen)}>
      <PopoverTrigger
        render={
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={disabled}
            className={cn(
              "shrink-0 border-border/70 bg-background",
              compact ? "size-9" : "size-10",
            )}
            aria-label={`Modifier l’icône du point fort ${index + 1}`}
          />
        }
      >
        <CurrentIcon
          className={cn("text-primary", compact ? "size-4" : "size-4.5")}
          strokeWidth={1.5}
        />
      </PopoverTrigger>

      <PopoverContent align="start" sideOffset={6} className="w-72 p-3">
        <p className="mb-3 text-xs font-medium text-muted-foreground">
          Choisir une icône
        </p>

        <div className="grid grid-cols-4 gap-2">
          {ACCOMMODATION_HIGHLIGHT_ICONS.map(({ value, label, icon: Icon }) => {
            const selected = selectedIcon === value;

            return (
              <button
                key={value}
                type="button"
                title={label}
                aria-label={label}
                aria-pressed={selected}
                className={cn(
                  "flex aspect-square items-center justify-center border transition-colors",
                  selected
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/60 text-muted-foreground hover:border-primary/40 hover:bg-muted/30 hover:text-foreground",
                )}
                onClick={() => handleChange(value)}
              >
                <Icon className="size-5" strokeWidth={1.5} />
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};
