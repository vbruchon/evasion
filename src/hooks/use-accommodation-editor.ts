"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";

import {
  accommodationUpdateSchema,
  type AccommodationUpdateFormValues,
} from "~/app/admin/logements/schema";

import { useAccommodationDraftAutosave } from "@/hooks/use-accommodation-draft-autosave";
import { useAccommodationEditorSubmit } from "@/hooks/use-accommodation-editor-submit";
import { useAccommodationImages } from "@/hooks/use-accommodation-images";
import { useAccommodationStatus } from "@/hooks/use-accommodation-status";
import { haveAccommodationImagesChanged } from "@/lib/admin/accommodation/accommodation-image-state";
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

      guestCapacity: accommodation.guestCapacity,
      bedrooms: accommodation.bedrooms,
      beds: accommodation.beds,
      bathrooms: accommodation.bathrooms,
      surface: accommodation.surface,

      locationTitle: accommodation.locationTitle,
      locationDescription: accommodation.locationDescription,
      locationLatitude: accommodation.locationLatitude,
      locationLongitude: accommodation.locationLongitude,
      locationRadiusMeters: accommodation.locationRadiusMeters,

      availabilityCalendarUrl: accommodation.availabilityCalendarUrl,
      bookingUrl: accommodation.bookingUrl,

      availabilityTitle: accommodation.availabilityTitle,
      availabilityDescription: accommodation.availabilityDescription,
      bookingButtonLabel: accommodation.bookingButtonLabel,

      highlights: accommodation.highlights,
      amenities: accommodation.amenities,
      accesses: accommodation.accesses,
    },

    mode: "onSubmit",
  });

  const {
    status,
    statusChanged,
    isUpdatingStatus,
    handleStatusChange,
    handleSaveStatus,
  } = useAccommodationStatus({
    accommodationId: accommodation.id,
    initialStatus: accommodation.status,
    form,
  });

  const {
    images,
    coverImageId,
    presentationImageId,
    addFiles,
    removeImage,
    reorderImages,
    setCoverImage,
    setPresentationImage,
    syncPreparedImages,
    syncPersistedImages,
  } = useAccommodationImages({
    initialImages: accommodation.images,
  });

  const imagesChanged = useMemo(
    () =>
      haveAccommodationImagesChanged(
        accommodation.images,
        images,
        coverImageId,
        presentationImageId,
      ),
    [accommodation.images, coverImageId, images, presentationImageId],
  );

  const hasCurrentChanges = form.formState.isDirty || imagesChanged;

  const {
    handleSubmit,
    handleSaveDraft,
    handlePublishChanges: submitPublishChanges,
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

  const { hasDraft, isAutosaving, autosaveStatus, cancelPendingAutosave } =
    useAccommodationDraftAutosave({
      accommodationId: accommodation.id,
      form,
      images,
      coverImageId,
      presentationImageId,
      enabled: !manualActionPending,
      saveAsDraft: canSaveDraft,
      persistedStatus: accommodation.status,
      initialHasDraft: accommodation.hasDraft,
      syncPreparedImages,
      syncPersistedImages,
    });

  const disabled = manualActionPending || isAutosaving;

  const draftActionDisabled = disabled || autosaveStatus === "pending";

  const publishDisabled = disabled || statusChanged;

  const statusSaveDisabled = draftActionDisabled;

  const handlePublishChanges = useCallback(() => {
    cancelPendingAutosave();
    void submitPublishChanges();
  }, [cancelPendingAutosave, submitPublishChanges]);

  return {
    form,

    images,
    coverImageId,
    presentationImageId,

    addFiles,
    removeImage,
    reorderImages,
    setCoverImage,
    setPresentationImage,

    status,
    statusChanged,
    canSaveDraft,
    hasDraft,
    hasCurrentChanges,
    autosaveStatus,

    disabled,
    draftActionDisabled,
    publishDisabled,
    statusSaveDisabled,

    handleSubmit,
    handleSaveDraft,
    handlePublishChanges,
    handleDiscardDraft,
    handleStatusChange,
    handleSaveStatus,

    isSavingDraft,
    isPublishing,
    isDiscardingDraft,
    isUpdatingStatus,
  };
};
