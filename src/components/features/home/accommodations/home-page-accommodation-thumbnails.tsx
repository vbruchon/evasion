import * as motion from "motion/react-client";
import Image from "next/image";

import { getAccommodationCoverImage } from "@/lib/accommodations/accommodation-images";
import type { AccommodationWithImagesAndHighlights } from "@/lib/accommodations/accommodation-types";
import { cn } from "@/lib/utils";

type HomePageAccommodationThumbnailsProps = {
  accommodations: AccommodationWithImagesAndHighlights[];
  activeIndex: number;
  onSelect: (index: number) => void;
  animated?: boolean;
};

export const HomePageAccommodationThumbnails = ({
  accommodations,
  activeIndex,
  onSelect,
  animated = false,
}: HomePageAccommodationThumbnailsProps) => {
  if (accommodations.length <= 1) {
    return null;
  }

  return (
    <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-[repeat(auto-fit,minmax(120px,1fr))]">
      {accommodations.map((accommodation, index) => {
        const image = getAccommodationCoverImage(accommodation.images);

        const isActive = index === activeIndex;

        return (
          <motion.div
            key={accommodation.id}
            initial={animated ? { opacity: 0, y: 12 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.75,
              delay: animated ? Math.min(index * 0.06, 0.3) : 0,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <button
              type="button"
              aria-label={`Afficher ${accommodation.name}`}
              aria-pressed={isActive}
              onClick={() => onSelect(index)}
              className={cn(
                "group relative block aspect-16/8 w-full cursor-pointer overflow-hidden border transition-colors duration-300",
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
          </motion.div>
        );
      })}
    </div>
  );
};
