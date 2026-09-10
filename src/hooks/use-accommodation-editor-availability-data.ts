"use client";

import { useFormContext, useWatch } from "react-hook-form";

import type { AccommodationUpdateFormValues } from "~/app/admin/logements/schema";

import { useAccommodationAvailabilityPreview } from "@/hooks/use-accommodation-availability-preview";

export const useAccommodationEditorAvailabilityData = () => {
  const { control } = useFormContext<AccommodationUpdateFormValues>();

  const availabilityCalendarUrl = useWatch({
    control,
    name: "availabilityCalendarUrl",
    defaultValue: "",
  });

  const bookingUrl = useWatch({
    control,
    name: "bookingUrl",
    defaultValue: "",
  });

  const availabilityTitle = useWatch({
    control,
    name: "availabilityTitle",
  });

  const availabilityDescription = useWatch({
    control,
    name: "availabilityDescription",
  });

  const bookingButtonLabel = useWatch({
    control,
    name: "bookingButtonLabel",
  });

  const { unavailablePeriods, loading, error } =
    useAccommodationAvailabilityPreview(availabilityCalendarUrl);

  return {
    availabilityCalendarUrl,
    bookingUrl,
    availabilityTitle,
    availabilityDescription,
    bookingButtonLabel,
    unavailablePeriods,
    loading,
    error,
  };
};
