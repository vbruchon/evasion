"use client";

import { useCallback, useState } from "react";
import type { UseFormReturn } from "react-hook-form";

import {
  discardAccommodationDraft,
  saveAccommodationDraft,
  updateAccommodation,
} from "~/app/admin/logements/action";
import type { AccommodationUpdateFormValues } from "~/app/admin/logements/schema";

import type { AccommodationPreviewImage } from "@/hooks/use-accommodation-images";
import { getAccommodationDraftValues } from "@/lib/admin/accommodation/accommodation-draft";
import { prepareAccommodationUpdateImages } from "@/lib/admin/accommodation/prepare-accommodation-update-images";

type UseAccommodationEditorSubmitOptions = {
  accommodationId: string;
  form: UseFormReturn<AccommodationUpdateFormValues>;
  images: AccommodationPreviewImage[];
  coverImageId: string | null;
  presentationImageId: string | null;
};

export const useAccommodationEditorSubmit = ({
  accommodationId,
  form,
  images,
  coverImageId,
  presentationImageId,
}: UseAccommodationEditorSubmitOptions) => {
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isDiscardingDraft, setIsDiscardingDraft] = useState(false);

  const setRootError = useCallback(
    (message: string) => {
      form.setError("root", {
        message,
      });
    },
    [form],
  );

  const saveCurrentAccommodation = useCallback(
    async (values: AccommodationUpdateFormValues) => {
      form.clearErrors("root");

      try {
        const preparedImages = await prepareAccommodationUpdateImages(
          images,
          coverImageId,
          presentationImageId,
        );

        const result = await updateAccommodation(
          accommodationId,
          values,
          preparedImages,
        );

        if (!result.success) {
          if ("field" in result && result.field) {
            form.setError(result.field, {
              message: result.message,
            });

            return;
          }

          setRootError(result.message);
          return;
        }

        window.location.reload();
      } catch {
        setRootError(
          "Une erreur est survenue pendant l’enregistrement du logement.",
        );
      }
    },
    [
      accommodationId,
      coverImageId,
      form,
      images,
      presentationImageId,
      setRootError,
    ],
  );

  const handleSubmit = form.handleSubmit(saveCurrentAccommodation);

  const handlePublishChanges = useCallback(async () => {
    setIsPublishing(true);

    try {
      await handleSubmit();
    } finally {
      setIsPublishing(false);
    }
  }, [handleSubmit]);

  const handleSaveDraft = form.handleSubmit(async (values) => {
    form.clearErrors("root");
    setIsSavingDraft(true);

    try {
      const preparedImages = await prepareAccommodationUpdateImages(
        images,
        coverImageId,
        presentationImageId,
      );

      const result = await saveAccommodationDraft(
        accommodationId,
        getAccommodationDraftValues(values),
        preparedImages,
        values.highlights,
        values.amenities,
        values.accesses,
      );

      if (!result.success) {
        setRootError(result.message);
        return;
      }

      window.location.reload();
    } catch {
      setRootError(
        "Une erreur est survenue pendant l’enregistrement du brouillon.",
      );
    } finally {
      setIsSavingDraft(false);
    }
  });

  const handleDiscardDraft = useCallback(async () => {
    form.clearErrors("root");
    setIsDiscardingDraft(true);

    try {
      const result = await discardAccommodationDraft(accommodationId);

      if (!result.success) {
        setRootError(result.message);
        return;
      }

      window.location.reload();
    } catch {
      setRootError(
        "Une erreur est survenue pendant la suppression du brouillon.",
      );
    } finally {
      setIsDiscardingDraft(false);
    }
  }, [accommodationId, form, setRootError]);

  return {
    handleSubmit,
    handleSaveDraft,
    handlePublishChanges,
    handleDiscardDraft,

    isSavingDraft,
    isPublishing,
    isDiscardingDraft,
  };
};
