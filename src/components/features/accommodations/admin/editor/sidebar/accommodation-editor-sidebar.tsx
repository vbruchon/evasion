"use client";

import { AdminEditorSidebar } from "@/components/layout/admin/editor/admin-editor-sidebar";
import type { AccommodationEditorNavigation } from "@/hooks/accommodations/admin/editor/use-accommodation-editor-navigation";
import type { AccommodationPreviewImage } from "@/lib/admin/accommodation/images/accommodation-image-previews";
import { getAccommodationEditorSection } from "@/lib/admin/accommodation/editor/editor-sections";
import type { AccommodationUpdateData } from "@/lib/admin/accommodation/queries/get-accommodation-for-update";

import { AccommodationEditorSidebarContent } from "./accommodation-editor-sidebar-content";
import { AccommodationEditorSidebarNavigation } from "./accommodation-editor-sidebar-navigation";

type AccommodationEditorSidebarProps = {
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

export const AccommodationEditorSidebar = ({
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
}: AccommodationEditorSidebarProps) => {
  const currentSection = getAccommodationEditorSection(
    navigation.activeSection,
  );

  return (
    <AdminEditorSidebar
      title={currentSection?.label}
      description={currentSection?.description}
      navigation={
        <AccommodationEditorSidebarNavigation navigation={navigation} />
      }
    >
      <AccommodationEditorSidebarContent
        navigation={navigation}
        images={images}
        coverImageId={coverImageId}
        presentationImageId={presentationImageId}
        disabled={disabled}
        accommodationId={accommodationId}
        reviews={reviews}
        lastReviewsImportAt={lastReviewsImportAt}
        onFilesSelected={onFilesSelected}
        onSetCover={onSetCover}
        onSetPresentationImage={onSetPresentationImage}
        onRemoveImage={onRemoveImage}
        onReorderImages={onReorderImages}
      />
    </AdminEditorSidebar>
  );
};
