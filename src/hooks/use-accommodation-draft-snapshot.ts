"use client";

import { useMemo } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useWatch } from "react-hook-form";

import type {
  AccommodationDraftContent,
  AccommodationUpdateFormValues,
} from "~/app/admin/logements/schema";

import type { AccommodationPreviewImage } from "@/hooks/use-accommodation-images";
import {
  ACCOMMODATION_DRAFT_VALUE_FIELDS,
  getAccommodationDraftSignature,
} from "@/lib/admin/accommodation/accommodation-draft";

type UseAccommodationDraftSnapshotOptions = {
  form: UseFormReturn<AccommodationUpdateFormValues>;
  images: AccommodationPreviewImage[];
  coverImageId: string | null;
  presentationImageId: string | null;
};

export const useAccommodationDraftSnapshot = ({
  form,
  images,
  coverImageId,
  presentationImageId,
}: UseAccommodationDraftSnapshotOptions) => {
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

  const signature = useMemo(
    () =>
      getAccommodationDraftSignature({
        values,
        highlights,
        images,
        coverImageId,
        presentationImageId,
      }),
    [coverImageId, highlights, images, presentationImageId, values],
  );

  return {
    values,
    highlights,
    signature,
  };
};
