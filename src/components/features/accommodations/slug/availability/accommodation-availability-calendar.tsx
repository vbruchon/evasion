"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { AccommodationEditorRegion } from "@/components/features/accommodations/admin/editor/accommodation-editor-region";
import { useAccommodationBookingSelection } from "@/hooks/use-accommodation-booking-selection";
import type { AccommodationUnavailablePeriodData } from "@/lib/accommodations/availability/accommodation-availability.types";
import {
  getCalendarMonth,
  getCurrentCalendarMonth,
  isSameCalendarMonth,
} from "@/lib/accommodations/availability/accommodation-calendar";
import type { AccommodationAvailabilityEditorSection } from "@/lib/admin/accommodation/editor-sections";
import { cn } from "@/lib/utils";

import { AccommodationAvailabilityBooking } from "./accommodation-availability-booking";
import { AccommodationAvailabilityMonth } from "./accommodation-availability-month";

type AccommodationAvailabilityCalendarProps = {
  unavailablePeriods: AccommodationUnavailablePeriodData[];
  bookingUrl?: string | null;
  bookingButtonLabel: string;
  activeEditorRegion?: AccommodationAvailabilityEditorSection;
  editorPreview?: boolean;
};

export const AccommodationAvailabilityCalendar = ({
  unavailablePeriods,
  bookingUrl,
  bookingButtonLabel,
  activeEditorRegion,
  editorPreview = false,
}: AccommodationAvailabilityCalendarProps) => {
  const [initialMonth] = useState(() => getCurrentCalendarMonth());
  const [visibleMonth, setVisibleMonth] = useState(initialMonth);

  const bookingEnabled = Boolean(bookingUrl) && !editorPreview;

  const { checkIn, checkOut, handleDateSelect, resetSelection } =
    useAccommodationBookingSelection({
      unavailablePeriods,
      enabled: bookingEnabled,
    });

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
    <div className="relative isolate">
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

      <div className="pointer-events-none absolute inset-x-6 bottom-2 top-14 -z-10 bg-primary/[0.035] blur-3xl" />

      <AccommodationEditorRegion
        region="calendar"
        activeRegion={activeEditorRegion}
      >
        <div className="relative overflow-hidden rounded-xl border border-primary/30 bg-card shadow-[0_0_55px_rgba(184,134,55,0.22),0_18px_55px_-24px_rgba(0,0,0,0.95)]">
          <div className="grid px-4 py-7 sm:px-6 md:grid-cols-2 md:divide-x md:divide-border/40">
            <AccommodationAvailabilityMonth
              month={visibleMonth}
              unavailablePeriods={unavailablePeriods}
              checkIn={checkIn}
              checkOut={checkOut}
              interactive={bookingEnabled}
              onDateSelect={handleDateSelect}
            />

            <div className="hidden md:block">
              <AccommodationAvailabilityMonth
                month={getCalendarMonth(visibleMonth, 1)}
                unavailablePeriods={unavailablePeriods}
                checkIn={checkIn}
                checkOut={checkOut}
                interactive={bookingEnabled}
                onDateSelect={handleDateSelect}
              />
            </div>
          </div>

          {bookingUrl ? (
            <AccommodationAvailabilityBooking
              bookingUrl={bookingUrl}
              bookingButtonLabel={bookingButtonLabel}
              checkIn={checkIn}
              checkOut={checkOut}
              editorPreview={editorPreview}
              onReset={resetSelection}
            />
          ) : null}
        </div>
      </AccommodationEditorRegion>
    </div>
  );
};
