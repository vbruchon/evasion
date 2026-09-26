"use client";

import { FormProvider } from "react-hook-form";

import { ContactPageEditorPreview } from "@/components/features/contact/admin/editor/preview/contact-page-editor-preview";
import { ContactPageEditorSidebar } from "@/components/features/contact/admin/editor/sidebar/contact-page-editor-sidebar";
import { AdminPageEditorHeader } from "@/components/layout/admin/editor/admin-page-editor-header";
import { AdminPageEditorWorkspace } from "@/components/layout/admin/editor/admin-page-editor-workspace";
import { useContactPageEditor } from "@/hooks/contact/admin/editor/use-contact-page-editor";
import { useContactPageEditorNavigation } from "@/hooks/contact/admin/editor/use-contact-page-editor-navigation";
import type { ContactPageAdminData } from "@/lib/admin/contact/queries/get-contact-page-admin-data";

type ContactPageEditorProps = {
  data: ContactPageAdminData;
};

export const ContactPageEditor = ({ data }: ContactPageEditorProps) => {
  const navigation = useContactPageEditorNavigation();

  const { form, hasCurrentChanges, disabled, handleSubmit, isSaving } =
    useContactPageEditor(data);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit}
        className="flex min-h-0 flex-1 flex-col overflow-hidden"
      >
        <AdminPageEditorHeader
          title="Page Contact"
          publicHref="/contact"
          hasCurrentChanges={hasCurrentChanges}
          disabled={disabled}
          isSaving={isSaving}
        />

        <AdminPageEditorWorkspace
          activeView={navigation.mobileView}
          onViewChange={navigation.setMobileView}
          errorMessage={form.formState.errors.root?.message}
          preview={
            <ContactPageEditorPreview
              navigation={navigation}
              accommodations={data.accommodations}
            />
          }
          sidebar={<ContactPageEditorSidebar navigation={navigation} />}
        />
      </form>
    </FormProvider>
  );
};
