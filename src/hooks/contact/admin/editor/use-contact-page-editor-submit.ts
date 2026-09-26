"use client";

import { useCallback, useState } from "react";
import type { UseFormReturn } from "react-hook-form";

import { updateContactPageContent } from "~/app/admin/contact/action";
import type { ContactPageContentValues } from "@/lib/contact/contact-page.schema";

type UseContactPageEditorSubmitOptions = {
  form: UseFormReturn<ContactPageContentValues>;
};

export const useContactPageEditorSubmit = ({
  form,
}: UseContactPageEditorSubmitOptions) => {
  const [isSaving, setIsSaving] = useState(false);

  const setRootError = useCallback(
    (message: string) => {
      form.setError("root", {
        message,
      });
    },
    [form],
  );

  const saveContactPage = useCallback(
    async (values: ContactPageContentValues) => {
      form.clearErrors("root");
      setIsSaving(true);

      try {
        const result = await updateContactPageContent(values);

        if (!result.success) {
          setRootError(result.message);
          return;
        }

        window.location.reload();
      } catch {
        setRootError(
          "Une erreur est survenue pendant l’enregistrement de la page Contact.",
        );
      } finally {
        setIsSaving(false);
      }
    },
    [form, setRootError],
  );

  return {
    handleSubmit: form.handleSubmit(saveContactPage),
    isSaving,
  };
};
