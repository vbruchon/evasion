import type { AccommodationAmenityInput } from "~/app/admin/logements/schema";

import {
  accommodationAmenityCategories,
  accommodationAmenities,
} from "@/lib/accommodations/accommodation-amenities";

import { AccommodationAmenityOption } from "./accommodation-amenity-option";

type AccommodationAmenityDefinition = (typeof accommodationAmenities)[number];

type AccommodationAmenityCategoryData = {
  id: (typeof accommodationAmenityCategories)[number]["id"];
  label: string;
  amenities: AccommodationAmenityDefinition[];
};

type AccommodationAmenityCategoryProps = {
  category: AccommodationAmenityCategoryData;
  selectedAmenities: ReadonlyMap<
    AccommodationAmenityInput["key"],
    AccommodationAmenityInput
  >;
  editingDetailsKey: AccommodationAmenityInput["key"] | null;
  disabled?: boolean;
  onToggle: (amenity: AccommodationAmenityDefinition) => void;
  onToggleDetails: (key: AccommodationAmenityInput["key"]) => void;
  onDetailsChange: (
    key: AccommodationAmenityInput["key"],
    value: string,
  ) => void;
  onClearDetails: (key: AccommodationAmenityInput["key"]) => void;
};

export const AccommodationAmenityCategory = ({
  category,
  selectedAmenities,
  editingDetailsKey,
  disabled = false,
  onToggle,
  onToggleDetails,
  onDetailsChange,
  onClearDetails,
}: AccommodationAmenityCategoryProps) => {
  const selectedCount = category.amenities.filter((amenity) =>
    selectedAmenities.has(amenity.key),
  ).length;

  return (
    <section>
      <div className="mb-2 flex items-center justify-between gap-3">
        <h3 className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {category.label}
        </h3>

        {selectedCount > 0 ? (
          <span className="text-[10px] text-primary">
            {selectedCount} sélectionné
            {selectedCount > 1 ? "s" : ""}
          </span>
        ) : null}
      </div>

      <div className="border-t border-border/60">
        {category.amenities.map((amenity) => (
          <AccommodationAmenityOption
            key={amenity.key}
            amenity={amenity}
            selectedAmenity={selectedAmenities.get(amenity.key)}
            editing={editingDetailsKey === amenity.key}
            disabled={disabled}
            onToggle={onToggle}
            onToggleDetails={onToggleDetails}
            onDetailsChange={onDetailsChange}
            onClearDetails={onClearDetails}
          />
        ))}
      </div>
    </section>
  );
};
