"use client";

import { useMemo } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useWatch } from "react-hook-form";

import type { AccommodationUpdateFormValues } from "@/lib/admin/accommodation/schema";

import type { AccommodationPreviewImage } from "@/lib/admin/accommodation/accommodation-image-previews";
import {
  ACCOMMODATION_DRAFT_VALUE_FIELDS,
  getAccommodationDraftSignature,
  getAccommodationDraftValues,
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
  useWatch({
    control: form.control,
    name: ACCOMMODATION_DRAFT_VALUE_FIELDS,
  });

  const highlights = useWatch({
    control: form.control,
    name: "highlights",
  });

  const amenities = useWatch({
    control: form.control,
    name: "amenities",
  });

  const accesses = useWatch({
    control: form.control,
    name: "accesses",
  });

  const values = getAccommodationDraftValues(form.getValues());

  const signature = useMemo(
    () =>
      getAccommodationDraftSignature({
        values,
        highlights,
        amenities,
        accesses,
        images,
        coverImageId,
        presentationImageId,
      }),
    [
      accesses,
      amenities,
      coverImageId,
      highlights,
      images,
      presentationImageId,
      values,
    ],
  );

  return {
    values,
    highlights,
    amenities,
    accesses,
    signature,
  };
};
