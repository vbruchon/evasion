"use client";

import type { AccommodationImage } from "@/generated/prisma/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { AccommodationGalleryLightbox } from "./accommodation-gallery-lightbox";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

type AccommodationGalleryProps = {
  accommodationName: string;
  images: Pick<AccommodationImage, "id" | "url" | "alt">[];
};

export function AccommodationGallery({
  accommodationName,
  images,
}: AccommodationGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrevious, setCanScrollPrevious] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const updateCarouselState = () => {
      setCanScrollPrevious(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };

    updateCarouselState();

    carouselApi.on("select", updateCarouselState);
    carouselApi.on("reInit", updateCarouselState);

    return () => {
      carouselApi.off("select", updateCarouselState);
      carouselApi.off("reInit", updateCarouselState);
    };
  }, [carouselApi]);

  if (images.length === 0) {
    return null;
  }

  return (
    <>
      <section
        id="galerie"
        className="scroll-mt-20 border-b border-border/60 px-6 py-14 md:px-12 lg:px-20 lg:py-16 xl:px-24"
      >
        <div className="mx-auto max-w-420">
          <p className="section-eyebrow text-primary/85">Galerie</p>

          <h2 className="mt-2 font-heading text-3xl leading-tight tracking-[-0.02em] md:text-[2.5rem]">
            Découvrez {accommodationName}
          </h2>

          <div className="relative mt-5">
            <Carousel
              setApi={setCarouselApi}
              opts={{
                align: "start",
                containScroll: "trimSnaps",
              }}
            >
              <CarouselContent className="-ml-3">
                {images.map((image, index) => (
                  <CarouselItem
                    key={image.id}
                    className="basis-1/2 pl-3 sm:basis-1/3 lg:basis-1/5"
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedIndex(index)}
                      aria-label={`Agrandir l’image ${index + 1} de ${accommodationName}`}
                      className="group relative block aspect-video w-full cursor-zoom-in overflow-hidden rounded-sm bg-card"
                    >
                      <Image
                        src={image.url}
                        alt={image.alt ?? accommodationName}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/5" />
                    </button>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {canScrollPrevious ? (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => carouselApi?.scrollPrev()}
                aria-label="Faire défiler la galerie vers la gauche"
                className="absolute left-2 top-1/2 z-10 -translate-y-1/2 border-white/20 bg-black/65 text-white backdrop-blur-sm hover:border-primary hover:bg-black/65 hover:text-primary"
              >
                <ChevronLeft className="size-5" />
              </Button>
            ) : null}

            {canScrollNext ? (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => carouselApi?.scrollNext()}
                aria-label="Faire défiler la galerie vers la droite"
                className="absolute right-2 top-1/2 z-10 -translate-y-1/2 border-white/20 bg-black/65 text-white backdrop-blur-sm hover:border-primary hover:bg-black/65 hover:text-primary"
              >
                <ChevronRight className="size-5" />
              </Button>
            ) : null}
          </div>
        </div>
      </section>

      <AccommodationGalleryLightbox
        accommodationName={accommodationName}
        images={images}
        selectedIndex={selectedIndex}
        onSelectedIndexChange={setSelectedIndex}
      />
    </>
  );
}
