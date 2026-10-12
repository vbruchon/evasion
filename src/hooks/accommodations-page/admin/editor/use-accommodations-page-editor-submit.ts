"use client";

import { useCallback, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useRouter } from "next/navigation";

import { updateAccommodationsPageContent } from "~/app/admin/nos-logements/action";
import { prepareAdminEditorImages } from "@/lib/admin/editor/prepare-admin-editor-images";
import type { AdminEditorImage } from "@/lib/admin/images/admin-editor-image.types";
import { uploadFiles } from "@/lib/admin/uploadthing/client";
import type { AccommodationsPageContentValues } from "@/lib/accommodations-page/accommodations-page.schema";
import { toast } from "sonner";

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
  const router = useRouter();

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

        toast.success("Page Nos logements enregistrée.");
        router.refresh();
      } catch {
        setRootError(
          "Une erreur est survenue pendant l’enregistrement de la page Nos logements.",
        );
      } finally {
        setIsSaving(false);
      }
    },
    [ctaImage, form, heroImage, router, setRootError],
  );

  const handleSubmit = form.handleSubmit(saveAccommodationsPage);

  return {
    handleSubmit,
    isSaving,
  };
};
