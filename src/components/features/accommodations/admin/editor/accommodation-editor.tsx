"use client";

import { FormProvider } from "react-hook-form";
import { useState } from "react";

import { useAccommodationEditor } from "@/hooks/use-accommodation-editor";
import type { AccommodationEditorSection } from "@/lib/admin/accommodation/editor-sections";
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

  const [mobileView, setMobileView] =
    useState<AccommodationEditorMobileView>("preview");

  const {
    form,
    images,
    coverImageId,
    addFiles,
    removeImage,
    setCoverImage,
    canSaveDraft,
    hasDraft,
    autosaveStatus,
    disabled,
    publishDisabled,
    handleSubmit,
    handleSaveDraft,
    handlePublishDraft,
    handleDiscardDraft,
    isSavingDraft,
    isPublishing,
    isDiscardingDraft,
  } = useAccommodationEditor(accommodation);

  const handleSectionChange = (section: AccommodationEditorSection) => {
    setActiveSection(section);
    setMobileView("editor");
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit}
        className="flex min-h-0 flex-1 flex-col overflow-hidden"
      >
        <AccommodationEditorHeader
          slug={accommodation.slug}
          canSaveDraft={canSaveDraft}
          hasDraft={hasDraft}
          disabled={disabled}
          publishDisabled={publishDisabled}
          isSavingDraft={isSavingDraft}
          isPublishing={isPublishing}
          autosaveStatus={autosaveStatus}
          onSaveDraft={handleSaveDraft}
          onPublishDraft={handlePublishDraft}
        />

        {hasDraft ? (
          <AccommodationEditorDraftBanner
            slug={accommodation.slug}
            disabled={publishDisabled}
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
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
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
              images={images}
              coverImageId={coverImageId}
              disabled={disabled}
              onFilesSelected={addFiles}
              onSetCover={setCoverImage}
              onRemoveImage={removeImage}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
