import { useMemo, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import type {
  AccommodationAmenityInput,
  AccommodationUpdateFormValues,
} from "~/app/admin/logements/schema";

import { accommodationAmenities } from "@/lib/accommodations/accommodation-amenities";

import {
  getFilteredAmenityCategories,
  sortAccommodationAmenities,
} from "./accommodation-amenities-editor.utils";

type UseAccommodationAmenitiesEditorOptions = {
  disabled?: boolean;
};

export const useAccommodationAmenitiesEditor = ({
  disabled = false,
}: UseAccommodationAmenitiesEditorOptions = {}) => {
  const form = useFormContext<AccommodationUpdateFormValues>();

  const [search, setSearch] = useState("");
  const [showSelectedOnly, setShowSelectedOnly] = useState(false);
  const [editingDetailsKey, setEditingDetailsKey] = useState<
    AccommodationAmenityInput["key"] | null
  >(null);

  const watchedAmenities = useWatch({
    control: form.control,
    name: "amenities",
  });

  const selectedAmenities = useMemo(
    () => watchedAmenities ?? [],
    [watchedAmenities],
  );

  const selectedAmenityMap = useMemo(
    () =>
      new Map(
        selectedAmenities.map((amenity) => [amenity.key, amenity] as const),
      ),
    [selectedAmenities],
  );

  const selectedAmenityKeys = useMemo(
    () => new Set(selectedAmenityMap.keys()),
    [selectedAmenityMap],
  );

  const categories = useMemo(
    () =>
      getFilteredAmenityCategories({
        search,
        showSelectedOnly,
        selectedAmenityKeys,
      }),
    [search, selectedAmenityKeys, showSelectedOnly],
  );

  const updateAmenities = (amenities: AccommodationAmenityInput[]) => {
    form.setValue("amenities", sortAccommodationAmenities(amenities), {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleToggle = (amenity: (typeof accommodationAmenities)[number]) => {
    if (disabled) {
      return;
    }

    const selectedAmenity = selectedAmenityMap.get(amenity.key);

    if (selectedAmenity) {
      updateAmenities(
        selectedAmenities.filter((selected) => selected.key !== amenity.key),
      );

      if (editingDetailsKey === amenity.key) {
        setEditingDetailsKey(null);
      }

      return;
    }

    updateAmenities([
      ...selectedAmenities,
      {
        key: amenity.key,
        details: "",
      },
    ]);
  };

  const handleToggleDetails = (key: AccommodationAmenityInput["key"]) => {
    setEditingDetailsKey((current) => (current === key ? null : key));
  };

  const handleDetailsChange = (
    key: AccommodationAmenityInput["key"],
    value: string,
  ) => {
    updateAmenities(
      selectedAmenities.map((amenity) =>
        amenity.key === key
          ? {
              ...amenity,
              details: value,
            }
          : amenity,
      ),
    );
  };

  const handleClearDetails = (key: AccommodationAmenityInput["key"]) => {
    handleDetailsChange(key, "");
    setEditingDetailsKey(null);
  };

  return {
    categories,
    editingDetailsKey,
    search,
    selectedAmenities,
    selectedAmenityMap,
    showSelectedOnly,
    handleClearDetails,
    handleDetailsChange,
    handleToggle,
    handleToggleDetails,
    setSearch,
    setShowSelectedOnly,
  };
};
