"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useContactPageEditorSubmit } from "@/hooks/contact/admin/editor/use-contact-page-editor-submit";
import type { ContactPageAdminData } from "@/lib/admin/contact/queries/get-contact-page-admin-data";
import {
  contactPageContentSchema,
  type ContactPageContentValues,
} from "@/lib/contact/contact-page.schema";

export const useContactPageEditor = (data: ContactPageAdminData) => {
  const form = useForm<ContactPageContentValues>({
    resolver: zodResolver(contactPageContentSchema),

    defaultValues: {
      eyebrow: data.content.eyebrow,
      handwritten: data.content.handwritten,
      title: data.content.title,
      description: data.content.description,

      reassuranceFirstLabel: data.content.reassuranceFirstLabel,
      reassuranceSecondLabel: data.content.reassuranceSecondLabel,
      reassuranceThirdLabel: data.content.reassuranceThirdLabel,

      formTitle: data.content.formTitle,

      accommodationSubjectTitle: data.content.accommodationSubjectTitle,
      accommodationSubjectDescription:
        data.content.accommodationSubjectDescription,

      otherSubjectTitle: data.content.otherSubjectTitle,
      otherSubjectDescription: data.content.otherSubjectDescription,

      accommodationLabel: data.content.accommodationLabel,

      firstNameLabel: data.content.firstNameLabel,
      firstNamePlaceholder: data.content.firstNamePlaceholder,

      emailLabel: data.content.emailLabel,
      emailPlaceholder: data.content.emailPlaceholder,

      messageLabel: data.content.messageLabel,
      messagePlaceholder: data.content.messagePlaceholder,

      submitLabel: data.content.submitLabel,

      successEyebrow: data.content.successEyebrow,
      successTitle: data.content.successTitle,
      successDescription: data.content.successDescription,
      successResetLabel: data.content.successResetLabel,
    },

    mode: "onSubmit",
  });

  const { handleSubmit, isSaving } = useContactPageEditorSubmit({
    form,
  });

  const hasCurrentChanges = form.formState.isDirty;

  const disabled = form.formState.isSubmitting || isSaving;

  return {
    form,
    hasCurrentChanges,
    disabled,
    handleSubmit,
    isSaving,
  };
};
