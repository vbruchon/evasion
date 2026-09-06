"use client";

import { useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import type { AccommodationUpdateFormValues } from "~/app/admin/logements/schema";

import {
  MAX_ACCOMMODATION_ACCESSES,
  type AccommodationAccessKey,
} from "@/lib/accommodations/accommodation-accesses";

type UseAccommodationAccessesEditorOptions = {
  disabled: boolean;
};

export const useAccommodationAccessesEditor = ({
  disabled,
}: UseAccommodationAccessesEditorOptions) => {
  const { control, setValue } = useFormContext<AccommodationUpdateFormValues>();

  const watchedAccesses = useWatch({
    control,
    name: "accesses",
  });

  const accesses = useMemo(() => watchedAccesses ?? [], [watchedAccesses]);

  const selectedAccesses = useMemo(
    () => new Map(accesses.map((access) => [access.key, access])),
    [accesses],
  );

  const selectionLimitReached = accesses.length >= MAX_ACCOMMODATION_ACCESSES;

  const handleToggle = (key: AccommodationAccessKey) => {
    if (disabled) {
      return;
    }

    const isSelected = selectedAccesses.has(key);

    if (!isSelected && selectionLimitReached) {
      return;
    }

    const nextAccesses = isSelected
      ? accesses.filter((access) => access.key !== key)
      : [
          ...accesses,
          {
            key,
            details: "",
          },
        ];

    setValue("accesses", nextAccesses, {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleDetailsChange = (
    key: AccommodationAccessKey,
    details: string,
  ) => {
    if (disabled) {
      return;
    }

    setValue(
      "accesses",
      accesses.map((access) =>
        access.key === key
          ? {
              ...access,
              details,
            }
          : access,
      ),
      {
        shouldDirty: true,
        shouldTouch: true,
      },
    );
  };

  return {
    accesses,
    selectedAccesses,
    selectionLimitReached,
    handleToggle,
    handleDetailsChange,
  };
};
