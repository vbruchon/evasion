import type { AccommodationHeroGeneralData } from "@/lib/accommodations/accommodation-types";
import { ACCOMMODATION_PREVIEW_PLACEHOLDERS } from "@/lib/accommodations/accommodation-preview-placeholders";

type AccommodationHeroGeneralProps = {
  accommodation: AccommodationHeroGeneralData;
  editorPreview?: boolean;
};

export const AccommodationHeroGeneral = ({
  accommodation,
  editorPreview = false,
}: AccommodationHeroGeneralProps) => {
  return (
    <>
      {accommodation.type ? (
        <p className="font-heading text-lg italic text-primary md:text-xl">
          {accommodation.type}
        </p>
      ) : editorPreview ? (
        <p className="font-heading text-lg italic text-primary/60 md:text-xl">
          {ACCOMMODATION_PREVIEW_PLACEHOLDERS.hero.type}
        </p>
      ) : null}

      <h1 className="mt-4 font-heading text-4xl leading-[0.92] uppercase tracking-tight text-white md:text-6xl lg:mt-7">
        {accommodation.name}
      </h1>

      {accommodation.subtitle ? (
        <p className="mt-5 text-base leading-7 text-white/85 md:text-lg lg:mt-8">
          {accommodation.subtitle}
        </p>
      ) : editorPreview ? (
        <p className="mt-5 text-base leading-7 text-white/45 md:text-lg lg:mt-8">
          {ACCOMMODATION_PREVIEW_PLACEHOLDERS.hero.subtitle}
        </p>
      ) : null}
    </>
  );
};
