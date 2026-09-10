"use client";

import type {
  AccommodationEditorSection,
  AccommodationHeroEditorSection,
  AccommodationLocationEditorSection,
} from "@/lib/admin/accommodation/editor-sections";
import type { AccommodationPreviewImage } from "@/hooks/use-accommodation-images";
import { useAccommodationEditorPreviewData } from "@/hooks/use-accommodation-editor-preview-data";

import { AccommodationAmenities } from "../../slug/amenities/accommodation-amenities";
import { AccommodationGallery } from "../../slug/accommodation-gallery";
import { AccommodationPresentation } from "../../slug/accommodation-presentation";
import { AccommodationEditorPreviewHero } from "./accommodation-editor-preview-hero";
import { AccommodationEditorSection as EditorSection } from "./accommodation-editor-section";
import { AccommodationEditorPreviewLocation } from "./accommodation-editor-preview-location";
import { useFormContext, useWatch } from "react-hook-form";
import type { AccommodationUpdateFormValues } from "~/app/admin/logements/schema";
import { useAccommodationAvailabilityPreview } from "@/hooks/use-accommodation-availability-preview";
import { AccommodationAvailability } from "../../slug/availability/accommodation-availability";

type AccommodationEditorPreviewProps = {
  images: AccommodationPreviewImage[];
  coverImageId: string | null;
  presentationImageId: string | null;
  activeSection: AccommodationEditorSection;
  activeHeroSection: AccommodationHeroEditorSection;
  activeLocationSection: AccommodationLocationEditorSection;
  onSectionChange: (section: AccommodationEditorSection) => void;
  onHeroSectionChange: (section: AccommodationHeroEditorSection) => void;
  onLocationSectionChange: (
    section: AccommodationLocationEditorSection,
  ) => void;
};

export const AccommodationEditorPreview = ({
  images,
  coverImageId,
  presentationImageId,
  activeSection,
  activeHeroSection,
  activeLocationSection,
  onSectionChange,
  onHeroSectionChange,
  onLocationSectionChange,
}: AccommodationEditorPreviewProps) => {
  const { control } = useFormContext<AccommodationUpdateFormValues>();

  const availabilityCalendarUrl = useWatch({
    control,
    name: "availabilityCalendarUrl",
    defaultValue: "",
  });

  const {
    unavailablePeriods,
    loading: availabilityLoading,
    error: availabilityError,
  } = useAccommodationAvailabilityPreview(availabilityCalendarUrl);
  const {
    accommodation,
    accesses,
    amenities,
    coverImage,
    highlights,
    name,
    presentationImage,
    previewImages,
  } = useAccommodationEditorPreviewData({
    images,
    coverImageId,
    presentationImageId,
  });

  return (
    <div className="min-w-0 bg-background p-2 sm:p-4">
      <AccommodationEditorPreviewHero
        accommodation={accommodation}
        coverImage={coverImage}
        highlights={highlights}
        hasGallery={previewImages.length > 0}
        activeSection={activeSection}
        activeHeroSection={activeHeroSection}
        onSectionChange={onSectionChange}
        onHeroSectionChange={onHeroSectionChange}
      />

      <EditorSection
        label="Présentation"
        active={activeSection === "presentation"}
        onSelect={() => onSectionChange("presentation")}
      >
        <AccommodationPresentation
          accommodation={accommodation}
          image={presentationImage}
          editorPreview
        />
      </EditorSection>

      <EditorSection
        label="Équipements"
        active={activeSection === "amenities"}
        onSelect={() => onSectionChange("amenities")}
      >
        <AccommodationAmenities amenities={amenities} editorPreview />
      </EditorSection>

      <AccommodationEditorPreviewLocation
        accommodation={accommodation}
        accesses={accesses}
        activeSection={activeSection}
        activeLocationSection={activeLocationSection}
        onSectionChange={onSectionChange}
        onLocationSectionChange={onLocationSectionChange}
      />

      <EditorSection
        label="Disponibilités"
        active={activeSection === "availability"}
        onSelect={() => onSectionChange("availability")}
      >
        <AccommodationAvailability
          unavailablePeriods={unavailablePeriods}
          hasCalendar={Boolean(availabilityCalendarUrl.trim())}
          loading={availabilityLoading}
          error={availabilityError}
          editorPreview
        />
      </EditorSection>

      <EditorSection
        label="Galerie"
        active={activeSection === "gallery"}
        onSelect={() => onSectionChange("gallery")}
      >
        <AccommodationGallery
          accommodationName={name}
          images={previewImages}
          editorPreview
        />
      </EditorSection>
    </div>
  );
};
