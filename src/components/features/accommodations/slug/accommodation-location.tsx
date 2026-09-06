import { getAccommodationAccess } from "@/lib/accommodations/accommodation-accesses";

import { AccommodationLocationAccessPanel } from "./location/accommodation-location-access-panel";
import { AccommodationLocationContent } from "./location/accommodation-location-content";
import { AccommodationLocationMapPlaceholder } from "./location/accommodation-location-map-placeholder";
import type { AccommodationLocationEditorSection } from "@/lib/admin/accommodation/editor-sections";

import type {
  AccommodationAccessData,
  AccommodationLocationData,
} from "./location/accommodation-location.types";

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
    <section
      id="localisation"
      className="scroll-mt-20 border-b border-border/60 px-6 py-16 md:px-12 lg:px-20 lg:py-20 xl:px-24"
    >
      <div className="mx-auto grid max-w-420 gap-10 xl:grid-cols-[0.95fr_2fr] xl:items-stretch xl:gap-14">
        <AccommodationLocationContent
          accommodation={accommodation}
          editorPreview={editorPreview}
          active={activeEditorRegion === "content"}
        />

        <div className="overflow-hidden rounded-xl border border-border/60 bg-card/10 xl:grid xl:grid-cols-[260px_minmax(0,1fr)]">
          <AccommodationLocationAccessPanel
            accesses={accesses}
            editorPreview={editorPreview}
            active={activeEditorRegion === "access"}
          />

          <AccommodationLocationMapPlaceholder
            editorPreview={editorPreview}
            active={activeEditorRegion === "map"}
          />
        </div>
      </div>
    </section>
  );
};
