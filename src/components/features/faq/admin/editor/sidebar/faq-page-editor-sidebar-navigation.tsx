import { AdminEditorSubsectionNav } from "@/components/layout/admin/editor/admin-editor-subsection-nav";
import type { FaqPageEditorNavigation } from "@/hooks/faq/admin/editor/use-faq-page-editor-navigation";
import {
  faqPageCtaEditorSections,
  faqPageHeroEditorSections,
  faqPageQuestionsEditorSections,
} from "@/lib/admin/faq/editor/editor-sections";

type FaqPageEditorSidebarNavigationProps = {
  navigation: FaqPageEditorNavigation;
};

export const FaqPageEditorSidebarNavigation = ({
  navigation,
}: FaqPageEditorSidebarNavigationProps) => {
  switch (navigation.activeSection) {
    case "hero":
      return (
        <AdminEditorSubsectionNav
          sections={faqPageHeroEditorSections}
          activeSection={navigation.activeHeroSection}
          columns={2}
          ariaLabel="Sections du hero"
          onSectionChange={navigation.handleHeroSectionChange}
        />
      );

    case "questions":
      return (
        <AdminEditorSubsectionNav
          sections={faqPageQuestionsEditorSections}
          activeSection={navigation.activeQuestionsSection}
          columns={2}
          ariaLabel="Sections des questions"
          onSectionChange={navigation.handleQuestionsSectionChange}
        />
      );

    case "cta":
      return (
        <AdminEditorSubsectionNav
          sections={faqPageCtaEditorSections}
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
