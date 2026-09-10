"use client";

import { FormProvider } from "react-hook-form";

import { useAccommodationEditor } from "@/hooks/use-accommodation-editor";
import { useAccommodationEditorNavigation } from "@/hooks/use-accommodation-editor-navigation";
import type { AccommodationUpdateData } from "@/lib/admin/accommodation/get-accommodation-for-update";
import { cn } from "@/lib/utils";

import { AccommodationEditorDraftBanner } from "./accommodation-editor-draft-banner";
import { AccommodationEditorHeader } from "./accommodation-editor-header";
import { AccommodationEditorMobileNavigation } from "./accommodation-editor-mobile-navigation";
import { AccommodationEditorPreview } from "./accommodation-editor-preview";
import { AccommodationEditorSidebar } from "./accommodation-editor-sidebar";

type AccommodationEditorProps = {
  accommodation: AccommodationUpdateData;
};

export const AccommodationEditor = ({
  accommodation,
}: AccommodationEditorProps) => {
  const {
    activeSection,
    activeHeroSection,
    activePresentationSection,
    activeLocationSection,
    mobileView,
    activeAvailabilitySection,
    setMobileView,
    handleSectionChange,
    handleHeroSectionChange,
    handlePresentationSectionChange,
    handleLocationSectionChange,
    handleAvailabilitySectionChange,
  } = useAccommodationEditorNavigation();

  const {
    form,

    images,
    coverImageId,
    presentationImageId,
    addFiles,
    removeImage,
    reorderImages,
    setCoverImage,
    setPresentationImage,

    status,
    statusChanged,
    canSaveDraft,
    hasDraft,
    hasCurrentChanges,
    autosaveStatus,

    disabled,
    draftActionDisabled,
    publishDisabled,
    statusSaveDisabled,

    handleSubmit,
    handleSaveDraft,
    handlePublishChanges,
    handleDiscardDraft,
    handleStatusChange,
    handleSaveStatus,

    isSavingDraft,
    isPublishing,
    isDiscardingDraft,
    isUpdatingStatus,
  } = useAccommodationEditor(accommodation);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit}
        className="flex min-h-0 flex-1 flex-col overflow-hidden"
      >
        <AccommodationEditorHeader
          status={status}
          statusChanged={statusChanged}
          canSaveDraft={canSaveDraft}
          hasDraft={hasDraft}
          hasCurrentChanges={hasCurrentChanges}
          disabled={disabled}
          statusSaveDisabled={statusSaveDisabled}
          publishDisabled={publishDisabled}
          isSavingDraft={isSavingDraft}
          isPublishing={isPublishing}
          isUpdatingStatus={isUpdatingStatus}
          autosaveStatus={autosaveStatus}
          onStatusChange={handleStatusChange}
          onSaveStatus={handleSaveStatus}
          onSaveDraft={handleSaveDraft}
          onPublishChanges={handlePublishChanges}
        />

        {hasDraft ? (
          <AccommodationEditorDraftBanner
            slug={accommodation.slug}
            disabled={draftActionDisabled}
            isDiscarding={isDiscardingDraft}
            onDiscard={handleDiscardDraft}
          />
        ) : null}

        <AccommodationEditorMobileNavigation
          activeView={mobileView}
          onViewChange={setMobileView}
        />

        {form.formState.errors.root ? (
          <div className="shrink-0 border-b border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive sm:px-6">
            {form.formState.errors.root.message}
          </div>
        ) : null}

        <div className="min-h-0 flex-1 overflow-hidden lg:grid lg:grid-cols-[minmax(0,1fr)_420px]">
          <div
            className={cn(
              "h-full min-h-0 overflow-y-auto",
              mobileView !== "preview" && "hidden lg:block",
            )}
          >
            <AccommodationEditorPreview
              images={images}
              coverImageId={coverImageId}
              presentationImageId={presentationImageId}
              activeSection={activeSection}
              activeHeroSection={activeHeroSection}
              activeLocationSection={activeLocationSection}
              activeAvailabilitySection={activeAvailabilitySection}
              onSectionChange={handleSectionChange}
              onHeroSectionChange={handleHeroSectionChange}
              onLocationSectionChange={handleLocationSectionChange}
              onAvailabilitySectionChange={handleAvailabilitySectionChange}
            />
          </div>

          <div
            className={cn(
              "h-full min-h-0 overflow-hidden",
              mobileView !== "editor" && "hidden lg:block",
            )}
          >
            <AccommodationEditorSidebar
              activeSection={activeSection}
              activeHeroSection={activeHeroSection}
              activePresentationSection={activePresentationSection}
              activeLocationSection={activeLocationSection}
              activeAvailabilitySection={activeAvailabilitySection}
              images={images}
              coverImageId={coverImageId}
              presentationImageId={presentationImageId}
              disabled={disabled}
              onSectionChange={handleSectionChange}
              onHeroSectionChange={handleHeroSectionChange}
              onPresentationSectionChange={handlePresentationSectionChange}
              onLocationSectionChange={handleLocationSectionChange}
              onAvailabilitySectionChange={handleAvailabilitySectionChange}
              onFilesSelected={addFiles}
              onSetCover={setCoverImage}
              onSetPresentationImage={setPresentationImage}
              onRemoveImage={removeImage}
              onReorderImages={reorderImages}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
