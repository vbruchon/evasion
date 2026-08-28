"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";

import {
  accommodationUpdateSchema,
  type AccommodationUpdateFormValues,
} from "~/app/admin/logements/schema";

import { useAccommodationDraftAutosave } from "@/hooks/use-accommodation-draft-autosave";
import { useAccommodationEditorSubmit } from "@/hooks/use-accommodation-editor-submit";
import { useAccommodationImages } from "@/hooks/use-accommodation-images";
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

  const canSaveDraft = accommodation.status === "PUBLISHED";

  const form = useForm<AccommodationUpdateFormValues>({
    resolver: zodResolver(accommodationUpdateSchema),
    defaultValues: {
      name: accommodation.name,
      type: accommodation.type,
      subtitle: accommodation.subtitle,
      shortDescription: accommodation.shortDescription,
      description: accommodation.description,
      status: accommodation.status,
    },
    mode: "onSubmit",
  });

  const {
    images,
    coverImageId,
    addFiles,
    removeImage,
    setCoverImage,
    syncPreparedImages,
  } = useAccommodationImages({
    initialImages: accommodation.images,
  });

  const {
    handleSubmit,
    handleSaveDraft,
    handlePublishDraft,
    isSavingDraft,
    isPublishing,
  } = useAccommodationEditorSubmit({
    accommodationId: accommodation.id,
    form,
    images,
    coverImageId,
  });

  const manualActionPending =
    form.formState.isSubmitting || isSavingDraft || isPublishing;

  const { hasDraft, isAutosaving, autosaveStatus } =
    useAccommodationDraftAutosave({
      accommodationId: accommodation.id,
      form,
      images,
      coverImageId,
      enabled: canSaveDraft && !manualActionPending,
      initialHasDraft: accommodation.hasDraft,
      syncPreparedImages,
    });

  const handleSectionChange = (section: AccommodationEditorSection) => {
    setActiveSection(section);
    setMobileView("editor");
  };

  const disabled = manualActionPending || isAutosaving;

  const publishDisabled = disabled || autosaveStatus === "pending";

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
          <AccommodationEditorDraftBanner slug={accommodation.slug} />
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
