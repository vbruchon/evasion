"use client";

import { useEffect, useState } from "react";

import { checkAccommodationAvailabilityCalendar } from "~/app/admin/logements/action";

import type { AccommodationUnavailablePeriodData } from "@/lib/accommodations/availability/accommodation-availability.types";

type AccommodationAvailabilityPreviewState = {
  url: string;
  unavailablePeriods: AccommodationUnavailablePeriodData[];
  loading: boolean;
  error: string | null;
};

type AccommodationAvailabilityPreview = Omit<
  AccommodationAvailabilityPreviewState,
  "url"
>;

const emptyPreview: AccommodationAvailabilityPreview = {
  unavailablePeriods: [],
  loading: false,
  error: null,
};

export const useAccommodationAvailabilityPreview = (
  calendarUrl: string,
): AccommodationAvailabilityPreview => {
  const normalizedUrl = calendarUrl.trim();

  const [state, setState] = useState<AccommodationAvailabilityPreviewState>({
    url: "",
    ...emptyPreview,
  });

  useEffect(() => {
    if (!normalizedUrl) {
      return;
    }

    let cancelled = false;

    const timeout = window.setTimeout(() => {
      setState({
        url: normalizedUrl,
        unavailablePeriods: [],
        loading: true,
        error: null,
      });

      void checkAccommodationAvailabilityCalendar(normalizedUrl)
        .then((result) => {
          if (cancelled) {
            return;
          }

          if (!result.success) {
            setState({
              url: normalizedUrl,
              unavailablePeriods: [],
              loading: false,
              error: result.message,
            });

            return;
          }

          setState({
            url: normalizedUrl,
            unavailablePeriods: result.unavailablePeriods,
            loading: false,
            error: null,
          });
        })
        .catch(() => {
          if (cancelled) {
            return;
          }

          setState({
            url: normalizedUrl,
            unavailablePeriods: [],
            loading: false,
            error: "Impossible de vérifier le calendrier iCal.",
          });
        });
    }, 500);

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [normalizedUrl]);

  if (!normalizedUrl) {
    return emptyPreview;
  }

  if (state.url !== normalizedUrl) {
    return {
      unavailablePeriods: [],
      loading: true,
      error: null,
    };
  }

  return {
    unavailablePeriods: state.unavailablePeriods,
    loading: state.loading,
    error: state.error,
  };
};
