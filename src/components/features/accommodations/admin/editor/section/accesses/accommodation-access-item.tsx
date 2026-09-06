import { Check } from "lucide-react";

import type { AccommodationUpdateFormValues } from "~/app/admin/logements/schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type {
  AccommodationAccessDefinition,
  AccommodationAccessKey,
} from "@/lib/accommodations/accommodation-accesses";

type AccommodationAccessItemProps = {
  access: AccommodationAccessDefinition;
  selectedAccess?: AccommodationUpdateFormValues["accesses"][number];
  disabled: boolean;
  selectionLimitReached: boolean;
  onToggle: (key: AccommodationAccessKey) => void;
  onDetailsChange: (key: AccommodationAccessKey, details: string) => void;
};

export const AccommodationAccessItem = ({
  access,
  selectedAccess,
  disabled,
  selectionLimitReached,
  onToggle,
  onDetailsChange,
}: AccommodationAccessItemProps) => {
  const isSelected = Boolean(selectedAccess);

  return (
    <div className="border border-border/60 bg-card/20">
      <Button
        type="button"
        variant="ghost"
        disabled={disabled || (!isSelected && selectionLimitReached)}
        className="h-auto w-full justify-between rounded-none px-4 py-3 text-left hover:bg-muted/40"
        onClick={() => onToggle(access.key)}
      >
        <span className="text-sm font-medium">{access.label}</span>

        <span
          className={`flex size-5 shrink-0 items-center justify-center border ${
            isSelected
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border"
          }`}
        >
          {isSelected ? <Check className="size-3.5" /> : null}
        </span>
      </Button>

      {selectedAccess ? (
        <div className="border-t border-border/60 px-4 py-3">
          <Input
            value={selectedAccess.details}
            disabled={disabled}
            maxLength={300}
            placeholder="Ajouter une précision"
            onChange={(event) =>
              onDetailsChange(access.key, event.target.value)
            }
          />
        </div>
      ) : null}
    </div>
  );
};
