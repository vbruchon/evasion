"use client";

import { Search, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { AccommodationEditorSectionContent } from "../accommodation-editor-section-content";
import { AccommodationLocationSearchResults } from "./accommodation-location-search-results";
import { AccommodationLocationMap } from "@/components/features/accommodations/slug/location/accommodation-location-map";
import { useAccommodationLocationMapEditor } from "@/hooks/use-accommodation-location-map-editor";

type AccommodationLocationMapEditorProps = {
  disabled?: boolean;
};

export const AccommodationLocationMapEditor = ({
  disabled = false,
}: AccommodationLocationMapEditorProps) => {
  const {
    query,
    results,
    latitude,
    longitude,
    radiusMeters,
    isSearching,
    searchError,
    setQuery,
    handleSearch,
    handleSelectLocation,
    handleRadiusChange,
    handleClearLocation,
  } = useAccommodationLocationMapEditor({
    disabled,
  });

  const hasLocation = latitude !== null && longitude !== null;

  return (
    <AccommodationEditorSectionContent>
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Zone approximative
        </p>

        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          Recherchez un lieu de référence. L’adresse exacte du logement ne sera
          jamais affichée publiquement.
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex gap-2">
          <Input
            value={query}
            disabled={disabled || isSearching}
            placeholder="Bourg-de-Péage, Vercors..."
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key !== "Enter") {
                return;
              }

              event.preventDefault();
              void handleSearch();
            }}
          />

          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={disabled || isSearching || query.trim().length < 3}
            aria-label="Rechercher le lieu"
            onClick={() => void handleSearch()}
          >
            <Search className="size-4" />
          </Button>
        </div>

        {searchError ? (
          <p className="text-xs text-muted-foreground">{searchError}</p>
        ) : null}

        <AccommodationLocationSearchResults
          results={results}
          disabled={disabled}
          onSelect={handleSelectLocation}
        />
      </div>

      {hasLocation ? (
        <>
          <div className="overflow-hidden rounded-lg border border-border/60">
            <AccommodationLocationMap
              latitude={latitude}
              longitude={longitude}
              radiusMeters={radiusMeters}
              showControls={false}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <label htmlFor="location-radius" className="text-sm font-medium">
                Rayon approximatif
              </label>

              <span className="text-xs text-muted-foreground">
                {((radiusMeters ?? 5000) / 1000).toLocaleString("fr-FR")} km
              </span>
            </div>

            <input
              id="location-radius"
              type="range"
              min={500}
              max={15000}
              step={500}
              value={radiusMeters ?? 5000}
              disabled={disabled}
              className="w-full accent-primary"
              onChange={(event) =>
                handleRadiusChange(Number(event.target.value))
              }
            />

            <p className="text-xs leading-5 text-muted-foreground">
              Cette zone représente volontairement une localisation
              approximative.
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            className="w-full"
            onClick={handleClearLocation}
          >
            <Trash2 className="size-4" />
            Supprimer la localisation
          </Button>
        </>
      ) : (
        <div className="flex min-h-36 items-center justify-center border border-dashed border-border/60 bg-card/20 px-6 text-center">
          <p className="max-w-xs text-xs leading-5 text-muted-foreground">
            Recherchez puis sélectionnez un lieu pour définir la zone affichée
            sur la carte.
          </p>
        </div>
      )}
    </AccommodationEditorSectionContent>
  );
};
