"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useWatch } from "react-hook-form";

import { saveAccommodationDraft } from "~/app/admin/logements/action";
import {
  accommodationUpdateSchema,
  type AccommodationDraftContent,
  type AccommodationUpdateFormValues,
  type AccommodationUpdateImageInput,
} from "~/app/admin/logements/schema";

import type { AccommodationPreviewImage } from "@/hooks/use-accommodation-images";
import {
  ACCOMMODATION_DRAFT_VALUE_FIELDS,
  getAccommodationDraftSignature,
} from "@/lib/admin/accommodation/accommodation-draft";
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
  const watchedDraftValues = useWatch({
    control: form.control,
    name: ACCOMMODATION_DRAFT_VALUE_FIELDS,
  });

  const highlights = useWatch({
    control: form.control,
    name: "highlights",
  });

  const values = useMemo<AccommodationDraftContent["values"]>(() => {
    const [
      name,
      type,
      subtitle,
      shortDescription,
      description,
      guestCapacity,
      bedrooms,
      beds,
      bathrooms,
      surface,
    ] = watchedDraftValues;

    return {
      name,
      type,
      subtitle,
      shortDescription,
      description,
      guestCapacity,
      bedrooms,
      beds,
      bathrooms,
      surface,
    };
  }, [watchedDraftValues]);

  const signature = getAccommodationDraftSignature({
    values,
    highlights,
    images,
    coverImageId,
    presentationImageId,
  });

  const lastSavedSignatureRef = useRef(signature);
  const failedSignatureRef = useRef<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const [status, setStatus] =
    useState<AccommodationDraftAutosaveStatus>("idle");

  const [isAutosaving, setIsAutosaving] = useState(false);
  const [hasDraft, setHasDraft] = useState(initialHasDraft);

  const clearPendingAutosave = useCallback(() => {
    if (timeoutRef.current === null) {
      return;
    }

    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  }, []);

  const cancelPendingAutosave = useCallback(() => {
    clearPendingAutosave();

    setStatus((currentStatus) =>
      currentStatus === "pending" ? "idle" : currentStatus,
    );
  }, [clearPendingAutosave]);

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
    presentationImageId,
    highlights,
    images,
    signature,
    syncPreparedImages,
    values,
  ]);

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

    clearPendingAutosave();

    timeoutRef.current = window.setTimeout(() => {
      timeoutRef.current = null;
      void saveDraft();
    }, AUTOSAVE_DELAY);

    return clearPendingAutosave;
  }, [clearPendingAutosave, enabled, isAutosaving, saveDraft, signature]);

  return {
    hasDraft,
    isAutosaving,
    autosaveStatus: status,
    cancelPendingAutosave,
  };
};
