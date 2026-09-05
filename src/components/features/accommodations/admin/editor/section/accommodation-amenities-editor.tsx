"use client";

import { accommodationAmenities } from "@/lib/accommodations/accommodation-amenities";

import { AccommodationAmenityCategory } from "./amenities/accommodation-amenity-category";
import { AccommodationAmenitiesToolbar } from "./amenities/accommodation-amenities-toolbar";
import { useAccommodationAmenitiesEditor } from "./amenities/use-accommodation-amenities-editor";
import { AccommodationEditorSectionContent } from "./accommodation-editor-section-content";

type AccommodationAmenitiesEditorProps = {
  disabled?: boolean;
};

export const AccommodationAmenitiesEditor = ({
  disabled = false,
}: AccommodationAmenitiesEditorProps) => {
  const {
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
  } = useAccommodationAmenitiesEditor({ disabled });

  return (
    <AccommodationEditorSectionContent>
      <AccommodationAmenitiesToolbar
        search={search}
        selectedCount={selectedAmenities.length}
        totalCount={accommodationAmenities.length}
        showSelectedOnly={showSelectedOnly}
        disabled={disabled}
        onSearchChange={setSearch}
        onShowSelectedOnlyChange={setShowSelectedOnly}
      />

      {categories.length > 0 ? (
        <div className="space-y-7">
          {categories.map((category) => (
            <AccommodationAmenityCategory
              key={category.id}
              category={category}
              selectedAmenities={selectedAmenityMap}
              editingDetailsKey={editingDetailsKey}
              disabled={disabled}
              onToggle={handleToggle}
              onToggleDetails={handleToggleDetails}
              onDetailsChange={handleDetailsChange}
              onClearDetails={handleClearDetails}
            />
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-border/60 px-4 py-8 text-center">
          <p className="text-sm text-muted-foreground">
            {showSelectedOnly
              ? "Aucun équipement sélectionné ne correspond à cette recherche."
              : "Aucun équipement ne correspond à cette recherche."}
          </p>
        </div>
      )}
    </AccommodationEditorSectionContent>
  );
};
