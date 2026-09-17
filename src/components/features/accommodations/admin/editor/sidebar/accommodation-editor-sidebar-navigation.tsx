import type { AccommodationEditorNavigation } from "@/hooks/accommodations/admin/editor/use-accommodation-editor-navigation";
import {
  accommodationAvailabilityEditorSections,
  accommodationHeroEditorSections,
  accommodationLocationEditorSections,
  accommodationPresentationEditorSections,
  accommodationReviewsEditorSections,
} from "@/lib/admin/accommodation/editor/editor-sections";

import { AdminEditorSubsectionNav } from "@/components/layout/admin/editor/admin-editor-subsection-nav";

type AccommodationEditorSidebarNavigationProps = {
  navigation: AccommodationEditorNavigation;
};

export const AccommodationEditorSidebarNavigation = ({
  navigation,
}: AccommodationEditorSidebarNavigationProps) => {
  switch (navigation.activeSection) {
    case "hero":
      return (
        <AdminEditorSubsectionNav
          sections={accommodationHeroEditorSections}
          activeSection={navigation.activeHeroSection}
          columns={4}
          ariaLabel="Sections du hero"
          onSectionChange={navigation.handleHeroSectionChange}
        />
      );

    case "presentation":
      return (
        <AdminEditorSubsectionNav
          sections={accommodationPresentationEditorSections}
          activeSection={navigation.activePresentationSection}
          columns={2}
          ariaLabel="Sections de la présentation"
          onSectionChange={navigation.handlePresentationSectionChange}
        />
      );

    case "location":
      return (
        <AdminEditorSubsectionNav
          sections={accommodationLocationEditorSections}
          activeSection={navigation.activeLocationSection}
          columns={3}
          ariaLabel="Sections de la localisation"
          onSectionChange={navigation.handleLocationSectionChange}
        />
      );

    case "availability":
      return (
        <AdminEditorSubsectionNav
          sections={accommodationAvailabilityEditorSections}
          activeSection={navigation.activeAvailabilitySection}
          columns={2}
          ariaLabel="Sections des disponibilités"
          onSectionChange={navigation.handleAvailabilitySectionChange}
        />
      );

    case "reviews":
      return (
        <AdminEditorSubsectionNav
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
