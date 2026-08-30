import type {
  Accommodation,
  AccommodationImage,
} from "@/generated/prisma/client";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { AccommodationKeyDetails } from "../accommodation-key-details";
import {
  AccommodationHighlights,
  type AccommodationHighlightDisplay,
} from "./accommodation-highlights";

type AccommodationHeroProps = {
  accommodation: Pick<
    Accommodation,
    | "name"
    | "type"
    | "subtitle"
    | "guestCapacity"
    | "bedrooms"
    | "beds"
    | "bathrooms"
    | "surface"
  >;

  coverImage?: Pick<AccommodationImage, "url" | "alt">;

  highlights?: AccommodationHighlightDisplay[];

  hasGallery?: boolean;
};

export const AccommodationHero = ({
  accommodation,
  coverImage,
  highlights = [],
  hasGallery = false,
}: AccommodationHeroProps) => {
  const hasKeyDetails = [
    accommodation.guestCapacity,
    accommodation.bedrooms,
    accommodation.beds,
    accommodation.bathrooms,
    accommodation.surface,
  ].some((value) => value !== null);

  const hasHighlights = highlights.length > 0;

  return (
    <section
      className={cn(
        "relative flex min-h-140 w-full flex-col justify-center overflow-hidden px-6 pt-32 md:min-h-155 md:px-12 md:pt-36 lg:min-h-200 lg:px-20 xl:px-24",
        hasHighlights ? "pb-0 lg:pb-28" : "pb-16 md:pb-20 lg:pb-24",
      )}
    >
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

      {!hasHighlights ? (
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background to-transparent" />
      ) : null}

      <div className="relative z-10 flex w-full items-center">
        <div>
          <div className="max-w-2xl">
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
          </div>

          {hasKeyDetails ? (
            <div className="mt-8 lg:mt-12">
              <AccommodationKeyDetails accommodationDetails={accommodation} />
            </div>
          ) : null}

          <div className="mt-8 flex max-w-2xl flex-wrap gap-4 lg:mt-11">
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

      {hasHighlights ? (
        <div className="relative z-10 -mx-6 mt-12 border-t border-white/10 bg-black/45 backdrop-blur-md md:-mx-12 lg:absolute lg:inset-x-0 lg:bottom-0 lg:mx-0 lg:mt-0">
          <AccommodationHighlights highlights={highlights} />
        </div>
      ) : null}
    </section>
  );
};
