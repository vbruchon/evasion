import * as motion from "motion/react-client";

import { getAccommodationAccess } from "@/lib/accommodations/accommodation-accesses";

import { AccommodationLocationAccessPanel } from "./access/accommodation-location-access-panel";
import { AccommodationLocationContent } from "./accommodation-location-content";
import { AccommodationLocationMap } from "./map/accommodation-location-map";
import type { AccommodationLocationEditorSection } from "@/lib/admin/accommodation/editor/editor-sections";
import type {
  AccommodationAccessData,
  AccommodationLocationData,
} from "@/lib/accommodations/accommodation-location.types";
import { SiteContainer } from "@/components/layout/site-container";
import { SiteSection } from "@/components/layout/site-section";

type AccommodationLocationProps = {
  accommodation: AccommodationLocationData;
  accesses: AccommodationAccessData[];
  editorPreview?: boolean;
  activeEditorRegion?: AccommodationLocationEditorSection;
  animated?: boolean;
};

export const AccommodationLocation = ({
  accommodation,
  accesses,
  editorPreview = false,
  activeEditorRegion,
  animated = false,
}: AccommodationLocationProps) => {
  const hasContent =
    Boolean(accommodation.locationTitle) ||
    Boolean(accommodation.locationDescription);

  const hasAccesses = accesses.some((access) =>
    Boolean(getAccommodationAccess(access.key)),
  );

  const shouldAnimate = animated && !editorPreview;

  if (!hasContent && !hasAccesses && !editorPreview) {
    return null;
  }

  return (
    <SiteSection id="localisation" gutters spacing="default">
      <SiteContainer className="grid gap-10 xl:grid-cols-[0.95fr_2fr] xl:items-stretch xl:gap-14">
        <motion.div
          initial={shouldAnimate ? { opacity: 0, y: 14 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <AccommodationLocationContent
            accommodation={accommodation}
            editorPreview={editorPreview}
            activeEditorRegion={activeEditorRegion}
          />
        </motion.div>

        <motion.div
          initial={shouldAnimate ? { opacity: 0, y: 18 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.95,
            delay: shouldAnimate ? 0.1 : 0,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="grid overflow-hidden rounded-xl border border-border/60 bg-card/10 xl:grid-cols-[260px_minmax(0,1fr)]"
        >
          <AccommodationLocationAccessPanel
            accesses={accesses}
            editorPreview={editorPreview}
            activeEditorRegion={activeEditorRegion}
          />

          <AccommodationLocationMap
            latitude={accommodation.locationLatitude}
            longitude={accommodation.locationLongitude}
            radiusMeters={accommodation.locationRadiusMeters}
            editorPreview={editorPreview}
            activeEditorRegion={activeEditorRegion}
          />
        </motion.div>
      </SiteContainer>
    </SiteSection>
  );
};
