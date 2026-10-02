import type { AccommodationWithImages } from "@/lib/accommodations/accommodation-types";

import { AccommodationCard } from "./accommodation-card";

type AccommodationsSectionProps = {
  accommodations: AccommodationWithImages[];
};

export const AccommodationsSection = ({
  accommodations,
}: AccommodationsSectionProps) => (
  <section
    aria-label="Liste des logements"
    className="px-6 py-12 md:px-12 md:py-14 lg:px-16 lg:py-16 xl:px-16"
  >
    {accommodations.length > 0 ? (
      <div className="mx-auto grid max-w-360 gap-8 md:grid-cols-2 lg:gap-6 xl:grid-cols-3">
        {accommodations.map((accommodation, index) => (
          <AccommodationCard
            key={accommodation.id}
            accommodation={accommodation}
            priority={index < 3}
          />
        ))}
      </div>
    ) : (
      <div className="mx-auto max-w-xl border border-primary/20 bg-card/30 px-8 py-14 text-center">
        <ImagePlaceholder />

        <h2 className="mt-5 font-heading text-3xl tracking-[-0.03em]">
          Aucun logement disponible
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
          Les logements seront prochainement disponibles.
        </p>
      </div>
    )}
  </section>
);

const ImagePlaceholder = () => (
  <div className="mx-auto flex size-12 items-center justify-center rounded-full border border-primary/25 text-primary">
    <span className="font-heading text-xl">É</span>
  </div>
);
