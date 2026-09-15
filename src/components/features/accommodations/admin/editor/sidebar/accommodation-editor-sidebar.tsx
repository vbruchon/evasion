"use client";

import type { AccommodationEditorNavigation } from "@/hooks/accommodations/admin/editor/use-accommodation-editor-navigation";
import type { AccommodationPreviewImage } from "@/lib/admin/accommodation/accommodation-image-previews";
import { getAccommodationEditorSection } from "@/lib/admin/accommodation/editor-sections";
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
    <aside className="flex h-full min-h-0 flex-col bg-background lg:border-l lg:border-border/60">
      <header className="shrink-0 border-b border-border/60 bg-card/20 px-5 py-5 sm:px-6 sm:py-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
          Édition
        </p>

        <h2 className="mt-2 font-heading text-2xl">{currentSection?.label}</h2>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {currentSection?.description}
        </p>
      </header>

      <AccommodationEditorSidebarNavigation navigation={navigation} />

      <div className="min-h-0 flex-1 overflow-y-auto">
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
      </div>
    </aside>
  );
};
