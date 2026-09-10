"use client";

import type { MouseEvent } from "react";

import type {
  AccommodationAvailabilityEditorSection,
  AccommodationEditorSection,
} from "@/lib/admin/accommodation/editor-sections";
import { isAccommodationAvailabilityEditorSection } from "@/lib/admin/accommodation/editor-sections";
import type { AccommodationUnavailablePeriodData } from "@/lib/accommodations/availability/accommodation-availability.types";

import { AccommodationAvailability } from "../../slug/availability/accommodation-availability";
import { AccommodationEditorSection as EditorSection } from "./accommodation-editor-section";

type AccommodationEditorPreviewAvailabilityProps = {
  unavailablePeriods: AccommodationUnavailablePeriodData[];
  availabilityCalendarUrl: string;
  bookingUrl: string;
  availabilityTitle: string;
  availabilityDescription: string;
  bookingButtonLabel: string;
  loading: boolean;
  error: string | null;
  activeSection: AccommodationEditorSection;
  activeAvailabilitySection: AccommodationAvailabilityEditorSection;
  onSectionChange: (section: AccommodationEditorSection) => void;
  onAvailabilitySectionChange: (
    section: AccommodationAvailabilityEditorSection,
  ) => void;
};

export const AccommodationEditorPreviewAvailability = ({
  unavailablePeriods,
  availabilityCalendarUrl,
  bookingUrl,
  availabilityTitle,
  availabilityDescription,
  bookingButtonLabel,
  loading,
  error,
  activeSection,
  activeAvailabilitySection,
  onSectionChange,
  onAvailabilitySectionChange,
}: AccommodationEditorPreviewAvailabilityProps) => {
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    const region = target.closest<HTMLElement>("[data-editor-region]");
    const regionId = region?.dataset.editorRegion;

    if (!regionId || !isAccommodationAvailabilityEditorSection(regionId)) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    onAvailabilitySectionChange(regionId);
    onSectionChange("availability");
  };

  return (
    <EditorSection
      label="Disponibilités"
      active={activeSection === "availability"}
      interactiveChildren
      onSelect={() => onSectionChange("availability")}
    >
      <div onClick={handleClick}>
        <AccommodationAvailability
          unavailablePeriods={unavailablePeriods}
          hasCalendar={Boolean(availabilityCalendarUrl.trim())}
          bookingUrl={bookingUrl.trim() || null}
          availabilityTitle={availabilityTitle}
          availabilityDescription={availabilityDescription}
          bookingButtonLabel={bookingButtonLabel}
          loading={loading}
          error={error}
          activeEditorRegion={
            activeSection === "availability"
              ? activeAvailabilitySection
              : undefined
          }
          editorPreview
        />
      </div>
    </EditorSection>
  );
};
