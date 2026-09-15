import type { AccommodationEditorNavigation } from "@/hooks/accommodations/admin/editor/use-accommodation-editor-navigation";
import type { AccommodationPreviewImage } from "@/lib/admin/accommodation/accommodation-image-previews";
import type { AccommodationUpdateData } from "@/lib/admin/accommodation/queries/get-accommodation-for-update";

import { AccommodationAvailabilityEditor } from "../section/accommodation-availability-editor";
import { AccommodationGalleryEditor } from "../section/accommodation-gallery-editor";
import { AccommodationHeroEditor } from "../section/accommodation-hero-editor";
import { AccommodationPresentationEditor } from "../section/accommodation-presentation-editor";
import { AccommodationAmenitiesEditor } from "../section/amenities/accommodation-amenities-editor";
import { AccommodationLocationEditor } from "../section/location/accommodation-location-editor";
import { AccommodationReviewsEditor } from "../section/reviews/accommodation-reviews-editor";

type AccommodationEditorSidebarContentProps = {
  navigation: AccommodationEditorNavigation;

  images: AccommodationPreviewImage[];
  coverImageId: string | null;
  presentationImageId: string | null;
  disabled: boolean;

  accommodationId: string;
  reviews: AccommodationUpdateData["reviews"];
  lastReviewsImportAt: AccommodationUpdateData["lastReviewsImportAt"];

  onFilesSelected: (files: File[]) => void;
  onSetCover: (id: string) => void;
  onSetPresentationImage: (id: string) => void;
  onRemoveImage: (id: string) => void;
  onReorderImages: (fromIndex: number, toIndex: number) => void;
};

export const AccommodationEditorSidebarContent = ({
  navigation,
  images,
  coverImageId,
  presentationImageId,
  disabled,
  accommodationId,
  reviews,
  lastReviewsImportAt,
  onFilesSelected,
  onSetCover,
  onSetPresentationImage,
  onRemoveImage,
  onReorderImages,
}: AccommodationEditorSidebarContentProps) => {
  switch (navigation.activeSection) {
    case "hero":
      return (
        <AccommodationHeroEditor
          section={navigation.activeHeroSection}
          images={images}
          coverImageId={coverImageId}
          disabled={disabled}
          onSetCover={onSetCover}
          onOpenGallery={() => navigation.handleSectionChange("gallery")}
        />
      );

    case "presentation":
      return (
        <AccommodationPresentationEditor
          section={navigation.activePresentationSection}
          images={images}
          coverImageId={coverImageId}
          presentationImageId={presentationImageId}
          disabled={disabled}
          onSetPresentationImage={onSetPresentationImage}
        />
      );

    case "amenities":
      return <AccommodationAmenitiesEditor disabled={disabled} />;

    case "location":
      return (
        <AccommodationLocationEditor
          section={navigation.activeLocationSection}
          disabled={disabled}
        />
      );

    case "availability":
      return (
        <AccommodationAvailabilityEditor
          section={navigation.activeAvailabilitySection}
        />
      );

    case "reviews":
      return (
        <AccommodationReviewsEditor
          section={navigation.activeReviewsSection}
          accommodationId={accommodationId}
          reviews={reviews}
          lastReviewsImportAt={lastReviewsImportAt}
        />
      );

    case "gallery":
      return (
        <AccommodationGalleryEditor
          images={images}
          coverImageId={coverImageId}
          presentationImageId={presentationImageId}
          disabled={disabled}
          onFilesSelected={onFilesSelected}
          onRemoveImage={onRemoveImage}
          onReorderImages={onReorderImages}
        />
      );

    default:
      return null;
  }
};
