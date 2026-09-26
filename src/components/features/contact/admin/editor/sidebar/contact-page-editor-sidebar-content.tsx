import { ContactPageFormEditor } from "@/components/features/contact/admin/editor/section/contact-page-form-editor";
import { ContactPageSuccessEditor } from "@/components/features/contact/admin/editor/section/contact-page-success-editor";
import { ContactPageVisualEditor } from "@/components/features/contact/admin/editor/section/contact-page-visual-editor";
import type { ContactPageEditorNavigation } from "@/hooks/contact/admin/editor/use-contact-page-editor-navigation";

type ContactPageEditorSidebarContentProps = {
  navigation: ContactPageEditorNavigation;
};

export const ContactPageEditorSidebarContent = ({
  navigation,
}: ContactPageEditorSidebarContentProps) => {
  switch (navigation.activeSection) {
    case "visual":
      return <ContactPageVisualEditor />;

    case "form":
      return <ContactPageFormEditor />;

    case "success":
      return <ContactPageSuccessEditor navigation={navigation} />;

    default:
      return null;
  }
};
