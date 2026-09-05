import type { AccommodationAmenityInput } from "~/app/admin/logements/schema";

import {
  accommodationAmenityCategories,
  accommodationAmenities,
} from "@/lib/accommodations/accommodation-amenities";

const amenityOrder = new Map(
  accommodationAmenities.map((amenity, index) => [amenity.key, index]),
);

export const normalizeAmenitySearchValue = (value: string) =>
  value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();

export const sortAccommodationAmenities = (
  amenities: AccommodationAmenityInput[],
): AccommodationAmenityInput[] =>
  [...amenities].sort(
    (first, second) =>
      (amenityOrder.get(first.key) ?? Number.MAX_SAFE_INTEGER) -
      (amenityOrder.get(second.key) ?? Number.MAX_SAFE_INTEGER),
  );

type GetFilteredAmenityCategoriesOptions = {
  search: string;
  showSelectedOnly: boolean;
  selectedAmenityKeys: ReadonlySet<AccommodationAmenityInput["key"]>;
};

export const getFilteredAmenityCategories = ({
  search,
  showSelectedOnly,
  selectedAmenityKeys,
}: GetFilteredAmenityCategoriesOptions) => {
  const normalizedSearch = normalizeAmenitySearchValue(search);

  return accommodationAmenityCategories
    .map((category) => ({
      ...category,

      amenities: accommodationAmenities.filter((amenity) => {
        if (amenity.category !== category.id) {
          return false;
        }

        if (showSelectedOnly && !selectedAmenityKeys.has(amenity.key)) {
          return false;
        }

        if (!normalizedSearch) {
          return true;
        }

        return normalizeAmenitySearchValue(
          `${amenity.label} ${category.label}`,
        ).includes(normalizedSearch);
      }),
    }))
    .filter((category) => category.amenities.length > 0);
};
