"use client";

import { useAccommodationAmenities } from "@/hooks/use-accommodation-amenities";
import { AccommodationAmenitiesCategories } from "./accommodation-amenities-categories";
import { AccommodationAmenitiesGrid } from "./accommodation-amenities-grid";
import { AccommodationAmenitiesToggle } from "./accommodation-amenities-toggle";
import type { AccommodationAmenityData } from "./accommodation-amenities.types";

type AccommodationAmenitiesProps = {
  amenities: AccommodationAmenityData[];
  editorPreview?: boolean;
};

export const AccommodationAmenities = ({
  amenities,
  editorPreview = false,
}: AccommodationAmenitiesProps) => {
  const {
    canExpand,
    categories,
    hasAmenities,
    showAll,
    total,
    visibleAmenities,
    handleToggleExpanded,
  } = useAccommodationAmenities({
    amenities,
    editorPreview,
  });

  if (!hasAmenities && !editorPreview) {
    return null;
  }

  return (
    <section
      id="equipements"
      className="scroll-mt-20 border-b border-border/60 px-6 py-14 md:px-12 lg:px-20 lg:py-16 xl:px-24"
    >
      <div className="mx-auto max-w-420">
        <p className="section-eyebrow text-primary/85">Équipements</p>

        <h2 className="mt-2 font-heading text-3xl leading-tight tracking-[-0.02em] md:text-[2.5rem]">
          Ce que propose ce logement
        </h2>

        {hasAmenities ? (
          <>
            <div className="mt-8 md:hidden">
              <AccommodationAmenitiesGrid
                amenities={visibleAmenities}
                showDetails={showAll}
              />
            </div>

            <div className="mt-9 hidden md:block">
              <AccommodationAmenitiesCategories categories={categories} />
            </div>

            {!editorPreview && canExpand ? (
              <AccommodationAmenitiesToggle
                expanded={showAll}
                total={total}
                className="mt-6"
                onToggle={handleToggleExpanded}
              />
            ) : null}
          </>
        ) : (
          <div className="mt-8 flex min-h-32 items-center justify-center border border-dashed border-border/60 bg-card/20 px-6 text-center">
            <p className="max-w-sm text-sm leading-6 text-muted-foreground/60">
              Sélectionnez les équipements proposés dans ce logement.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
