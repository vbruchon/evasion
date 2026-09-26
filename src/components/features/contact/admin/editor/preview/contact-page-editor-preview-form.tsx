"use client";

import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";

import { ContactPageFormContent } from "@/components/features/contact/form/contact-page-form-content";
import { ContactPagePanel } from "@/components/features/contact/contact-page-panel";
import { AdminEditorSection } from "@/components/layout/admin/editor/admin-editor-section";
import type { ContactPageEditorNavigation } from "@/hooks/contact/admin/editor/use-contact-page-editor-navigation";
import type { ContactPageContentValues } from "@/lib/contact/contact-page.schema";
import type { ContactRequestValues } from "@/lib/contact/contact-request.schema";
import type { ContactPageAccommodation } from "@/lib/contact/queries/get-contact-page-accommodations";
import { useAdminEditorRegionClick } from "@/hooks/admin/editor/use-admin-editor-region-click";
import { isContactPageFormEditorRegion } from "@/lib/admin/contact/editor/editor-sections";

type ContactPageEditorPreviewFormProps = {
  navigation: ContactPageEditorNavigation;
  accommodations: ContactPageAccommodation[];
};

export const ContactPageEditorPreviewForm = ({
  navigation,
  accommodations,
}: ContactPageEditorPreviewFormProps) => {
  const { control } = useFormContext<ContactPageContentValues>();

  const values = useWatch({
    control,
  });

  const previewForm = useForm<ContactRequestValues>({
    defaultValues: {
      firstName: "",
      email: "",
      subject: accommodations.length > 0 ? "ACCOMMODATION" : "OTHER",
      accommodationId: null,
      message: "",
    },
    mode: "onSubmit",
  });

  const handleRegionClick = useAdminEditorRegionClick({
    section: "form",
    isRegion: isContactPageFormEditorRegion,
    onSectionChange: navigation.handleSectionChange,
    onRegionChange: navigation.handleFormRegionChange,
  });

  return (
    <AdminEditorSection
      active={navigation.activeSection === "form"}
      label="Formulaire"
      className="h-full"
      interactiveChildren
      onSelect={() => navigation.handleSectionChange("form")}
    >
      <ContactPagePanel variant="preview">
        <FormProvider {...previewForm}>
          <div onClick={handleRegionClick}>
            <div inert>
              <ContactPageFormContent
                accommodations={accommodations}
                formTitle={values.formTitle ?? ""}
                submitLabel={values.submitLabel ?? ""}
                preview
                activeEditorRegion={
                  navigation.activeSection === "form"
                    ? navigation.activeFormRegion
                    : undefined
                }
              />
            </div>
          </div>
        </FormProvider>
      </ContactPagePanel>
    </AdminEditorSection>
  );
};
