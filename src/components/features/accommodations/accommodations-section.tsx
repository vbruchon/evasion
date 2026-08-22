import { AccommodationCard } from "./accommodation-card";
import { AccommodationWithImages } from "@/lib/accommodation-types";

type AccommodationsSectionProps = {
  accommodations: AccommodationWithImages[];
};

export const AccommodationsSection = ({
  accommodations,
}: AccommodationsSectionProps) => {
  return (
    <section
      aria-label="Liste des logements"
      className="px-6 py-10 md:px-12 lg:px-16 lg:py-12 xl:px-20"
    >
      {accommodations.length > 0 ? (
        <div className="mx-auto grid max-w-360 grid-cols-[repeat(auto-fit,minmax(min(100%,380px),420px))] justify-center gap-8">
          {accommodations.map((accommodation, index) => (
            <AccommodationCard
              key={accommodation.id}
              accommodation={accommodation}
              priority={index === 0}
            />
          ))}
        </div>
      ) : (
        <div className="mx-auto max-w-xl border border-border bg-card p-10 text-center">
          <h2 className="font-heading text-3xl">Aucun logement disponible</h2>

          <p className="mt-4 leading-7 text-muted-foreground">
            Les logements seront prochainement disponibles.
          </p>
        </div>
      )}
    </section>
  );
};
