import { AdminEditorSubsectionNav } from "@/components/layout/admin/editor/admin-editor-subsection-nav";
import type { ContactPageEditorNavigation } from "@/hooks/contact/admin/editor/use-contact-page-editor-navigation";

const contactPageRightPanelSections = [
  {
    id: "form",
    label: "Formulaire",
  },
  {
    id: "success",
    label: "Confirmation",
  },
] as const;

type ContactPageEditorSidebarNavigationProps = {
  navigation: ContactPageEditorNavigation;
};

export const ContactPageEditorSidebarNavigation = ({
  navigation,
}: ContactPageEditorSidebarNavigationProps) => {
  if (
    navigation.activeSection !== "form" &&
    navigation.activeSection !== "success"
  ) {
    return null;
  }

  return (
    <AdminEditorSubsectionNav
      sections={contactPageRightPanelSections}
      activeSection={navigation.activeSection}
      columns={2}
      ariaLabel="États de la zone de contact"
      onSectionChange={navigation.handleSectionChange}
    />
  );
};
