"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  accommodationUpdateSchema,
  type AccommodationUpdateFormValues,
} from "~/app/admin/logements/schema";

import { useAccommodationDraftAutosave } from "@/hooks/use-accommodation-draft-autosave";
import { useAccommodationEditorSubmit } from "@/hooks/use-accommodation-editor-submit";
import { useAccommodationImages } from "@/hooks/use-accommodation-images";
import type { AccommodationUpdateData } from "@/lib/admin/accommodation/get-accommodation-for-update";

export const useAccommodationEditor = (
  accommodation: AccommodationUpdateData,
) => {
  const canSaveDraft = accommodation.status === "PUBLISHED";

  const form = useForm<AccommodationUpdateFormValues>({
    resolver: zodResolver(accommodationUpdateSchema),
    defaultValues: {
      name: accommodation.name,
      type: accommodation.type,
      subtitle: accommodation.subtitle,
      shortDescription: accommodation.shortDescription,
      description: accommodation.description,
      status: accommodation.status,
    },
    mode: "onSubmit",
  });

  const {
    images,
    coverImageId,
    addFiles,
    removeImage,
    setCoverImage,
    syncPreparedImages,
  } = useAccommodationImages({
    initialImages: accommodation.images,
  });

  const {
    handleSubmit,
    handleSaveDraft,
    handlePublishDraft,
    handleDiscardDraft,
    isSavingDraft,
    isPublishing,
    isDiscardingDraft,
  } = useAccommodationEditorSubmit({
    accommodationId: accommodation.id,
    form,
    images,
    coverImageId,
  });

  const manualActionPending =
    form.formState.isSubmitting ||
    isSavingDraft ||
    isPublishing ||
    isDiscardingDraft;

  const { hasDraft, isAutosaving, autosaveStatus } =
    useAccommodationDraftAutosave({
      accommodationId: accommodation.id,
      form,
      images,
      coverImageId,
      enabled: canSaveDraft && !manualActionPending,
      initialHasDraft: accommodation.hasDraft,
      syncPreparedImages,
    });

  const disabled = manualActionPending || isAutosaving;

  const publishDisabled = disabled || autosaveStatus === "pending";

  return {
    form,

    images,
    coverImageId,
    addFiles,
    removeImage,
    setCoverImage,

    canSaveDraft,
    hasDraft,
    autosaveStatus,

    disabled,
    publishDisabled,

    handleSubmit,
    handleSaveDraft,
    handlePublishDraft,
    handleDiscardDraft,

    isSavingDraft,
    isPublishing,
    isDiscardingDraft,
  };
};
