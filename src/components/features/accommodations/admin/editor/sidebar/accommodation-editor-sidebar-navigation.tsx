import type { AccommodationEditorNavigation } from "@/hooks/accommodations/admin/editor/use-accommodation-editor-navigation";
import {
  accommodationAvailabilityEditorSections,
  accommodationHeroEditorSections,
  accommodationLocationEditorSections,
  accommodationPresentationEditorSections,
  accommodationReviewsEditorSections,
} from "@/lib/admin/accommodation/editor-sections";

import { AccommodationEditorSubsectionNav } from "./accommodation-editor-subsection-nav";

type AccommodationEditorSidebarNavigationProps = {
  navigation: AccommodationEditorNavigation;
};

export const AccommodationEditorSidebarNavigation = ({
  navigation,
}: AccommodationEditorSidebarNavigationProps) => {
  switch (navigation.activeSection) {
    case "hero":
      return (
        <AccommodationEditorSubsectionNav
          sections={accommodationHeroEditorSections}
          activeSection={navigation.activeHeroSection}
          columns={4}
          ariaLabel="Sections du hero"
          onSectionChange={navigation.handleHeroSectionChange}
        />
      );

    case "presentation":
      return (
        <AccommodationEditorSubsectionNav
          sections={accommodationPresentationEditorSections}
          activeSection={navigation.activePresentationSection}
          columns={2}
          ariaLabel="Sections de la présentation"
          onSectionChange={navigation.handlePresentationSectionChange}
        />
      );

    case "location":
      return (
        <AccommodationEditorSubsectionNav
          sections={accommodationLocationEditorSections}
          activeSection={navigation.activeLocationSection}
          columns={3}
          ariaLabel="Sections de la localisation"
          onSectionChange={navigation.handleLocationSectionChange}
        />
      );

    case "availability":
      return (
        <AccommodationEditorSubsectionNav
          sections={accommodationAvailabilityEditorSections}
          activeSection={navigation.activeAvailabilitySection}
          columns={2}
          ariaLabel="Sections des disponibilités"
          onSectionChange={navigation.handleAvailabilitySectionChange}
        />
      );

    case "reviews":
      return (
        <AccommodationEditorSubsectionNav
          sections={accommodationReviewsEditorSections}
          activeSection={navigation.activeReviewsSection}
          columns={2}
          ariaLabel="Sections des avis"
          onSectionChange={navigation.handleReviewsSectionChange}
        />
      );

    default:
      return null;
  }
};
