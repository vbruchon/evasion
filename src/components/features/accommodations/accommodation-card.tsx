import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AccommodationWithImages } from "@/lib/accommodation-types";

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

  return (
    <Card className="group h-full overflow-hidden rounded-none border-border/70 bg-card py-0 shadow-none transition-colors hover:border-primary/55">
      <Link
        href={accommodationHref}
        aria-label={`Découvrir ${accommodation.name}`}
        className="relative block aspect-4/3 overflow-hidden"
      >
        {coverImage ? (
          <Image
            src={coverImage.url}
            alt={coverImage.alt ?? accommodation.name}
            fill
            priority={priority}
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 420px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-card text-muted-foreground">
            <Image
              src="/logo-icon.svg"
              alt=""
              width={48}
              height={48}
              aria-hidden="true"
              className="h-auto w-20"
            />

            <span className="text-sm">Photo à venir</span>
          </div>
        )}

        <div className="absolute inset-0 bg-black/30 transition-colors duration-500 group-hover:bg-black/5" />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />

        {accommodation.type ? (
          <p className="absolute inset-x-6 bottom-5 text-xs font-medium uppercase tracking-[0.2em] text-primary drop-shadow-sm">
            {accommodation.type}
          </p>
        ) : null}
      </Link>

      <CardHeader className="px-6 pt-6 md:px-7">
        <CardTitle className="font-heading text-3xl leading-tight font-normal">
          <Link
            href={accommodationHref}
            className="transition-colors hover:text-primary"
          >
            {accommodation.name}
          </Link>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 px-6 pb-2 md:px-7">
        {accommodation.subtitle ? (
          <CardDescription className="min-h-14 text-base leading-7 text-muted-foreground">
            {accommodation.subtitle}
          </CardDescription>
        ) : null}
      </CardContent>

      <CardFooter className="px-6 pb-6 md:px-7">
        <Link
          href={accommodationHref}
          className="inline-flex h-11 w-full items-center justify-center border border-primary/40 text-sm text-primary transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
        >
          Découvrir le logement
        </Link>
      </CardFooter>
    </Card>
  );
};
