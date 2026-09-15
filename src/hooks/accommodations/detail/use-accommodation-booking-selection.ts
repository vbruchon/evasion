"use client";

import { useState } from "react";

import type { AccommodationUnavailablePeriodData } from "@/lib/accommodations/availability/accommodation-availability.types";
import { isCalendarDateUnavailable } from "@/lib/accommodations/availability/accommodation-calendar";
import { isAccommodationBookingRangeAvailable } from "@/lib/accommodations/booking/accommodation-booking";

type UseAccommodationBookingSelectionOptions = {
  unavailablePeriods: AccommodationUnavailablePeriodData[];
  enabled?: boolean;
};

export const useAccommodationBookingSelection = ({
  unavailablePeriods,
  enabled = true,
}: UseAccommodationBookingSelectionOptions) => {
  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);

  const handleDateSelect = (date: string) => {
    if (!enabled || isCalendarDateUnavailable(date, unavailablePeriods)) {
      return;
    }

    if (!checkIn || checkOut) {
      setCheckIn(date);
      setCheckOut(null);

      return;
    }

    if (date <= checkIn) {
      setCheckIn(date);
      setCheckOut(null);

      return;
    }

    if (
      isAccommodationBookingRangeAvailable(checkIn, date, unavailablePeriods)
    ) {
      setCheckOut(date);

      return;
    }

    /*
     * The selected date is available, but the time slot falls
     * within an unavailable period: it becomes the new arrival time.
     */
    setCheckIn(date);
    setCheckOut(null);
  };

  const resetSelection = () => {
    setCheckIn(null);
    setCheckOut(null);
  };

  return {
    checkIn,
    checkOut,
    handleDateSelect,
    resetSelection,
  };
};
