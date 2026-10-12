"use client";

import { useCallback, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useRouter } from "next/navigation";

import { updateReviewsPageContent } from "~/app/admin/avis/action";
import type { ReviewsPageContentValues } from "@/lib/reviews/reviews-page.schema";

import type { AdminEditorImage } from "@/lib/admin/images/admin-editor-image.types";
import { prepareAdminEditorImages } from "@/lib/admin/editor/prepare-admin-editor-images";
import { uploadFiles } from "@/lib/admin/uploadthing/client";
import { toast } from "sonner";

type UseReviewsPageEditorSubmitOptions = {
  form: UseFormReturn<ReviewsPageContentValues>;
  heroImage: AdminEditorImage | null;
  ctaImage: AdminEditorImage | null;
};

export const useReviewsPageEditorSubmit = ({
  form,
  heroImage,
  ctaImage,
}: UseReviewsPageEditorSubmitOptions) => {
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

  const saveReviewsPage = useCallback(
    async (values: ReviewsPageContentValues) => {
      form.clearErrors("root");
      setIsSaving(true);

      try {
        const preparedImages = await prepareAdminEditorImages(
          {
            heroImage,
            ctaImage,
          },
          (files) =>
            uploadFiles("reviewsPageImages", {
              files,
            }),
        );

        const result = await updateReviewsPageContent(
          values,
          preparedImages.heroImage,
          preparedImages.ctaImage,
        );

        if (!result.success) {
          setRootError(result.message);
          return;
        }

        toast.success("Page Avis enregistrée.");
        router.refresh();
      } catch {
        setRootError(
          "Une erreur est survenue pendant l’enregistrement de la page Avis.",
        );
      } finally {
        setIsSaving(false);
      }
    },
    [ctaImage, form, heroImage, router, setRootError],
  );

  const handleSubmit = form.handleSubmit(saveReviewsPage);

  return {
    handleSubmit,
    isSaving,
  };
};
