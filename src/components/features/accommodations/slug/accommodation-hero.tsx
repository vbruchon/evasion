import type {
  Accommodation,
  AccommodationImage,
} from "@/generated/prisma/client";
import Image from "next/image";
import Link from "next/link";

type AccommodationHeroProps = {
  accommodation: Pick<Accommodation, "name" | "type" | "subtitle">;
  coverImage?: Pick<AccommodationImage, "url" | "alt">;
  hasGallery?: boolean;
};

export function AccommodationHero({
  accommodation,
  coverImage,
  hasGallery = false,
}: AccommodationHeroProps) {
  return (
    <section className="relative flex min-h-140 w-full items-center overflow-hidden px-6 pb-16 pt-32 md:min-h-155 md:px-12 md:pb-20 md:pt-36 lg:min-h-185 lg:px-20 xl:px-24">
      {coverImage ? (
        <Image
          src={coverImage.url}
          alt={coverImage.alt ?? accommodation.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-muted" />
      )}

      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/50 to-black/15" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background to-transparent" />

      <div className="relative flex w-full items-center">
        <div className="max-w-2xl">
          {accommodation.type ? (
            <p className="font-heading text-lg italic text-primary md:text-xl">
              {accommodation.type}
            </p>
          ) : null}

          <h1 className="mt-4 max-w-2xl font-heading text-4xl leading-[0.92] uppercase tracking-tight text-white md:text-6xl">
            {accommodation.name}
          </h1>

          {accommodation.subtitle ? (
            <p className="mt-5 max-w-xl text-base leading-7 text-white/85 md:text-lg">
              {accommodation.subtitle}
            </p>
          ) : null}

          <div className="mt-7 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center gap-8 rounded-sm bg-primary px-7 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Nous contacter
              <span aria-hidden="true">→</span>
            </Link>

            {hasGallery ? (
              <Link
                href="#galerie"
                className="inline-flex h-12 items-center justify-center gap-8 rounded-sm border border-primary/60 bg-black/20 px-7 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-primary/10"
              >
                Voir la galerie
                <span aria-hidden="true">▧</span>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
