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
};

export const AccommodationLocation = ({
  accommodation,
  accesses,
  editorPreview = false,
  activeEditorRegion,
}: AccommodationLocationProps) => {
  const hasContent =
    Boolean(accommodation.locationTitle) ||
    Boolean(accommodation.locationDescription);

  const hasAccesses = accesses.some((access) =>
    Boolean(getAccommodationAccess(access.key)),
  );

  if (!hasContent && !hasAccesses && !editorPreview) {
    return null;
  }

  return (
    <SiteSection id="localisation" gutters spacing="default">
      <SiteContainer className="grid gap-10 xl:grid-cols-[0.95fr_2fr] xl:items-stretch xl:gap-14">
        <AccommodationLocationContent
          accommodation={accommodation}
          editorPreview={editorPreview}
          activeEditorRegion={activeEditorRegion}
        />

        <div className="grid overflow-hidden rounded-xl border border-border/60 bg-card/10 xl:grid-cols-[260px_minmax(0,1fr)]">
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
        </div>
      </SiteContainer>
    </SiteSection>
  );
};
