"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { updateAccommodationStatus } from "~/app/admin/logements/action";
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
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

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
      guestCapacity: accommodation.guestCapacity,
      bedrooms: accommodation.bedrooms,
      beds: accommodation.beds,
      bathrooms: accommodation.bathrooms,
      surface: accommodation.surface,
      highlights: accommodation.highlights,
    },
    mode: "onSubmit",
  });

  const status = useWatch({
    control: form.control,
    name: "status",
  });

  const statusChanged = status !== accommodation.status;

  const {
    images,
    coverImageId,
    presentationImageId,
    addFiles,
    removeImage,
    setCoverImage,
    setPresentationImage,
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
    presentationImageId,
  });

  const manualActionPending =
    form.formState.isSubmitting ||
    isSavingDraft ||
    isPublishing ||
    isDiscardingDraft ||
    isUpdatingStatus;

  const { hasDraft, isAutosaving, autosaveStatus } =
    useAccommodationDraftAutosave({
      accommodationId: accommodation.id,
      form,
      images,
      coverImageId,
      presentationImageId,
      enabled: canSaveDraft && !manualActionPending,
      initialHasDraft: accommodation.hasDraft,
      syncPreparedImages,
    });

  const disabled = manualActionPending || isAutosaving;

  const draftActionDisabled = disabled || autosaveStatus === "pending";

  const publishDisabled = draftActionDisabled || statusChanged;

  const statusSaveDisabled = draftActionDisabled;

  const handleStatusChange = useCallback(
    (nextStatus: AccommodationUpdateFormValues["status"]) => {
      form.setValue("status", nextStatus, {
        shouldDirty: true,
        shouldValidate: true,
      });
    },
    [form],
  );

  const handleSaveStatus = useCallback(async () => {
    if (!statusChanged) {
      return;
    }

    form.clearErrors("root");
    setIsUpdatingStatus(true);

    try {
      await updateAccommodationStatus(accommodation.id, status);

      window.location.reload();
    } catch {
      form.setError("root", {
        message: "Une erreur est survenue pendant la modification du statut.",
      });
    } finally {
      setIsUpdatingStatus(false);
    }
  }, [accommodation.id, form, status, statusChanged]);

  return {
    form,

    images,
    coverImageId,
    presentationImageId,
    addFiles,
    removeImage,
    setCoverImage,
    setPresentationImage,

    status,
    statusChanged,
    canSaveDraft,
    hasDraft,
    autosaveStatus,

    disabled,
    draftActionDisabled,
    publishDisabled,
    statusSaveDisabled,

    handleSubmit,
    handleSaveDraft,
    handlePublishDraft,
    handleDiscardDraft,
    handleStatusChange,
    handleSaveStatus,

    isSavingDraft,
    isPublishing,
    isDiscardingDraft,
    isUpdatingStatus,
  };
};
