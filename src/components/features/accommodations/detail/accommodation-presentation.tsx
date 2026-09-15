import Image from "next/image";

import type {
  AccommodationDisplayImageSource,
  AccommodationPresentationData,
} from "@/lib/accommodations/accommodation-types";
import { ACCOMMODATION_PREVIEW_PLACEHOLDERS } from "@/lib/accommodations/accommodation-preview-placeholders";
import { cn } from "@/lib/utils";

type AccommodationPresentationProps = {
  accommodation: AccommodationPresentationData;
  image?: AccommodationDisplayImageSource;
  editorPreview?: boolean;
};

export const AccommodationPresentation = ({
  accommodation,
  image,
  editorPreview = false,
}: AccommodationPresentationProps) => {
  const hasShortDescription = Boolean(accommodation.shortDescription);
  const hasDescription = Boolean(accommodation.description);
  const hasTextContent = hasShortDescription || hasDescription;

  const showTextContent = hasTextContent || editorPreview;
  const showImage = Boolean(image) || editorPreview;

  if (!showTextContent && !showImage) {
    return null;
  }

  return (
    <section className="border-b border-border/60 px-6 py-16 md:px-12 lg:px-20 lg:py-20 xl:px-24">
      <div
        className={cn(
          "mx-auto grid max-w-420 items-center gap-10",
          showTextContent && showImage && "lg:grid-cols-2 lg:gap-16 xl:gap-20",
        )}
      >
        {showTextContent ? (
          <div className="max-w-xl">
            <p className="section-eyebrow text-primary/85">Notre promesse</p>

            {accommodation.shortDescription ? (
              <h2 className="mt-4 max-w-lg font-heading text-4xl leading-[1.08] tracking-[-0.02em] lg:text-[2.75rem]">
                {accommodation.shortDescription}
              </h2>
            ) : editorPreview ? (
              <h2 className="mt-4 max-w-lg font-heading text-4xl leading-[1.08] tracking-[-0.02em] text-muted-foreground/50 lg:text-[2.75rem]">
                {
                  ACCOMMODATION_PREVIEW_PLACEHOLDERS.presentation
                    .shortDescription
                }
              </h2>
            ) : null}

            {accommodation.description ? (
              <p className="mt-5 max-w-xl whitespace-pre-line text-sm leading-7 text-muted-foreground md:text-base">
                {accommodation.description}
              </p>
            ) : editorPreview ? (
              <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground/50 md:text-base">
                {ACCOMMODATION_PREVIEW_PLACEHOLDERS.presentation.description}
              </p>
            ) : null}
          </div>
        ) : null}

        {image ? (
          <div
            className={cn(
              "relative aspect-4/3 overflow-hidden rounded-sm md:aspect-16/10 md:min-h-80 lg:min-h-88",
              !showTextContent && "mx-auto w-full max-w-4xl",
            )}
          >
            <Image
              src={image.url}
              alt={image.alt ?? accommodation.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/10" />
          </div>
        ) : editorPreview ? (
          <div className="flex aspect-4/3 items-center justify-center rounded-sm bg-card px-6 text-center text-sm text-muted-foreground/60 md:aspect-16/10 md:min-h-80 lg:min-h-88">
            {ACCOMMODATION_PREVIEW_PLACEHOLDERS.presentation.image}
          </div>
        ) : null}
      </div>
    </section>
  );
};
