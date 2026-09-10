"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { UseFormReturn } from "react-hook-form";

import {
  saveAccommodationDraft,
  updateAccommodation,
} from "~/app/admin/logements/action";
import {
  accommodationUpdateSchema,
  type AccommodationUpdateFormValues,
  type AccommodationUpdateImageInput,
} from "~/app/admin/logements/schema";

import { useAccommodationDraftSnapshot } from "@/hooks/use-accommodation-draft-snapshot";
import type {
  AccommodationInitialImage,
  AccommodationPreviewImage,
} from "@/hooks/use-accommodation-images";
import { useDebouncedCallback } from "@/hooks/use-debounced-callback";
import { getAccommodationDraftSignature } from "@/lib/admin/accommodation/accommodation-draft";
import { prepareAccommodationUpdateImages } from "@/lib/admin/accommodation/prepare-accommodation-update-images";

const AUTOSAVE_DELAY = 2500;

export type AccommodationDraftAutosaveStatus =
  | "idle"
  | "pending"
  | "saving"
  | "saved"
  | "error";

type PersistedImagesSyncResult = {
  images: AccommodationPreviewImage[];
  coverImageId: string | null;
  presentationImageId: string | null;
};

type UseAccommodationDraftAutosaveOptions = {
  accommodationId: string;
  form: UseFormReturn<AccommodationUpdateFormValues>;
  images: AccommodationPreviewImage[];
  coverImageId: string | null;
  presentationImageId: string | null;
  enabled: boolean;
  saveAsDraft: boolean;
  persistedStatus: AccommodationUpdateFormValues["status"];
  initialHasDraft: boolean;

  syncPreparedImages: (
    sourceImages: AccommodationPreviewImage[],
    preparedImages: AccommodationUpdateImageInput[],
  ) => void;

  syncPersistedImages: (
    persistedImages: AccommodationInitialImage[],
  ) => PersistedImagesSyncResult;
};

export const useAccommodationDraftAutosave = ({
  accommodationId,
  form,
  images,
  coverImageId,
  presentationImageId,
  enabled,
  saveAsDraft,
  persistedStatus,
  initialHasDraft,
  syncPreparedImages,
  syncPersistedImages,
}: UseAccommodationDraftAutosaveOptions) => {
  const { values, highlights, amenities, accesses, signature } =
    useAccommodationDraftSnapshot({
      form,
      images,
      coverImageId,
      presentationImageId,
    });

  const lastSavedSignatureRef = useRef(signature);
  const failedSignatureRef = useRef<string | null>(null);

  const [status, setStatus] =
    useState<AccommodationDraftAutosaveStatus>("idle");

  const [isAutosaving, setIsAutosaving] = useState(false);

  const [hasDraft, setHasDraft] = useState(
    saveAsDraft ? initialHasDraft : false,
  );

  const saveDraft = useCallback(async () => {
    const updateValues: AccommodationUpdateFormValues = {
      ...values,
      highlights,
      amenities,
      accesses,
      status: persistedStatus,
    };

    const parsedValues = accommodationUpdateSchema.safeParse(updateValues);

    if (!parsedValues.success) {
      console.error(parsedValues.error.issues);
      console.error(updateValues);

      setStatus("idle");
      return;
    }
    // if (!parsedValues.success) {
    //   setStatus("idle");
    //   return;
    // }

    const currentSignature = signature;
    const sourceImages = images;

    setIsAutosaving(true);
    setStatus("saving");

    try {
      const preparedImages = await prepareAccommodationUpdateImages(
        sourceImages,
        coverImageId,
        presentationImageId,
      );

      if (saveAsDraft) {
        const result = await saveAccommodationDraft(
          accommodationId,
          values,
          preparedImages,
          highlights,
          amenities,
          accesses,
        );

        if (!result.success) {
          failedSignatureRef.current = currentSignature;
          setStatus("error");
          return;
        }

        lastSavedSignatureRef.current = currentSignature;
        failedSignatureRef.current = null;

        syncPreparedImages(sourceImages, preparedImages);

        setHasDraft(true);
        setStatus("saved");

        return;
      }

      const result = await updateAccommodation(
        accommodationId,
        updateValues,
        preparedImages,
      );

      if (!result.success) {
        failedSignatureRef.current = currentSignature;
        setStatus("error");
        return;
      }

      const syncedImages = syncPersistedImages(result.images);

      lastSavedSignatureRef.current = getAccommodationDraftSignature({
        values,
        highlights,
        amenities,
        accesses,
        images: syncedImages.images,
        coverImageId: syncedImages.coverImageId,
        presentationImageId: syncedImages.presentationImageId,
      });

      failedSignatureRef.current = null;

      setHasDraft(false);
      setStatus("saved");
    } catch {
      failedSignatureRef.current = currentSignature;
      setStatus("error");
    } finally {
      setIsAutosaving(false);
    }
  }, [
    accommodationId,
    accesses,
    amenities,
    coverImageId,
    highlights,
    images,
    persistedStatus,
    presentationImageId,
    saveAsDraft,
    signature,
    syncPersistedImages,
    syncPreparedImages,
    values,
  ]);

  const { schedule: scheduleAutosave, cancel: cancelAutosave } =
    useDebouncedCallback(() => {
      void saveDraft();
    }, AUTOSAVE_DELAY);

  const cancelPendingAutosave = useCallback(() => {
    cancelAutosave();

    setStatus((currentStatus) =>
      currentStatus === "pending" ? "idle" : currentStatus,
    );
  }, [cancelAutosave]);

  useEffect(() => {
    if (!enabled || isAutosaving) {
      return;
    }

    if (signature === lastSavedSignatureRef.current) {
      return;
    }

    if (failedSignatureRef.current === signature) {
      return;
    }

    if (
      failedSignatureRef.current &&
      failedSignatureRef.current !== signature
    ) {
      failedSignatureRef.current = null;
    }

    setStatus("pending");
    scheduleAutosave();

    return cancelAutosave;
  }, [cancelAutosave, enabled, isAutosaving, scheduleAutosave, signature]);

  return {
    hasDraft,
    isAutosaving,
    autosaveStatus: status,
    cancelPendingAutosave,
  };
};
