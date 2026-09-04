"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { UseFormReturn } from "react-hook-form";

import { saveAccommodationDraft } from "~/app/admin/logements/action";
import {
  accommodationUpdateSchema,
  type AccommodationUpdateFormValues,
  type AccommodationUpdateImageInput,
} from "~/app/admin/logements/schema";

import { useAccommodationDraftSnapshot } from "@/hooks/use-accommodation-draft-snapshot";
import type { AccommodationPreviewImage } from "@/hooks/use-accommodation-images";
import { useDebouncedCallback } from "@/hooks/use-debounced-callback";
import { prepareAccommodationUpdateImages } from "@/lib/admin/accommodation/prepare-accommodation-update-images";

const AUTOSAVE_DELAY = 2500;

export type AccommodationDraftAutosaveStatus =
  | "idle"
  | "pending"
  | "saving"
  | "saved"
  | "error";

type UseAccommodationDraftAutosaveOptions = {
  accommodationId: string;
  form: UseFormReturn<AccommodationUpdateFormValues>;
  images: AccommodationPreviewImage[];
  coverImageId: string | null;
  presentationImageId: string | null;
  enabled: boolean;
  initialHasDraft: boolean;

  syncPreparedImages: (
    sourceImages: AccommodationPreviewImage[],
    preparedImages: AccommodationUpdateImageInput[],
  ) => void;
};

export const useAccommodationDraftAutosave = ({
  accommodationId,
  form,
  images,
  coverImageId,
  presentationImageId,
  enabled,
  initialHasDraft,
  syncPreparedImages,
}: UseAccommodationDraftAutosaveOptions) => {
  const { values, highlights, signature } = useAccommodationDraftSnapshot({
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
  const [hasDraft, setHasDraft] = useState(initialHasDraft);

  const saveDraft = useCallback(async () => {
    const parsedValues = accommodationUpdateSchema.safeParse({
      ...values,
      highlights,
      status: "PUBLISHED",
    });

    if (!parsedValues.success) {
      setStatus("idle");
      return;
    }

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

      const result = await saveAccommodationDraft(
        accommodationId,
        values,
        preparedImages,
        highlights,
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
    } catch {
      failedSignatureRef.current = currentSignature;
      setStatus("error");
    } finally {
      setIsAutosaving(false);
    }
  }, [
    accommodationId,
    coverImageId,
    highlights,
    images,
    presentationImageId,
    signature,
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
