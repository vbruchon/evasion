"use client";

import { useCallback, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useRouter } from "next/navigation";

import { updateFaqPageContent } from "~/app/admin/faq/action";
import { prepareAdminEditorImages } from "@/lib/admin/editor/prepare-admin-editor-images";
import type { AdminEditorImage } from "@/lib/admin/images/admin-editor-image.types";
import { uploadFiles } from "@/lib/admin/uploadthing/client";
import type { FaqPageContentValues } from "@/lib/faq/faq-page.schema";
import { toast } from "sonner";

type UseFaqPageEditorSubmitOptions = {
  form: UseFormReturn<FaqPageContentValues>;
  heroImage: AdminEditorImage | null;
  ctaImage: AdminEditorImage | null;
};

export const useFaqPageEditorSubmit = ({
  form,
  heroImage,
  ctaImage,
}: UseFaqPageEditorSubmitOptions) => {
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

  const saveFaqPage = useCallback(
    async (values: FaqPageContentValues) => {
      form.clearErrors("root");
      setIsSaving(true);

      try {
        const preparedImages = await prepareAdminEditorImages(
          {
            heroImage,
            ctaImage,
          },
          (files) =>
            uploadFiles("faqPageImages", {
              files,
            }),
        );

        const result = await updateFaqPageContent(
          values,
          preparedImages.heroImage,
          preparedImages.ctaImage,
        );

        if (!result.success) {
          setRootError(result.message);
          return;
        }

        toast.success("Page FAQ enregistrée.");
        router.refresh();
      } catch {
        setRootError(
          "Une erreur est survenue pendant l’enregistrement de la page FAQ.",
        );
      } finally {
        setIsSaving(false);
      }
    },
    [ctaImage, form, heroImage, router, setRootError],
  );

  const handleSubmit = form.handleSubmit(saveFaqPage);

  return {
    handleSubmit,
    isSaving,
  };
};
