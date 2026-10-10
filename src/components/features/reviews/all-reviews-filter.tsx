import { Loader2 } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type ReviewsAccommodationFilter = {
  id: string;
  name: string;
  slug: string;
};

type AllReviewsFilterProps = {
  accommodations: ReviewsAccommodationFilter[];
  value: string;
  disabled?: boolean;
  loading?: boolean;
  onValueChange: (value: string | null) => void;
};

const ALL_ACCOMMODATIONS_VALUE = "all";

export const AllReviewsFilter = ({
  accommodations,
  value,
  disabled = false,
  loading = false,
  onValueChange,
}: AllReviewsFilterProps) => {
  if (accommodations.length <= 1) {
    return null;
  }

  const label =
    value === ALL_ACCOMMODATIONS_VALUE
      ? "Tous les logements"
      : (accommodations.find((accommodation) => accommodation.slug === value)
          ?.name ?? "Tous les logements");

  return (
    <div className="w-full lg:w-auto">
      <Select value={value} disabled={disabled} onValueChange={onValueChange}>
        <SelectTrigger
          aria-label="Filtrer les avis par logement"
          aria-busy={loading}
          className="h-11 w-full min-w-52 border border-border/60 px-4 py-0 text-xs text-foreground lg:w-auto"
        >
          <SelectValue>{label}</SelectValue>

          {loading ? (
            <Loader2 className="ml-auto size-3.5 animate-spin text-primary" />
          ) : null}
        </SelectTrigger>

        <SelectContent align="end">
          <SelectItem value={ALL_ACCOMMODATIONS_VALUE}>
            Tous les logements
          </SelectItem>

          {accommodations.map((accommodation) => (
            <SelectItem key={accommodation.id} value={accommodation.slug}>
              {accommodation.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
