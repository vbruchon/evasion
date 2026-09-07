"use client";

import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { searchAccommodationLocations } from "~/app/admin/logements/action";
import type { AccommodationUpdateFormValues } from "~/app/admin/logements/schema";

import type { AccommodationLocationSearchResult } from "@/lib/admin/accommodation/search-accommodation-locations.action";

type UseAccommodationLocationMapEditorOptions = {
  disabled: boolean;
};

export const useAccommodationLocationMapEditor = ({
  disabled,
}: UseAccommodationLocationMapEditorOptions) => {
  const { control, setValue } = useFormContext<AccommodationUpdateFormValues>();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AccommodationLocationSearchResult[]>(
    [],
  );

  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const [latitude, longitude, radiusMeters] = useWatch({
    control,
    name: ["locationLatitude", "locationLongitude", "locationRadiusMeters"],
  });

  const handleSearch = async () => {
    const normalizedQuery = query.trim();

    if (disabled || isSearching || normalizedQuery.length < 3) {
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    try {
      const nextResults = await searchAccommodationLocations(normalizedQuery);

      setResults(nextResults);

      if (nextResults.length === 0) {
        setSearchError("Aucun lieu trouvé.");
      }
    } catch {
      setResults([]);
      setSearchError("Impossible de rechercher ce lieu pour le moment.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectLocation = (result: AccommodationLocationSearchResult) => {
    if (disabled) {
      return;
    }

    setValue("locationLatitude", result.latitude, {
      shouldDirty: true,
      shouldTouch: true,
    });

    setValue("locationLongitude", result.longitude, {
      shouldDirty: true,
      shouldTouch: true,
    });

    if (radiusMeters === null) {
      setValue("locationRadiusMeters", 5000, {
        shouldDirty: true,
        shouldTouch: true,
      });
    }

    setQuery(result.label);
    setResults([]);
    setSearchError(null);
  };

  const handleRadiusChange = (radius: number) => {
    if (disabled) {
      return;
    }

    setValue("locationRadiusMeters", radius, {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleClearLocation = () => {
    if (disabled) {
      return;
    }

    setValue("locationLatitude", null, {
      shouldDirty: true,
      shouldTouch: true,
    });

    setValue("locationLongitude", null, {
      shouldDirty: true,
      shouldTouch: true,
    });

    setValue("locationRadiusMeters", null, {
      shouldDirty: true,
      shouldTouch: true,
    });

    setQuery("");
    setResults([]);
    setSearchError(null);
  };

  return {
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
  };
};
