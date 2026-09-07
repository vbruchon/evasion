import { MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { AccommodationLocationSearchResult } from "@/lib/admin/accommodation/search-accommodation-locations.action";

type AccommodationLocationSearchResultsProps = {
  results: AccommodationLocationSearchResult[];
  disabled: boolean;
  onSelect: (result: AccommodationLocationSearchResult) => void;
};

export const AccommodationLocationSearchResults = ({
  results,
  disabled,
  onSelect,
}: AccommodationLocationSearchResultsProps) => {
  if (results.length === 0) {
    return null;
  }

  return (
    <div className="divide-y divide-border/60 border border-border/60">
      {results.map((result) => (
        <Button
          key={result.id}
          type="button"
          variant="ghost"
          disabled={disabled}
          className="h-auto w-full justify-start rounded-none px-4 py-3 text-left"
          onClick={() => onSelect(result)}
        >
          <MapPin className="mr-3 size-4 shrink-0 text-primary" />

          <span className="line-clamp-2 text-xs leading-5">{result.label}</span>
        </Button>
      ))}
    </div>
  );
};
