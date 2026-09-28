import { AdminEditorSubsectionNav } from "@/components/layout/admin/editor/admin-editor-subsection-nav";
import type { HomePageEditorNavigation } from "@/hooks/home/admin/editor/use-home-page-editor-navigation";
import {
  homePageCtaEditorSections,
  homePageEscapeEditorSections,
} from "@/lib/admin/home/editor/editor-sections";

type HomePageEditorSidebarNavigationProps = {
  navigation: HomePageEditorNavigation;
};

export const HomePageEditorSidebarNavigation = ({
  navigation,
}: HomePageEditorSidebarNavigationProps) => {
  switch (navigation.activeSection) {
    case "escape":
      return (
        <AdminEditorSubsectionNav
          sections={homePageEscapeEditorSections}
          activeSection={navigation.activeEscapeSection}
          columns={2}
          ariaLabel="Sections de l’esprit Évasion"
          onSectionChange={navigation.handleEscapeSectionChange}
        />
      );

    case "cta":
      return (
        <AdminEditorSubsectionNav
          sections={homePageCtaEditorSections}
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
