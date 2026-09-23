import { AdminEditorSubsectionNav } from "@/components/layout/admin/editor/admin-editor-subsection-nav";
import type { AboutPageEditorNavigation } from "@/hooks/about/admin/editor/use-about-page-editor-navigation";
import {
  aboutPageCtaEditorSections,
  aboutPagePhilosophyEditorSections,
  aboutPageSpiritEditorSections,
} from "@/lib/admin/about/editor/editor-sections";

type AboutPageEditorSidebarNavigationProps = {
  navigation: AboutPageEditorNavigation;
};

export const AboutPageEditorSidebarNavigation = ({
  navigation,
}: AboutPageEditorSidebarNavigationProps) => {
  switch (navigation.activeSection) {
    case "spirit":
      return (
        <AdminEditorSubsectionNav
          sections={aboutPageSpiritEditorSections}
          activeSection={navigation.activeSpiritSection}
          columns={2}
          ariaLabel="Sections de l’esprit Évasion"
          onSectionChange={navigation.handleSpiritSectionChange}
        />
      );

    case "philosophy":
      return (
        <AdminEditorSubsectionNav
          sections={aboutPagePhilosophyEditorSections}
          activeSection={navigation.activePhilosophySection}
          columns={2}
          ariaLabel="Sections de la philosophie"
          onSectionChange={navigation.handlePhilosophySectionChange}
        />
      );

    case "cta":
      return (
        <AdminEditorSubsectionNav
          sections={aboutPageCtaEditorSections}
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
