"use client";

import { useCallback, useState } from "react";
import type { UseFormReturn } from "react-hook-form";

import { updateAccommodationsPageContent } from "~/app/admin/nos-logements/action";
import { prepareAdminEditorImages } from "@/lib/admin/editor/prepare-admin-editor-images";
import type { AdminEditorImage } from "@/lib/admin/images/admin-editor-image.types";
import { uploadFiles } from "@/lib/admin/uploadthing/client";
import type { AccommodationsPageContentValues } from "@/lib/accommodations-page/accommodations-page.schema";
import { setAdminSuccessToast } from "@/lib/admin/admin-success-toast";

type UseAccommodationsPageEditorSubmitOptions = {
  form: UseFormReturn<AccommodationsPageContentValues>;
  heroImage: AdminEditorImage | null;
  ctaImage: AdminEditorImage | null;
};

export const useAccommodationsPageEditorSubmit = ({
  form,
  heroImage,
  ctaImage,
}: UseAccommodationsPageEditorSubmitOptions) => {
  const [isSaving, setIsSaving] = useState(false);

  const setRootError = useCallback(
    (message: string) => {
      form.setError("root", {
        message,
      });
    },
    [form],
  );

  const saveAccommodationsPage = useCallback(
    async (values: AccommodationsPageContentValues) => {
      form.clearErrors("root");
      setIsSaving(true);

      try {
        const preparedImages = await prepareAdminEditorImages(
          {
            heroImage,
            ctaImage,
          },
          (files) =>
            uploadFiles("accommodationsPageImages", {
              files,
            }),
        );

        const result = await updateAccommodationsPageContent(
          values,
          preparedImages.heroImage,
          preparedImages.ctaImage,
        );

        if (!result.success) {
          setRootError(result.message);
          return;
        }

        setAdminSuccessToast("Page Nos logements enregistrée.");
        window.location.reload();
      } catch {
        setRootError(
          "Une erreur est survenue pendant l’enregistrement de la page Nos logements.",
        );
      } finally {
        setIsSaving(false);
      }
    },
    [ctaImage, form, heroImage, setRootError],
  );

  const handleSubmit = form.handleSubmit(saveAccommodationsPage);

  return {
    handleSubmit,
    isSaving,
  };
};
