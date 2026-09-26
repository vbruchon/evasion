"use client";

import { useFormContext, useWatch } from "react-hook-form";

import { ContactPagePanel } from "@/components/features/contact/contact-page-panel";
import { ContactRequestSuccess } from "@/components/features/contact/contact-request-success";
import { AdminEditorSection } from "@/components/layout/admin/editor/admin-editor-section";
import type { ContactPageEditorNavigation } from "@/hooks/contact/admin/editor/use-contact-page-editor-navigation";
import type { ContactPageContentValues } from "@/lib/contact/contact-page.schema";

type ContactPageEditorPreviewSuccessProps = {
  navigation: ContactPageEditorNavigation;
};

export const ContactPageEditorPreviewSuccess = ({
  navigation,
}: ContactPageEditorPreviewSuccessProps) => {
  const { control } = useFormContext<ContactPageContentValues>();

  const values = useWatch({
    control,
  });

  return (
    <AdminEditorSection
      active={navigation.activeSection === "success"}
      label="Confirmation"
      className="h-full"
      onSelect={() => navigation.handleSectionChange("success")}
    >
      <ContactPagePanel variant="preview">
        <ContactRequestSuccess
          eyebrow={values.successEyebrow ?? ""}
          title={values.successTitle ?? ""}
          description={values.successDescription ?? ""}
          resetLabel={values.successResetLabel ?? ""}
          onReset={() => {}}
        />
      </ContactPagePanel>
    </AdminEditorSection>
  );
};
