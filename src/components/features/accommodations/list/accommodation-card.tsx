import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AccommodationWithImages } from "@/lib/accommodations/accommodation-types";

type AccommodationCardProps = {
  accommodation: AccommodationWithImages;
  priority?: boolean;
};

export const AccommodationCard = ({
  accommodation,
  priority = false,
}: AccommodationCardProps) => {
  const coverImage =
    accommodation.images.find((image) => image.isCover) ??
    accommodation.images[0];

  const accommodationHref = `/logements/${accommodation.slug}`;

  const description = accommodation.shortDescription ?? accommodation.subtitle;

  return (
    <Link
      href={accommodationHref}
      aria-label={`Découvrir ${accommodation.name}`}
      className="
    group relative block h-full rounded-sm border border-transparent
    [border-image:linear-gradient(45deg,var(--primary)_0%,color-mix(in_oklab,var(--primary)_22%,transparent)_6%,color-mix(in_oklab,var(--primary)_10%,transparent)_50%,color-mix(in_oklab,var(--primary)_22%,transparent)_94%,var(--primary)_100%)_1]
    before:pointer-events-none
    before:absolute
    before:inset-0
    before:z-20
    before:border
    before:border-primary
    before:opacity-0
    before:transition-opacity
    before:duration-300
    hover:before:opacity-100
  "
    >
      <Card className="flex h-full overflow-hidden rounded-sm bg-card/35! py-0 shadow-none transition-all duration-500 group-hover:border-primary group-hover:bg-card/50">
        <div className="relative block aspect-[1.35/1] overflow-hidden">
          {coverImage ? (
            <Image
              src={coverImage.url}
              alt={coverImage.alt ?? accommodation.name}
              fill
              priority={priority}
              sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1279px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-card text-muted-foreground">
              <Image
                src="/logo-icon.svg"
                alt=""
                width={56}
                height={52}
                aria-hidden="true"
                className="h-auto w-20 opacity-60"
              />

              <span className="text-xs uppercase tracking-[0.2em]">
                Photo à venir
              </span>
            </div>
          )}

          <div className="absolute inset-0 bg-black/15 transition-colors duration-500 group-hover:bg-black/5" />

          <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent" />

          <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/80 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="absolute inset-x-6 bottom-5 flex translate-y-2 items-center gap-3 text-sm text-primary opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <span>Découvrir le logement</span>

            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>

        <CardHeader className="px-6 pb-0 pt-6 md:px-7">
          {accommodation.type ? (
            <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
              <p className="shrink-0 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-primary">
                {accommodation.type}
              </p>

              <span
                aria-hidden="true"
                className="h-px w-10 shrink-0 bg-primary"
              />
            </div>
          ) : null}

          <CardTitle className="font-heading text-3xl font-normal leading-none tracking-[-0.035em] transition-colors duration-300 group-hover:text-primary sm:text-[2rem]">
            {accommodation.name}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-1 px-6 pb-6 pt-4 md:px-7">
          {description ? (
            <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          ) : null}
        </CardContent>
      </Card>
    </Link>
  );
};
