"use client";

import { useAccommodationEditorAvailabilityData } from "@/hooks/use-accommodation-editor-availability-data";
import { useAccommodationEditorPreviewData } from "@/hooks/use-accommodation-editor-preview-data";
import type { AccommodationPreviewImage } from "@/hooks/use-accommodation-images";
import type {
  AccommodationAvailabilityEditorSection,
  AccommodationEditorSection,
  AccommodationHeroEditorSection,
  AccommodationLocationEditorSection,
} from "@/lib/admin/accommodation/editor-sections";
import type { AccommodationUpdateData } from "@/lib/admin/accommodation/get-accommodation-for-update";

import { AccommodationGallery } from "../../slug/accommodation-gallery";
import { AccommodationPresentation } from "../../slug/accommodation-presentation";
import { AccommodationAmenities } from "../../slug/amenities/accommodation-amenities";
import { AccommodationEditorPreviewAvailability } from "./accommodation-editor-preview-availability";
import { AccommodationEditorPreviewHero } from "./accommodation-editor-preview-hero";
import { AccommodationEditorPreviewLocation } from "./accommodation-editor-preview-location";
import { AccommodationEditorPreviewReviews } from "./accommodation-editor-preview-reviews";
import { AccommodationEditorSection as EditorSection } from "./accommodation-editor-section";

type AccommodationEditorPreviewProps = {
  reviews: AccommodationUpdateData["reviews"];

  images: AccommodationPreviewImage[];
  coverImageId: string | null;
  presentationImageId: string | null;

  activeSection: AccommodationEditorSection;
  activeHeroSection: AccommodationHeroEditorSection;
  activeLocationSection: AccommodationLocationEditorSection;
  activeAvailabilitySection: AccommodationAvailabilityEditorSection;

  onSectionChange: (section: AccommodationEditorSection) => void;

  onHeroSectionChange: (section: AccommodationHeroEditorSection) => void;

  onLocationSectionChange: (
    section: AccommodationLocationEditorSection,
  ) => void;

  onAvailabilitySectionChange: (
    section: AccommodationAvailabilityEditorSection,
  ) => void;
};

export const AccommodationEditorPreview = ({
  reviews,
  images,
  coverImageId,
  presentationImageId,
  activeSection,
  activeHeroSection,
  activeLocationSection,
  activeAvailabilitySection,
  onSectionChange,
  onHeroSectionChange,
  onLocationSectionChange,
  onAvailabilitySectionChange,
}: AccommodationEditorPreviewProps) => {
  const {
    availabilityCalendarUrl,
    bookingUrl,
    availabilityTitle,
    availabilityDescription,
    bookingButtonLabel,
    unavailablePeriods,
    loading: availabilityLoading,
    error: availabilityError,
  } = useAccommodationEditorAvailabilityData();

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

      <AccommodationEditorPreviewAvailability
        unavailablePeriods={unavailablePeriods}
        availabilityCalendarUrl={availabilityCalendarUrl}
        bookingUrl={bookingUrl}
        availabilityTitle={availabilityTitle}
        availabilityDescription={availabilityDescription}
        bookingButtonLabel={bookingButtonLabel}
        loading={availabilityLoading}
        error={availabilityError}
        activeSection={activeSection}
        activeAvailabilitySection={activeAvailabilitySection}
        onSectionChange={onSectionChange}
        onAvailabilitySectionChange={onAvailabilitySectionChange}
      />

      <AccommodationEditorPreviewReviews
        reviews={reviews}
        onSectionChange={onSectionChange}
      />

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
