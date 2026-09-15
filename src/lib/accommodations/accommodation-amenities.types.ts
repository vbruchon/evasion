import {
  accommodationAmenityCategories,
  accommodationAmenities,
} from "@/lib/accommodations/accommodation-amenities";

export type AccommodationAmenityData = {
  key: string;
  details?: string | null;
};

export type AccommodationAmenityDisplay =
  (typeof accommodationAmenities)[number] & {
    details: string | null;
  };

export type AccommodationAmenityDisplayCategory = {
  id: (typeof accommodationAmenityCategories)[number]["id"];
  label: string;
  amenities: AccommodationAmenityDisplay[];
};
