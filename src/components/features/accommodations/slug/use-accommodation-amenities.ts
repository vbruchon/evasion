import { useMemo, useState } from "react";

import {
  accommodationAmenityCategories,
  accommodationAmenities,
  type AccommodationAmenityKey,
} from "@/lib/accommodations/accommodation-amenities";

import type {
  AccommodationAmenityData,
  AccommodationAmenityDisplay,
  AccommodationAmenityDisplayCategory,
} from "./accommodation-amenities.types";

const AMENITY_PREVIEW_LIMIT = 15;

const amenityPriority: AccommodationAmenityKey[] = [
  "jacuzzi",
  "wifi",
  "mountain-view",
  "air-conditioning",
  "heating",
  "television",
  "cinema",
  "kitchen",
  "coffee-maker",
  "free-parking-on-premises",
  "self-check-in",
  "outdoor-furniture",
  "barbecue",
  "dedicated-workspace",
  "bed-linen",
];

const amenityPriorityOrder = new Map(
  amenityPriority.map((key, index) => [key, index]),
);

type UseAccommodationAmenitiesOptions = {
  amenities: AccommodationAmenityData[];
  editorPreview?: boolean;
};

export const useAccommodationAmenities = ({
  amenities,
  editorPreview = false,
}: UseAccommodationAmenitiesOptions) => {
  const [showAll, setShowAll] = useState(false);

  const selectedDefinitions = useMemo<AccommodationAmenityDisplay[]>(() => {
    const selectedAmenities = new Map(
      amenities.map((amenity) => [amenity.key, amenity] as const),
    );

    return accommodationAmenities
      .filter((amenity) => selectedAmenities.has(amenity.key))
      .map((amenity) => ({
        ...amenity,
        details: selectedAmenities.get(amenity.key)?.details ?? null,
      }));
  }, [amenities]);

  const prioritizedAmenities = useMemo(
    () =>
      [...selectedDefinitions].sort((first, second) => {
        const firstPriority =
          amenityPriorityOrder.get(first.key) ?? Number.MAX_SAFE_INTEGER;

        const secondPriority =
          amenityPriorityOrder.get(second.key) ?? Number.MAX_SAFE_INTEGER;

        return firstPriority - secondPriority;
      }),
    [selectedDefinitions],
  );

  const visibleAmenities = useMemo(
    () =>
      !editorPreview && showAll
        ? selectedDefinitions
        : prioritizedAmenities.slice(0, AMENITY_PREVIEW_LIMIT),
    [editorPreview, prioritizedAmenities, selectedDefinitions, showAll],
  );

  const categories = useMemo<AccommodationAmenityDisplayCategory[]>(
    () =>
      accommodationAmenityCategories
        .map((category) => ({
          ...category,
          amenities: visibleAmenities.filter(
            (amenity) => amenity.category === category.id,
          ),
        }))
        .filter((category) => category.amenities.length > 0),
    [visibleAmenities],
  );

  const canExpand = selectedDefinitions.length > AMENITY_PREVIEW_LIMIT;

  const handleToggleExpanded = () => {
    setShowAll((current) => !current);
  };

  return {
    canExpand,
    categories,
    hasAmenities: selectedDefinitions.length > 0,
    showAll,
    total: selectedDefinitions.length,
    visibleAmenities,
    handleToggleExpanded,
  };
};
