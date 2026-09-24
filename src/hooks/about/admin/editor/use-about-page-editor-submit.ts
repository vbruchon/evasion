"use client";

import { useCallback, useState } from "react";
import type { UseFormReturn } from "react-hook-form";

import { updateAboutPageContent } from "~/app/admin/a-propos/action";
import { uploadFiles } from "@/lib/admin/uploadthing/client";
import type { AboutPageContentValues } from "@/lib/about/about-page.schema";

import type { AdminEditorImage } from "@/lib/admin/images/admin-editor-image.types";
import { prepareAdminEditorImages } from "@/lib/admin/editor/prepare-admin-editor-images";

type UseAboutPageEditorSubmitOptions = {
  form: UseFormReturn<AboutPageContentValues>;
  spiritImage: AdminEditorImage | null;
  ctaImage: AdminEditorImage | null;
};

export const useAboutPageEditorSubmit = ({
  form,
  spiritImage,
  ctaImage,
}: UseAboutPageEditorSubmitOptions) => {
  const [isSaving, setIsSaving] = useState(false);

  const setRootError = useCallback(
    (message: string) => {
      form.setError("root", {
        message,
      });
    },
    [form],
  );

  const saveAboutPage = useCallback(
    async (values: AboutPageContentValues) => {
      form.clearErrors("root");
      setIsSaving(true);

      try {
        const preparedImages = await prepareAdminEditorImages(
          {
            spiritImage,
            ctaImage,
          },
          (files) =>
            uploadFiles("aboutPageImages", {
              files,
            }),
        );

        const result = await updateAboutPageContent(
          values,
          preparedImages.spiritImage,
          preparedImages.ctaImage,
        );

        if (!result.success) {
          setRootError(result.message);
          return;
        }

        window.location.reload();
      } catch {
        setRootError(
          "Une erreur est survenue pendant l’enregistrement de la page À propos.",
        );
      } finally {
        setIsSaving(false);
      }
    },
    [ctaImage, form, setRootError, spiritImage],
  );

  const handleSubmit = form.handleSubmit(saveAboutPage);

  return {
    handleSubmit,
    isSaving,
  };
};
