import Image from "next/image";
import { cn } from "@/lib/utils";

import { getAccommodationCoverImage } from "@/lib/accommodations/accommodation-images";
import type { AccommodationWithImagesAndHighlights } from "@/lib/accommodations/accommodation-types";

type HomePageAccommodationThumbnailsProps = {
  accommodations: AccommodationWithImagesAndHighlights[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export const HomePageAccommodationThumbnails = ({
  accommodations,
  activeIndex,
  onSelect,
}: HomePageAccommodationThumbnailsProps) => {
  if (accommodations.length <= 1) {
    return null;
  }

  return (
    <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {accommodations.map((accommodation, index) => {
        const image = getAccommodationCoverImage(accommodation.images);

        const isActive = index === activeIndex;

        return (
          <button
            key={accommodation.id}
            type="button"
            aria-label={`Afficher ${accommodation.name}`}
            aria-pressed={isActive}
            onClick={() => onSelect(index)}
            className={cn(
              "group relative aspect-16/8 cursor-pointer overflow-hidden border transition-colors duration-300",
              isActive
                ? "border-primary"
                : "border-border/50 hover:border-primary/50",
            )}
          >
            {image ? (
              <Image
                src={image.url}
                alt=""
                fill
                sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 250px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 bg-card" />
            )}

            <div
              aria-hidden="true"
              className={cn(
                "absolute inset-0 bg-black transition-colors duration-300",
                isActive
                  ? "bg-black/15"
                  : "bg-black/40 group-hover:bg-black/25",
              )}
            />

            <span className="absolute inset-x-4 bottom-3 truncate text-left font-heading text-base text-white">
              {accommodation.name}
            </span>
          </button>
        );
      })}
    </div>
  );
};
