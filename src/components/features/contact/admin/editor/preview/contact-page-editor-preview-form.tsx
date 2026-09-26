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
import { useAdminEditorRegionClick } from "@/hooks/admin/editor/use-admin-editor-region-click";
import type { ContactPageEditorNavigation } from "@/hooks/contact/admin/editor/use-contact-page-editor-navigation";
import { isContactPageFormEditorRegion } from "@/lib/admin/contact/editor/editor-sections";
import type { ContactPageContentValues } from "@/lib/contact/contact-page.schema";
import type { ContactRequestValues } from "@/lib/contact/contact-request.schema";
import type { ContactPageAccommodation } from "@/lib/contact/queries/get-contact-page-accommodations";

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

  const content: ContactPageContentValues = {
    eyebrow: values.eyebrow ?? "",
    handwritten: values.handwritten ?? "",
    title: values.title ?? "",
    description: values.description ?? "",

    reassuranceFirstLabel: values.reassuranceFirstLabel ?? "",
    reassuranceSecondLabel: values.reassuranceSecondLabel ?? "",
    reassuranceThirdLabel: values.reassuranceThirdLabel ?? "",

    formTitle: values.formTitle ?? "",

    accommodationSubjectTitle: values.accommodationSubjectTitle ?? "",
    accommodationSubjectDescription:
      values.accommodationSubjectDescription ?? "",

    otherSubjectTitle: values.otherSubjectTitle ?? "",
    otherSubjectDescription: values.otherSubjectDescription ?? "",

    accommodationLabel: values.accommodationLabel ?? "",

    firstNameLabel: values.firstNameLabel ?? "",
    firstNamePlaceholder: values.firstNamePlaceholder ?? "",

    emailLabel: values.emailLabel ?? "",
    emailPlaceholder: values.emailPlaceholder ?? "",

    messageLabel: values.messageLabel ?? "",
    messagePlaceholder: values.messagePlaceholder ?? "",

    submitLabel: values.submitLabel ?? "",

    successEyebrow: values.successEyebrow ?? "",
    successTitle: values.successTitle ?? "",
    successDescription: values.successDescription ?? "",
    successResetLabel: values.successResetLabel ?? "",
  };

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
            <ContactPageFormContent
              accommodations={accommodations}
              content={content}
              preview
              activeEditorRegion={
                navigation.activeSection === "form"
                  ? navigation.activeFormRegion
                  : undefined
              }
            />
          </div>
        </FormProvider>
      </ContactPagePanel>
    </AdminEditorSection>
  );
};
