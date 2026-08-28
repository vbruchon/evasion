"use client";

import { useCallback, useState } from "react";
import type { UseFormReturn } from "react-hook-form";

import {
  discardAccommodationDraft,
  publishAccommodationDraft,
  saveAccommodationDraft,
  updateAccommodation,
} from "~/app/admin/logements/action";
import type {
  AccommodationDraftContent,
  AccommodationUpdateFormValues,
} from "~/app/admin/logements/schema";

import type { AccommodationPreviewImage } from "@/hooks/use-accommodation-images";
import { prepareAccommodationUpdateImages } from "@/lib/admin/accommodation/prepare-accommodation-update-images";

type UseAccommodationEditorSubmitOptions = {
  accommodationId: string;
  form: UseFormReturn<AccommodationUpdateFormValues>;
  images: AccommodationPreviewImage[];
  coverImageId: string | null;
};

const getDraftValues = (
  values: AccommodationUpdateFormValues,
): AccommodationDraftContent["values"] => ({
  name: values.name,
  type: values.type,
  subtitle: values.subtitle,
  shortDescription: values.shortDescription,
  description: values.description,
});

export const useAccommodationEditorSubmit = ({
  accommodationId,
  form,
  images,
  coverImageId,
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

  const handleSubmit = form.handleSubmit(async (values) => {
    form.clearErrors("root");

    try {
      const preparedImages = await prepareAccommodationUpdateImages(
        images,
        coverImageId,
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
  });

  const handleSaveDraft = form.handleSubmit(async (values) => {
    form.clearErrors("root");
    setIsSavingDraft(true);

    try {
      const preparedImages = await prepareAccommodationUpdateImages(
        images,
        coverImageId,
      );

      const result = await saveAccommodationDraft(
        accommodationId,
        getDraftValues(values),
        preparedImages,
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

  const handlePublishDraft = useCallback(async () => {
    form.clearErrors("root");
    setIsPublishing(true);

    try {
      const result = await publishAccommodationDraft(accommodationId);

      if (!result.success) {
        setRootError(result.message);
        return;
      }

      window.location.reload();
    } catch {
      setRootError(
        "Une erreur est survenue pendant la publication du brouillon.",
      );
    } finally {
      setIsPublishing(false);
    }
  }, [accommodationId, form, setRootError]);

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
    handlePublishDraft,
    handleDiscardDraft,
    isSavingDraft,
    isPublishing,
    isDiscardingDraft,
  };
};
