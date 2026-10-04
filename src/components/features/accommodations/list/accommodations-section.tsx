import * as motion from "motion/react-client";

import type { AccommodationWithImages } from "@/lib/accommodations/accommodation-types";

import { AccommodationCard } from "./accommodation-card";

type AccommodationsSectionProps = {
  accommodations: AccommodationWithImages[];
};

const cardTransition = {
  duration: 0.85,
  ease: [0.22, 1, 0.36, 1] as const,
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
          <motion.div
            key={accommodation.id}
            initial={{
              opacity: 0,
              y: 18,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              ...cardTransition,
              delay: index < 3 ? 0.3 + (index % 3) * 0.1 : (index % 3) * 0.1,
            }}
            className="h-full"
          >
            <AccommodationCard
              accommodation={accommodation}
              priority={index < 3}
            />
          </motion.div>
        ))}
      </div>
    ) : (
      <motion.div
        initial={{
          opacity: 0,
          y: 12,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={cardTransition}
        className="mx-auto max-w-xl border border-primary/20 bg-card/30 px-8 py-14 text-center"
      >
        <ImagePlaceholder />

        <h2 className="mt-5 font-heading text-3xl tracking-[-0.03em]">
          Aucun logement disponible
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground">
          Les logements seront prochainement disponibles.
        </p>
      </motion.div>
    )}
  </section>
);

const ImagePlaceholder = () => (
  <div className="mx-auto flex size-12 items-center justify-center rounded-full border border-primary/25 text-primary">
    <span className="font-heading text-xl">É</span>
  </div>
);
