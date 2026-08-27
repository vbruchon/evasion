"use client";

import { useCallback } from "react";
import type { UseFormReturn } from "react-hook-form";

import { updateAccommodation } from "~/app/admin/logements/action";
import type { AccommodationUpdateFormValues } from "~/app/admin/logements/schema";

import type { AccommodationPreviewImage } from "@/hooks/use-accommodation-images";
import { prepareAccommodationUpdateImages } from "@/lib/admin/accommodation/prepare-accommodation-update-images";

type UseAccommodationEditorSubmitParams = {
  accommodationId: string;
  form: UseFormReturn<AccommodationUpdateFormValues>;
  images: AccommodationPreviewImage[];
  coverImageId: string | null;
};

export const useAccommodationEditorSubmit = ({
  accommodationId,
  form,
  images,
  coverImageId,
}: UseAccommodationEditorSubmitParams) => {
  const submit = useCallback(
    async (values: AccommodationUpdateFormValues) => {
      form.clearErrors("root");

      try {
        const finalImages = await prepareAccommodationUpdateImages(
          images,
          coverImageId,
        );

        const result = await updateAccommodation(
          accommodationId,
          values,
          finalImages,
        );

        if (!result.success) {
          if (result.field) {
            form.setError(result.field, {
              type: "server",
              message: result.message,
            });

            return;
          }

          form.setError("root", {
            type: "server",
            message: result.message,
          });

          return;
        }

        window.location.reload();
      } catch (error) {
        form.setError("root", {
          type: "server",
          message:
            error instanceof Error
              ? error.message
              : "Une erreur est survenue pendant l’enregistrement du logement.",
        });
      }
    },
    [accommodationId, coverImageId, form, images],
  );

  return form.handleSubmit(submit);
};
