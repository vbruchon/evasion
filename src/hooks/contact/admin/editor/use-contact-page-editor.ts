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

      formTitle: data.content.formTitle,
      submitLabel: data.content.submitLabel,

      successEyebrow: data.content.successEyebrow,
      successTitle: data.content.successTitle,
      successDescription: data.content.successDescription,
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
