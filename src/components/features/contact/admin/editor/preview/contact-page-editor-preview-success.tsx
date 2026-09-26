"use client";

import { useFormContext, useWatch } from "react-hook-form";

import { ContactPagePanel } from "@/components/features/contact/contact-page-panel";
import { ContactRequestSuccess } from "@/components/features/contact/contact-request-success";
import { AdminEditorSection } from "@/components/layout/admin/editor/admin-editor-section";
import { useAdminEditorRegionClick } from "@/hooks/admin/editor/use-admin-editor-region-click";
import type { ContactPageEditorNavigation } from "@/hooks/contact/admin/editor/use-contact-page-editor-navigation";
import { isContactPageSuccessEditorRegion } from "@/lib/admin/contact/editor/editor-sections";
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

  const handleRegionClick = useAdminEditorRegionClick({
    section: "success",
    isRegion: isContactPageSuccessEditorRegion,
    onSectionChange: navigation.handleSectionChange,
    onRegionChange: navigation.handleSuccessRegionChange,
  });

  return (
    <AdminEditorSection
      active={navigation.activeSection === "success"}
      label="Confirmation"
      className="h-full"
      interactiveChildren
      onSelect={() => navigation.handleSectionChange("success")}
    >
      <ContactPagePanel variant="preview">
        <div onClick={handleRegionClick}>
          <div inert>
            <ContactRequestSuccess
              eyebrow={values.successEyebrow ?? ""}
              title={values.successTitle ?? ""}
              description={values.successDescription ?? ""}
              onReset={() => {}}
              activeEditorRegion={
                navigation.activeSection === "success"
                  ? navigation.activeSuccessRegion
                  : undefined
              }
            />
          </div>
        </div>
      </ContactPagePanel>
    </AdminEditorSection>
  );
};
