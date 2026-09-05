import { X } from "lucide-react";

import type { AccommodationAmenityInput } from "~/app/admin/logements/schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type AccommodationAmenityDetailsEditorProps = {
  amenityKey: AccommodationAmenityInput["key"];
  amenityLabel: string;
  value: string;
  disabled?: boolean;
  onChange: (key: AccommodationAmenityInput["key"], value: string) => void;
  onClear: (key: AccommodationAmenityInput["key"]) => void;
};

export const AccommodationAmenityDetailsEditor = ({
  amenityKey,
  amenityLabel,
  value,
  disabled = false,
  onChange,
  onClear,
}: AccommodationAmenityDetailsEditorProps) => (
  <div className="border-t border-border/40 bg-background/40 px-3 py-3">
    <div className="flex items-center justify-between gap-3">
      <label
        htmlFor={`amenity-details-${amenityKey}`}
        className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground"
      >
        Précision
        <span className="ml-1 normal-case tracking-normal text-muted-foreground/60">
          optionnelle
        </span>
      </label>

      <Button
        type="button"
        variant="ghost"
        disabled={disabled}
        aria-label={`Supprimer la précision de ${amenityLabel}`}
        title="Supprimer la précision"
        className="size-7 cursor-pointer rounded-none p-0 text-muted-foreground hover:bg-transparent hover:text-destructive disabled:cursor-not-allowed"
        onClick={() => onClear(amenityKey)}
      >
        <X className="size-3.5" strokeWidth={1.5} />
      </Button>
    </div>

    <Input
      id={`amenity-details-${amenityKey}`}
      type="text"
      value={value}
      disabled={disabled}
      maxLength={300}
      placeholder="Ex. Nespresso, privatif, linge en coton..."
      className="mt-2 h-9 rounded-none"
      onChange={(event) => onChange(amenityKey, event.target.value)}
    />
  </div>
);
