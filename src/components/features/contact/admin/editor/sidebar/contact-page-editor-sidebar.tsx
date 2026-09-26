"use client";

import { AdminEditorSidebar } from "@/components/layout/admin/editor/admin-editor-sidebar";
import type { ContactPageEditorNavigation } from "@/hooks/contact/admin/editor/use-contact-page-editor-navigation";
import { getContactPageEditorSection } from "@/lib/admin/contact/editor/editor-sections";

import { ContactPageEditorSidebarContent } from "./contact-page-editor-sidebar-content";
import { ContactPageEditorSidebarNavigation } from "./contact-page-editor-sidebar-navigation";

type ContactPageEditorSidebarProps = {
  navigation: ContactPageEditorNavigation;
};

export const ContactPageEditorSidebar = ({
  navigation,
}: ContactPageEditorSidebarProps) => {
  const currentSection = getContactPageEditorSection(navigation.activeSection);

  return (
    <AdminEditorSidebar
      title={currentSection?.label}
      description={currentSection?.description}
      navigation={
        <ContactPageEditorSidebarNavigation navigation={navigation} />
      }
    >
      <ContactPageEditorSidebarContent navigation={navigation} />
    </AdminEditorSidebar>
  );
};
