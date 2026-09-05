import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type AccommodationAmenitiesToolbarProps = {
  search: string;
  selectedCount: number;
  totalCount: number;
  showSelectedOnly: boolean;
  disabled?: boolean;
  onSearchChange: (value: string) => void;
  onShowSelectedOnlyChange: (value: boolean) => void;
};

type AmenityFilterButtonProps = {
  label: string;
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
};

const AmenityFilterButton = ({
  label,
  active,
  disabled = false,
  onClick,
}: AmenityFilterButtonProps) => (
  <Button
    type="button"
    variant="ghost"
    disabled={disabled}
    aria-pressed={active}
    className={cn(
      "relative h-9 cursor-pointer rounded-none border-none px-0 text-xs font-normal uppercase tracking-[0.08em]",
      "hover:bg-transparent hover:text-primary",
      active
        ? "text-primary after:absolute after:inset-x-0 after:-bottom-px after:h-px after:bg-primary"
        : "text-muted-foreground",
    )}
    onClick={onClick}
  >
    {label}
  </Button>
);

export const AccommodationAmenitiesToolbar = ({
  search,
  selectedCount,
  totalCount,
  showSelectedOnly,
  disabled = false,
  onSearchChange,
  onShowSelectedOnlyChange,
}: AccommodationAmenitiesToolbarProps) => {
  const hasSingleSelection = selectedCount === 1;

  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          {selectedCount} équipement
          {hasSingleSelection ? "" : "s"} sélectionné
          {hasSingleSelection ? "" : "s"}
        </p>

        <span className="text-xs text-muted-foreground">
          {totalCount} disponibles
        </span>
      </div>

      <div className="space-y-3">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            strokeWidth={1.5}
          />

          <Input
            type="search"
            value={search}
            disabled={disabled}
            placeholder="Rechercher un équipement..."
            className="h-10 rounded-none pl-9"
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>

        <div className="flex items-center gap-5 border-b border-border/50">
          <AmenityFilterButton
            label="Tous"
            active={!showSelectedOnly}
            disabled={disabled}
            onClick={() => onShowSelectedOnlyChange(false)}
          />

          <AmenityFilterButton
            label={`Sélectionnés (${selectedCount})`}
            active={showSelectedOnly}
            disabled={disabled}
            onClick={() => onShowSelectedOnlyChange(true)}
          />
        </div>
      </div>
    </>
  );
};
