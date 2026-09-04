"use client";

import { useState } from "react";
import { FormProvider } from "react-hook-form";

import { useAccommodationEditor } from "@/hooks/use-accommodation-editor";
import type {
  AccommodationEditorSection,
  AccommodationHeroEditorSection,
  AccommodationPresentationEditorSection,
} from "@/lib/admin/accommodation/editor-sections";
import type { AccommodationUpdateData } from "@/lib/admin/accommodation/get-accommodation-for-update";
import { cn } from "@/lib/utils";

import { AccommodationEditorDraftBanner } from "./accommodation-editor-draft-banner";
import { AccommodationEditorHeader } from "./accommodation-editor-header";
import {
  AccommodationEditorMobileNavigation,
  type AccommodationEditorMobileView,
} from "./accommodation-editor-mobile-navigation";
import { AccommodationEditorPreview } from "./accommodation-editor-preview";
import { AccommodationEditorSidebar } from "./accommodation-editor-sidebar";

type AccommodationEditorProps = {
  accommodation: AccommodationUpdateData;
};

export const AccommodationEditor = ({
  accommodation,
}: AccommodationEditorProps) => {
  const [activeSection, setActiveSection] =
    useState<AccommodationEditorSection>("hero");

  const [activeHeroSection, setActiveHeroSection] =
    useState<AccommodationHeroEditorSection>("general");

  const [activePresentationSection, setActivePresentationSection] =
    useState<AccommodationPresentationEditorSection>("content");

  const [mobileView, setMobileView] =
    useState<AccommodationEditorMobileView>("preview");

  const {
    form,
    images,
    coverImageId,
    presentationImageId,
    addFiles,
    removeImage,
    setCoverImage,
    setPresentationImage,
    status,
    statusChanged,
    canSaveDraft,
    hasDraft,
    autosaveStatus,
    disabled,
    draftActionDisabled,
    publishDisabled,
    statusSaveDisabled,
    handleSubmit,
    handleSaveDraft,
    handlePublishDraft,
    handleDiscardDraft,
    handleStatusChange,
    handleSaveStatus,
    isSavingDraft,
    isPublishing,
    isDiscardingDraft,
    isUpdatingStatus,
  } = useAccommodationEditor(accommodation);

  const handleSectionChange = (section: AccommodationEditorSection) => {
    setActiveSection(section);
    setMobileView("editor");
  };

  const handleHeroSectionChange = (section: AccommodationHeroEditorSection) => {
    setActiveHeroSection(section);
  };

  const handlePresentationSectionChange = (
    section: AccommodationPresentationEditorSection,
  ) => {
    setActivePresentationSection(section);
  };

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
          onPublishDraft={handlePublishDraft}
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
              onSectionChange={handleSectionChange}
              onHeroSectionChange={handleHeroSectionChange}
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
              images={images}
              coverImageId={coverImageId}
              presentationImageId={presentationImageId}
              disabled={disabled}
              onHeroSectionChange={handleHeroSectionChange}
              onPresentationSectionChange={handlePresentationSectionChange}
              onFilesSelected={addFiles}
              onSetCover={setCoverImage}
              onSetPresentationImage={setPresentationImage}
              onRemoveImage={removeImage}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
