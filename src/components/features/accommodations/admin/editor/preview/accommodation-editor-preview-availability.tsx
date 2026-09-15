"use client";

import { useAccommodationEditorRegionClick } from "@/hooks/accommodations/admin/editor/use-accommodation-editor-region-click";

import type {
  AccommodationAvailabilityEditorSection,
  AccommodationEditorSection,
} from "@/lib/admin/accommodation/editor-sections";
import { isAccommodationAvailabilityEditorSection } from "@/lib/admin/accommodation/editor-sections";
import type { AccommodationUnavailablePeriodData } from "@/lib/accommodations/availability/accommodation-availability.types";

import { AccommodationAvailability } from "../../../detail/availability/accommodation-availability";
import { AccommodationEditorSection as EditorSection } from "../accommodation-editor-section";

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
  const handleClick = useAccommodationEditorRegionClick({
    section: "availability",
    isRegion: isAccommodationAvailabilityEditorSection,
    onSectionChange,
    onRegionChange: onAvailabilitySectionChange,
  });

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
