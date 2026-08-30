import type { Accommodation } from "@/generated/prisma/client";

type AccommodationHeroGeneralProps = {
  accommodation: Pick<Accommodation, "name" | "type" | "subtitle">;
};

export const AccommodationHeroGeneral = ({
  accommodation,
}: AccommodationHeroGeneralProps) => {
  return (
    <>
      {accommodation.type ? (
        <p className="font-heading text-lg italic text-primary md:text-xl">
          {accommodation.type}
        </p>
      ) : null}

      <h1 className="mt-4 font-heading text-4xl leading-[0.92] uppercase tracking-tight text-white md:text-6xl lg:mt-7">
        {accommodation.name}
      </h1>

      {accommodation.subtitle ? (
        <p className="mt-5 text-base leading-7 text-white/85 md:text-lg lg:mt-8">
          {accommodation.subtitle}
        </p>
      ) : null}
    </>
  );
};
