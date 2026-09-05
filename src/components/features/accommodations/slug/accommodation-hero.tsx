import Image from "next/image";

import { AccommodationEditorRegion } from "@/components/features/accommodations/admin/editor/accommodation-editor-region";
import type {
  AccommodationDisplayImageSource,
  AccommodationHeroData,
  AccommodationHighlightDisplay,
} from "@/lib/accommodations/accommodation-types";
import { ACCOMMODATION_PREVIEW_PLACEHOLDERS } from "@/lib/accommodations/accommodation-preview-placeholders";
import type { AccommodationHeroEditorSection } from "@/lib/admin/accommodation/editor-sections";
import { cn } from "@/lib/utils";

import { AccommodationKeyDetails } from "../accommodation-key-details";
import { AccommodationHeroActions } from "./accommodation-hero-actions";
import { AccommodationHeroGeneral } from "./accommodation-hero-general";
import { AccommodationHighlights } from "./accommodation-highlights";

type AccommodationHeroProps = {
  accommodation: AccommodationHeroData;
  coverImage?: AccommodationDisplayImageSource;
  highlights?: AccommodationHighlightDisplay[];
  hasGallery?: boolean;
  activeEditorRegion?: AccommodationHeroEditorSection;
  editorPreview?: boolean;
};

export const AccommodationHero = ({
  accommodation,
  coverImage,
  highlights = [],
  hasGallery = false,
  activeEditorRegion,
  editorPreview = false,
}: AccommodationHeroProps) => {
  const hasKeyDetails = [
    accommodation.guestCapacity,
    accommodation.bedrooms,
    accommodation.beds,
    accommodation.bathrooms,
    accommodation.surface,
  ].some((value) => value !== null);

  const hasHighlights = highlights.length > 0;

  const showKeyDetails = hasKeyDetails || editorPreview;
  const showHighlights = hasHighlights || editorPreview;

  const background = (
    <>
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

      {!showHighlights ? (
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background to-transparent" />
      ) : null}
    </>
  );

  return (
    <section
      className={cn(
        "relative flex min-h-140 w-full flex-col justify-center overflow-hidden px-6 pt-32 md:min-h-155 md:px-12 md:pt-36 lg:min-h-200 lg:px-20 xl:px-24",
        showHighlights ? "pb-0 lg:pb-28" : "pb-16 md:pb-20 lg:pb-24",
      )}
    >
      {background}

      {editorPreview && !coverImage ? (
        <AccommodationEditorRegion
          region="image"
          activeRegion={activeEditorRegion}
          className="absolute right-[8%] top-1/2 z-20 hidden -translate-y-1/2 p-1 lg:block"
        >
          <div className="border border-white/15 bg-black/30 px-4 py-2 text-xs text-white/55 backdrop-blur-sm">
            {ACCOMMODATION_PREVIEW_PLACEHOLDERS.hero.coverImage}
          </div>
        </AccommodationEditorRegion>
      ) : null}

      <div className="relative z-10 flex w-full items-center">
        <div>
          <AccommodationEditorRegion
            region="general"
            activeRegion={activeEditorRegion}
            className="max-w-2xl -m-3 p-3"
          >
            <AccommodationHeroGeneral
              accommodation={accommodation}
              editorPreview={editorPreview}
            />
          </AccommodationEditorRegion>

          {showKeyDetails ? (
            <div className="mt-8 lg:mt-12">
              <AccommodationEditorRegion
                region="key-details"
                activeRegion={activeEditorRegion}
                className="inline-block max-w-full p-2"
              >
                <AccommodationKeyDetails
                  accommodationDetails={accommodation}
                  editorPreview={editorPreview}
                />
              </AccommodationEditorRegion>
            </div>
          ) : null}

          <AccommodationHeroActions
            hasGallery={hasGallery}
            disabled={Boolean(activeEditorRegion)}
          />
        </div>
      </div>

      {showHighlights ? (
        <AccommodationEditorRegion
          region="highlights"
          activeRegion={activeEditorRegion}
          className="relative z-10 -mx-6 mt-12 border-t border-white/10 bg-black/45 backdrop-blur-md md:-mx-12 lg:absolute lg:inset-x-0 lg:bottom-0 lg:mx-0 lg:mt-0"
        >
          <AccommodationHighlights
            highlights={highlights}
            editorPreview={editorPreview}
          />
        </AccommodationEditorRegion>
      ) : null}
    </section>
  );
};
