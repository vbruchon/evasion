import type {
  Accommodation,
  AccommodationImage,
} from "@/generated/prisma/client";
import Image from "next/image";

type AccommodationPresentationProps = {
  accommodation: Pick<
    Accommodation,
    "name" | "shortDescription" | "description"
  >;
  image?: Pick<AccommodationImage, "url" | "alt">;
};

export function AccommodationPresentation({
  accommodation,
  image,
}: AccommodationPresentationProps) {
  return (
    <section className="border-b border-border/60 px-6 py-16 md:px-12 lg:px-20 lg:py-20 xl:px-24">
      <div className="mx-auto grid max-w-420 items-center gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16 xl:gap-20">
        <div className="max-w-lg">
          <p className="section-eyebrow text-primary/85">Notre promesse</p>

          <h2 className="mt-4 max-w-md font-heading text-4xl leading-[1.08] tracking-[-0.02em] lg:text-[2.75rem]">
            {accommodation.shortDescription ?? "Un séjour pensé pour ralentir."}
          </h2>

          {accommodation.description ? (
            <p className="mt-5 max-w-120 whitespace-pre-line text-sm leading-7 text-muted-foreground md:text-base">
              {accommodation.description}
            </p>
          ) : null}
        </div>
        {image ? (
          <div className="relative aspect-4/3 overflow-hidden rounded-sm md:aspect-16/8.5 md:min-h-80 lg:min-h-88">
            <Image
              src={image.url}
              alt={image.alt ?? accommodation.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/10" />
          </div>
        ) : (
          <div className="flex aspect-4/3 items-center justify-center rounded-sm bg-card text-sm text-muted-foreground md:aspect-16/8.5 md:min-h-80 lg:min-h-88">
            Photo à venir
          </div>
        )}
      </div>
    </section>
  );
}
