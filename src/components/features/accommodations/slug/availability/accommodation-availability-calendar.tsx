"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { AccommodationUnavailablePeriodData } from "@/lib/accommodations/availability/accommodation-availability.types";
import {
  getCalendarMonth,
  getCurrentCalendarMonth,
  isSameCalendarMonth,
} from "@/lib/accommodations/availability/accommodation-calendar";
import { cn } from "@/lib/utils";

import { AccommodationAvailabilityMonth } from "./accommodation-availability-month";

type AccommodationAvailabilityCalendarProps = {
  unavailablePeriods: AccommodationUnavailablePeriodData[];
  editorPreview?: boolean;
};

export const AccommodationAvailabilityCalendar = ({
  unavailablePeriods,
  editorPreview = false,
}: AccommodationAvailabilityCalendarProps) => {
  const [initialMonth] = useState(() => getCurrentCalendarMonth());

  const [visibleMonth, setVisibleMonth] = useState(initialMonth);

  const canGoPrevious = !isSameCalendarMonth(visibleMonth, initialMonth);

  const previousDisabled = editorPreview || !canGoPrevious;
  const nextDisabled = editorPreview;

  const handlePreviousMonth = () => {
    if (previousDisabled) {
      return;
    }

    setVisibleMonth((current) => getCalendarMonth(current, -1));
  };

  const handleNextMonth = () => {
    if (nextDisabled) {
      return;
    }

    setVisibleMonth((current) => getCalendarMonth(current, 1));
  };

  return (
    <>
      <div className="mb-3 flex justify-end gap-2">
        <button
          type="button"
          aria-label="Mois précédent"
          disabled={previousDisabled}
          onClick={handlePreviousMonth}
          className={cn(
            "flex size-9 items-center justify-center border border-border/60 text-muted-foreground transition-colors",
            previousDisabled
              ? "cursor-not-allowed opacity-25"
              : "hover:border-primary/50 hover:text-primary",
          )}
        >
          <ChevronLeft className="size-4" />
        </button>

        <button
          type="button"
          aria-label="Mois suivant"
          disabled={nextDisabled}
          onClick={handleNextMonth}
          className={cn(
            "flex size-9 items-center justify-center border border-border/60 text-muted-foreground transition-colors",
            nextDisabled
              ? "cursor-not-allowed opacity-25"
              : "hover:border-primary/50 hover:text-primary",
          )}
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-border/40 bg-card/20 px-4 py-7 sm:px-6">
        <div className="pointer-events-none absolute left-0 top-0 h-px w-24 bg-primary/70" />

        <div className="grid md:grid-cols-2 md:divide-x md:divide-border/40">
          <AccommodationAvailabilityMonth
            month={visibleMonth}
            unavailablePeriods={unavailablePeriods}
          />

          <div className="hidden md:block">
            <AccommodationAvailabilityMonth
              month={getCalendarMonth(visibleMonth, 1)}
              unavailablePeriods={unavailablePeriods}
            />
          </div>
        </div>
      </div>
    </>
  );
};
