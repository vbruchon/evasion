import { SiteSection } from "@/components/layout/site-section";
import type { AccommodationWithImagesAndHighlights } from "@/lib/accommodations/accommodation-types";

import { HomePageAccommodationSelector } from "./home-page-accommodation-selector";

type HomePageAccommodationsProps = {
  eyebrow: string;
  title: string;
  description: string;
  accommodations: AccommodationWithImagesAndHighlights[];
  activeEditorRegion?: "content";
};

export const HomePageAccommodations = ({
  eyebrow,
  title,
  description,
  accommodations,
  activeEditorRegion,
}: HomePageAccommodationsProps) => {
  if (accommodations.length === 0) {
    return null;
  }

  return (
    <SiteSection
      bordered={false}
      className="px-6 py-16 sm:px-12 lg:px-20 lg:py-24 xl:px-24 xl:py-28"
    >
      <HomePageAccommodationSelector
        eyebrow={eyebrow}
        title={title}
        description={description}
        accommodations={accommodations}
        activeEditorRegion={activeEditorRegion}
      />
    </SiteSection>
  );
};
