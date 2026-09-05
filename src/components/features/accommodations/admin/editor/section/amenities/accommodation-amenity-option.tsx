import { Check, Pencil } from "lucide-react";

import type { AccommodationAmenityInput } from "~/app/admin/logements/schema";

import { AccommodationAmenityIcon } from "@/components/features/accommodations/accommodation-amenity-icon";
import { Button } from "@/components/ui/button";
import { accommodationAmenities } from "@/lib/accommodations/accommodation-amenities";
import { cn } from "@/lib/utils";

import { AccommodationAmenityDetailsEditor } from "./accommodation-amenity-details-editor";

type AccommodationAmenityDefinition = (typeof accommodationAmenities)[number];

type AccommodationAmenityOptionProps = {
  amenity: AccommodationAmenityDefinition;
  selectedAmenity?: AccommodationAmenityInput;
  editing: boolean;
  disabled?: boolean;
  onToggle: (amenity: AccommodationAmenityDefinition) => void;
  onToggleDetails: (key: AccommodationAmenityInput["key"]) => void;
  onDetailsChange: (
    key: AccommodationAmenityInput["key"],
    value: string,
  ) => void;
  onClearDetails: (key: AccommodationAmenityInput["key"]) => void;
};

export const AccommodationAmenityOption = ({
  amenity,
  selectedAmenity,
  editing,
  disabled = false,
  onToggle,
  onToggleDetails,
  onDetailsChange,
  onClearDetails,
}: AccommodationAmenityOptionProps) => {
  const selected = Boolean(selectedAmenity);

  return (
    <div
      className={cn(
        "border-b border-border/60 transition-colors",
        selected && "bg-primary/3",
      )}
    >
      <div className="flex min-h-13 items-center">
        <Button
          type="button"
          variant="ghost"
          aria-pressed={selected}
          disabled={disabled}
          className="h-auto min-h-13 min-w-0 flex-1 cursor-pointer justify-start gap-3 rounded-none px-3 py-2.5 text-left font-normal hover:bg-transparent disabled:cursor-not-allowed"
          onClick={() => onToggle(amenity)}
        >
          <div
            className={cn(
              "flex size-8 shrink-0 items-center justify-center border transition-colors",
              selected
                ? "border-primary/35 bg-primary/7 text-primary"
                : "border-border/60 text-muted-foreground",
            )}
          >
            <AccommodationAmenityIcon icon={amenity.icon} className="size-4" />
          </div>

          <div className="min-w-0 flex-1 overflow-hidden">
            <p
              title={amenity.label}
              className={cn("truncate text-sm", selected && "font-medium")}
            >
              {amenity.label}
            </p>

            {selectedAmenity?.details ? (
              <p
                title={selectedAmenity.details}
                className="mt-0.5 truncate text-xs text-muted-foreground"
              >
                {selectedAmenity.details}
              </p>
            ) : null}
          </div>

          <div
            className={cn(
              "flex size-5 shrink-0 items-center justify-center border transition-colors",
              selected
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border/70",
            )}
          >
            {selected ? <Check className="size-3" strokeWidth={2} /> : null}
          </div>
        </Button>

        {selected ? (
          <div className="shrink-0 px-2">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              disabled={disabled}
              aria-label={`Modifier la précision de ${amenity.label}`}
              title={
                selectedAmenity?.details
                  ? "Modifier la précision"
                  : "Ajouter une précision"
              }
              className={cn(
                "size-10 cursor-pointer rounded-none text-muted-foreground disabled:cursor-not-allowed",
                "hover:bg-primary/6 hover:text-primary",
                editing && "bg-primary/6 text-primary",
              )}
              onClick={() => onToggleDetails(amenity.key)}
            >
              <Pencil className="size-4" strokeWidth={1.5} />
            </Button>
          </div>
        ) : null}
      </div>

      {selectedAmenity && editing ? (
        <AccommodationAmenityDetailsEditor
          amenityKey={amenity.key}
          amenityLabel={amenity.label}
          value={selectedAmenity.details}
          disabled={disabled}
          onChange={onDetailsChange}
          onClear={onClearDetails}
        />
      ) : null}
    </div>
  );
};
