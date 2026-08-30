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
  enabled,
  initialHasDraft,
  syncPreparedImages,
}: UseAccommodationDraftAutosaveOptions) => {
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
  ] = useWatch({
    control: form.control,
    name: [
      "name",
      "type",
      "subtitle",
      "shortDescription",
      "description",
      "guestCapacity",
      "bedrooms",
      "beds",
      "bathrooms",
      "surface",
    ],
  });

  const highlights = useWatch({
    control: form.control,
    name: "highlights",
  });

  const values = useMemo<AccommodationDraftContent["values"]>(
    () => ({
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
    }),
    [
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
    ],
  );

  const signature = useMemo(
    () =>
      JSON.stringify({
        values,
        highlights,

        images: images.map((image) => ({
          id: image.id,
          isCover: image.id === coverImageId,
        })),
      }),
    [values, highlights, images, coverImageId],
  );

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

    const timeout = window.setTimeout(() => {
      void saveDraft();
    }, AUTOSAVE_DELAY);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [enabled, isAutosaving, saveDraft, signature]);

  return {
    hasDraft,
    isAutosaving,
    autosaveStatus: status,
  };
};
