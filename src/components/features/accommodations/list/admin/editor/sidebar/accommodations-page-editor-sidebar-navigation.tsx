import { AdminEditorSubsectionNav } from "@/components/layout/admin/editor/admin-editor-subsection-nav";
import type { AccommodationsPageEditorNavigation } from "@/hooks/accommodations-page/admin/editor/use-accommodations-page-editor-navigation";
import { accommodationsPageEditorRegions } from "@/lib/admin/accommodations-page/editor/editor-sections";

type AccommodationsPageEditorSidebarNavigationProps = {
  navigation: AccommodationsPageEditorNavigation;
};

export const AccommodationsPageEditorSidebarNavigation = ({
  navigation,
}: AccommodationsPageEditorSidebarNavigationProps) => {
  switch (navigation.activeSection) {
    case "hero":
      return (
        <AdminEditorSubsectionNav
          sections={accommodationsPageEditorRegions}
          activeSection={navigation.activeHeroSection}
          columns={2}
          ariaLabel="Sections du hero"
          onSectionChange={navigation.handleHeroSectionChange}
        />
      );

    case "cta":
      return (
        <AdminEditorSubsectionNav
          sections={accommodationsPageEditorRegions}
          activeSection={navigation.activeCtaSection}
          columns={2}
          ariaLabel="Sections de l’appel à l’action"
          onSectionChange={navigation.handleCtaSectionChange}
        />
      );

    default:
      return null;
  }
};
