import { AccommodationAmenityItem } from "./accommodation-amenity-item";
import type { AccommodationAmenityDisplay } from "./accommodation-amenities.types";

type AccommodationAmenitiesGridProps = {
  amenities: AccommodationAmenityDisplay[];
  showDetails?: boolean;
};

export const AccommodationAmenitiesGrid = ({
  amenities,
  showDetails = false,
}: AccommodationAmenitiesGridProps) => (
  <div className="grid grid-cols-2 gap-x-4">
    {amenities.map((amenity) => (
      <AccommodationAmenityItem
        key={amenity.key}
        amenity={amenity}
        compact
        showDetails={showDetails}
      />
    ))}
  </div>
);
