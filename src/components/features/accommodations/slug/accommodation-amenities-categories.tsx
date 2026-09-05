import { AccommodationAmenityItem } from "./accommodation-amenity-item";
import type { AccommodationAmenityDisplayCategory } from "./accommodation-amenities.types";

type AccommodationAmenitiesCategoriesProps = {
  categories: AccommodationAmenityDisplayCategory[];
};

export const AccommodationAmenitiesCategories = ({
  categories,
}: AccommodationAmenitiesCategoriesProps) => (
  <div className="gap-x-12 md:columns-2 xl:columns-3">
    {categories.map((category) => (
      <section
        key={category.id}
        className="mb-9 inline-block w-full break-inside-avoid align-top"
      >
        <h3 className="mb-2.5 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
          {category.label}
        </h3>

        <div className="border-t border-border/50">
          {category.amenities.map((amenity) => (
            <AccommodationAmenityItem key={amenity.key} amenity={amenity} />
          ))}
        </div>
      </section>
    ))}
  </div>
);
