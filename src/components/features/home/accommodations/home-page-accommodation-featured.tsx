import { BedDouble, Sparkles, UserRound } from "lucide-react";
import Image from "next/image";

import { PageLinkButton } from "@/components/layout/page-link-button";
import { getAccommodationCoverImage } from "@/lib/accommodations/accommodation-images";
import type { AccommodationWithImagesAndHighlights } from "@/lib/accommodations/accommodation-types";

type HomePageAccommodationFeaturedProps = {
  accommodation: AccommodationWithImagesAndHighlights;
  index: number;
};

export const HomePageAccommodationFeatured = ({
  accommodation,
  index,
}: HomePageAccommodationFeaturedProps) => {
  const coverImage = getAccommodationCoverImage(accommodation.images);

  const primaryHighlight = accommodation.highlights[0];

  return (
    <div className="grid min-w-0 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.75fr)]">
      <div className="relative aspect-16/10 overflow-hidden lg:aspect-auto lg:min-h-90">
        {coverImage ? (
          <Image
            key={coverImage.url}
            src={coverImage.url}
            alt={coverImage.alt ?? accommodation.name}
            fill
            sizes="(max-width: 1023px) 100vw, 45vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-card">
            <Image
              src="/logo-icon.svg"
              alt=""
              width={72}
              height={72}
              aria-hidden="true"
              className="h-auto w-18 opacity-50"
            />
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center border border-border/60 bg-card/45 p-7 lg:border-l-0 xl:p-8">
        <div className="flex items-center gap-3">
          <span className="text-[0.65rem] font-medium tracking-[0.2em] text-primary">
            {String(index + 1).padStart(2, "0")}
          </span>

          <span aria-hidden="true" className="h-px w-8 bg-primary/60" />
        </div>

        <h3 className="mt-5 font-heading text-3xl font-normal leading-none xl:text-[2.5rem]">
          {accommodation.name}
        </h3>

        {accommodation.subtitle ? (
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {accommodation.subtitle}
          </p>
        ) : null}

        <div className="mt-6">
          <div aria-hidden="true" className="mb-5 h-px w-[88%] bg-border/40" />

          <div className="grid w-full min-w-0 max-w-full overflow-hidden lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.75fr)]">
            {accommodation.guestCapacity ? (
              <div className="flex min-w-0 items-center gap-1.5 whitespace-nowrap text-[0.7rem] text-foreground/80">
                <UserRound
                  aria-hidden="true"
                  className="size-3.5 shrink-0 text-primary"
                />

                <span>
                  {accommodation.guestCapacity}{" "}
                  {accommodation.guestCapacity > 1 ? "voyageurs" : "voyageur"}
                </span>
              </div>
            ) : null}

            {accommodation.bedrooms ? (
              <div className="flex min-w-0 flex-col justify-center border border-border/60 bg-card/45 p-5 sm:p-7 lg:border-l-0 xl:p-8">
                <BedDouble
                  aria-hidden="true"
                  className="size-3.5 shrink-0 text-primary"
                />

                <span>
                  {accommodation.bedrooms}{" "}
                  {accommodation.bedrooms > 1 ? "chambres" : "chambre"}
                </span>
              </div>
            ) : null}

            {primaryHighlight ? (
              <div className="col-span-2 flex min-w-0 items-center gap-1.5 text-[0.7rem] text-foreground/80 sm:col-span-1">
                <Sparkles
                  aria-hidden="true"
                  className="size-3.5 shrink-0 text-primary"
                />

                <span className="truncate">{primaryHighlight.title}</span>
              </div>
            ) : null}
          </div>
        </div>

        <PageLinkButton
          href={`/logements/${accommodation.slug}`}
          className="mt-5 w-full"
        >
          Découvrir le logement
        </PageLinkButton>
      </div>
    </div>
  );
};
