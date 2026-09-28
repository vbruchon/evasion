"use client";

import { useCallback, useState } from "react";
import type { UseFormReturn } from "react-hook-form";

import { updateHomePageContent } from "~/app/admin/accueil/action";
import { prepareAdminEditorImages } from "@/lib/admin/editor/prepare-admin-editor-images";
import type { AdminEditorImage } from "@/lib/admin/images/admin-editor-image.types";
import { uploadFiles } from "@/lib/admin/uploadthing/client";
import type { HomePageContentValues } from "@/lib/home/home-page.schema";

type UseHomePageEditorSubmitOptions = {
  form: UseFormReturn<HomePageContentValues>;
  escapeImage: AdminEditorImage | null;
  ctaImage: AdminEditorImage | null;
};

export const useHomePageEditorSubmit = ({
  form,
  escapeImage,
  ctaImage,
}: UseHomePageEditorSubmitOptions) => {
  const [isSaving, setIsSaving] = useState(false);

  const setRootError = useCallback(
    (message: string) => {
      form.setError("root", {
        message,
      });
    },
    [form],
  );

  const saveHomePage = useCallback(
    async (values: HomePageContentValues) => {
      form.clearErrors("root");
      setIsSaving(true);

      try {
        const preparedImages = await prepareAdminEditorImages(
          {
            escapeImage,
            ctaImage,
          },
          (files) =>
            uploadFiles("homePageImages", {
              files,
            }),
        );

        const result = await updateHomePageContent(
          values,
          preparedImages.escapeImage,
          preparedImages.ctaImage,
        );

        if (!result.success) {
          setRootError(result.message);
          return;
        }

        window.location.reload();
      } catch {
        setRootError(
          "Une erreur est survenue pendant l’enregistrement de la page d’accueil.",
        );
      } finally {
        setIsSaving(false);
      }
    },
    [ctaImage, escapeImage, form, setRootError],
  );

  const handleSubmit = form.handleSubmit(saveHomePage);

  return {
    handleSubmit,
    isSaving,
  };
};
