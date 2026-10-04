import * as motion from "motion/react-client";
import Image from "next/image";

import { AdminEditorRegion } from "@/components/layout/admin/editor/admin-editor-region";
import { SiteSection } from "@/components/layout/site-section";
import type {
  AccommodationDisplayImageSource,
  AccommodationHeroData,
  AccommodationHighlightDisplay,
} from "@/lib/accommodations/accommodation-types";
import { ACCOMMODATION_PREVIEW_PLACEHOLDERS } from "@/lib/accommodations/accommodation-preview-placeholders";
import type { AccommodationHeroEditorSection } from "@/lib/admin/accommodation/editor/editor-sections";
import { cn } from "@/lib/utils";

import { AccommodationHeroActions } from "./accommodation-hero-actions";
import { AccommodationHeroGeneral } from "./accommodation-hero-general";
import { AccommodationHighlights } from "./accommodation-highlights";
import { AccommodationKeyDetails } from "./accommodation-key-details";

type AccommodationHeroProps = {
  accommodation: AccommodationHeroData;
  coverImage?: AccommodationDisplayImageSource;
  highlights?: AccommodationHighlightDisplay[];
  hasGallery?: boolean;
  activeEditorRegion?: AccommodationHeroEditorSection;
  editorPreview?: boolean;
  animated?: boolean;
};

export const AccommodationHero = ({
  accommodation,
  coverImage,
  highlights = [],
  hasGallery = false,
  activeEditorRegion,
  editorPreview = false,
  animated = false,
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

  const shouldAnimate = animated && !editorPreview;

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
    <SiteSection
      bordered={false}
      className={cn(
        "relative flex min-h-140 w-full flex-col justify-center overflow-hidden px-6 pt-32 md:min-h-155 md:px-12 md:pt-36 lg:min-h-200 lg:px-20 xl:px-24",
        showHighlights ? "pb-0 lg:pb-28" : "pb-16 md:pb-20 lg:pb-24",
      )}
    >
      {background}

      {editorPreview && !coverImage ? (
        <AdminEditorRegion
          region="image"
          activeRegion={activeEditorRegion}
          className="absolute right-[8%] top-1/2 z-20 hidden -translate-y-1/2 p-1 lg:block"
        >
          <div className="border border-white/15 bg-black/30 px-4 py-2 text-xs text-white/55 backdrop-blur-sm">
            {ACCOMMODATION_PREVIEW_PLACEHOLDERS.hero.coverImage}
          </div>
        </AdminEditorRegion>
      ) : null}

      <div className="relative z-10 flex w-full items-center">
        <div>
          <AdminEditorRegion
            region="general"
            activeRegion={activeEditorRegion}
            className="max-w-2xl"
          >
            <AccommodationHeroGeneral
              accommodation={accommodation}
              editorPreview={editorPreview}
              animated={shouldAnimate}
            />
          </AdminEditorRegion>

          {showKeyDetails ? (
            <motion.div
              initial={shouldAnimate ? { opacity: 0, y: 10 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.85,
                delay: shouldAnimate ? 0.32 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-8 lg:mt-12"
            >
              <AdminEditorRegion
                region="key-details"
                activeRegion={activeEditorRegion}
                className="inline-block max-w-full p-2"
              >
                <AccommodationKeyDetails
                  accommodationDetails={accommodation}
                  editorPreview={editorPreview}
                  animated={shouldAnimate}
                />
              </AdminEditorRegion>
            </motion.div>
          ) : null}

          <motion.div
            initial={shouldAnimate ? { opacity: 0, y: 10 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.85,
              delay: shouldAnimate ? 0.45 : 0,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <AccommodationHeroActions
              hasGallery={hasGallery}
              disabled={Boolean(activeEditorRegion)}
            />
          </motion.div>
        </div>
      </div>

      {showHighlights ? (
        <AdminEditorRegion
          region="highlights"
          activeRegion={activeEditorRegion}
          className="relative z-10 -mx-6 mt-12 border-t border-white/10 bg-black/45 backdrop-blur-md md:-mx-12 lg:absolute lg:inset-x-0 lg:bottom-0 lg:mx-0 lg:mt-0"
        >
          <AccommodationHighlights
            highlights={highlights}
            editorPreview={editorPreview}
            animated={shouldAnimate}
          />
        </AdminEditorRegion>
      ) : null}
    </SiteSection>
  );
};
