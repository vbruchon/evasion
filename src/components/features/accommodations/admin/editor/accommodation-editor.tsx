"use client";

import { FormProvider } from "react-hook-form";

import { useAccommodationEditor } from "@/hooks/accommodations/admin/editor/use-accommodation-editor";
import { useAccommodationEditorNavigation } from "@/hooks/accommodations/admin/editor/use-accommodation-editor-navigation";
import type { AccommodationUpdateData } from "@/lib/admin/accommodation/queries/get-accommodation-for-update";

import { AccommodationEditorDraftBanner } from "./accommodation-editor-draft-banner";
import { AccommodationEditorHeader } from "./accommodation-editor-header";
import { AccommodationEditorSidebar } from "./sidebar/accommodation-editor-sidebar";
import { AccommodationEditorPreview } from "./preview/accommodation-editor-preview";
import { AdminPageEditorWorkspace } from "@/components/layout/admin/editor/admin-page-editor-workspace";

type AccommodationEditorProps = {
  accommodation: AccommodationUpdateData;
};

export const AccommodationEditor = ({
  accommodation,
}: AccommodationEditorProps) => {
  const navigation = useAccommodationEditorNavigation();

  const {
    activeSection,
    activeHeroSection,
    activePresentationSection,
    activeLocationSection,
    activeAvailabilitySection,
    activeReviewsSection,
    mobileView,
    setMobileView,
    handleSectionChange,
    handleHeroSectionChange,
    handlePresentationSectionChange,
    handleLocationSectionChange,
    handleAvailabilitySectionChange,
    handleReviewsSectionChange,
  } = navigation;

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

        <AdminPageEditorWorkspace
          activeView={mobileView}
          onViewChange={setMobileView}
          errorMessage={form.formState.errors.root?.message}
          preview={
            <AccommodationEditorPreview
              images={images}
              coverImageId={coverImageId}
              presentationImageId={presentationImageId}
              reviews={accommodation.reviews}
              activeSection={activeSection}
              activeHeroSection={activeHeroSection}
              activePresentationSection={activePresentationSection}
              activeLocationSection={activeLocationSection}
              activeAvailabilitySection={activeAvailabilitySection}
              activeReviewsSection={activeReviewsSection}
              onSectionChange={handleSectionChange}
              onHeroSectionChange={handleHeroSectionChange}
              onPresentationSectionChange={handlePresentationSectionChange}
              onLocationSectionChange={handleLocationSectionChange}
              onAvailabilitySectionChange={handleAvailabilitySectionChange}
              onReviewsSectionChange={handleReviewsSectionChange}
            />
          }
          sidebar={
            <AccommodationEditorSidebar
              navigation={navigation}
              accommodationId={accommodation.id}
              reviews={accommodation.reviews}
              lastReviewsImportAt={accommodation.lastReviewsImportAt}
              images={images}
              coverImageId={coverImageId}
              presentationImageId={presentationImageId}
              disabled={disabled}
              onFilesSelected={addFiles}
              onSetCover={setCoverImage}
              onSetPresentationImage={setPresentationImage}
              onRemoveImage={removeImage}
              onReorderImages={reorderImages}
            />
          }
        />
      </form>
    </FormProvider>
  );
};
