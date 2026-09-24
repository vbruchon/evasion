"use client";

import { useAccommodationEditorAvailabilityData } from "@/hooks/accommodations/admin/editor/use-accommodation-editor-availability-data";
import { useAccommodationEditorPreviewData } from "@/hooks/accommodations/admin/editor/use-accommodation-editor-preview-data";
import type { AccommodationPreviewImage } from "@/lib/admin/accommodation/images/accommodation-image-previews";
import type {
  AccommodationAvailabilityEditorSection,
  AccommodationEditorSection,
  AccommodationHeroEditorSection,
  AccommodationLocationEditorSection,
  AccommodationPresentationEditorSection,
  AccommodationReviewsEditorSection,
} from "@/lib/admin/accommodation/editor/editor-sections";
import type { AccommodationUpdateData } from "@/lib/admin/accommodation/queries/get-accommodation-for-update";

import { AccommodationEditorPreviewAvailability } from "./accommodation-editor-preview-availability";
import { AccommodationEditorPreviewHero } from "./accommodation-editor-preview-hero";
import { AccommodationEditorPreviewPresentation } from "./accommodation-editor-preview-presentation";
import { AccommodationEditorPreviewLocation } from "./accommodation-editor-preview-location";
import { AccommodationEditorPreviewReviews } from "./accommodation-editor-preview-reviews";
import { AdminEditorSection } from "@/components/layout/admin/editor/admin-editor-section";
import { AccommodationAmenities } from "../../../detail/amenities/accommodation-amenities";
import { AccommodationGallery } from "../../../detail/gallery/accommodation-gallery";

type AccommodationEditorPreviewProps = {
  reviews: AccommodationUpdateData["reviews"];

  images: AccommodationPreviewImage[];
  coverImageId: string | null;
  presentationImageId: string | null;

  activeSection: AccommodationEditorSection;
  activeHeroSection: AccommodationHeroEditorSection;
  activePresentationSection: AccommodationPresentationEditorSection;
  activeLocationSection: AccommodationLocationEditorSection;
  activeAvailabilitySection: AccommodationAvailabilityEditorSection;
  activeReviewsSection: AccommodationReviewsEditorSection;

  onSectionChange: (section: AccommodationEditorSection) => void;

  onHeroSectionChange: (section: AccommodationHeroEditorSection) => void;

  onPresentationSectionChange: (
    section: AccommodationPresentationEditorSection,
  ) => void;

  onLocationSectionChange: (
    section: AccommodationLocationEditorSection,
  ) => void;

  onAvailabilitySectionChange: (
    section: AccommodationAvailabilityEditorSection,
  ) => void;

  onReviewsSectionChange: (section: AccommodationReviewsEditorSection) => void;
};

export const AccommodationEditorPreview = ({
  reviews,
  images,
  coverImageId,
  presentationImageId,
  activeSection,
  activeHeroSection,
  activePresentationSection,
  activeLocationSection,
  activeAvailabilitySection,
  activeReviewsSection,
  onSectionChange,
  onHeroSectionChange,
  onPresentationSectionChange,
  onLocationSectionChange,
  onAvailabilitySectionChange,
  onReviewsSectionChange,
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

      <AccommodationEditorPreviewPresentation
        accommodation={accommodation}
        image={presentationImage}
        activeSection={activeSection}
        activePresentationSection={activePresentationSection}
        onSectionChange={onSectionChange}
        onPresentationSectionChange={onPresentationSectionChange}
      />

      <AdminEditorSection
        label="Équipements"
        active={activeSection === "amenities"}
        onSelect={() => onSectionChange("amenities")}
      >
        <AccommodationAmenities amenities={amenities} editorPreview />
      </AdminEditorSection>

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
        activeSection={activeSection}
        activeReviewsSection={activeReviewsSection}
        onSectionChange={onSectionChange}
        onReviewsSectionChange={onReviewsSectionChange}
      />

      <AdminEditorSection
        label="Galerie"
        active={activeSection === "gallery"}
        onSelect={() => onSectionChange("gallery")}
      >
        <AccommodationGallery
          accommodationName={name}
          images={previewImages}
          editorPreview
        />
      </AdminEditorSection>
    </div>
  );
};
