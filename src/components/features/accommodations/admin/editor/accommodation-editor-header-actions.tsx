"use client";

import { FileClock, Save, Send } from "lucide-react";

import type { AccommodationUpdateFormValues } from "~/app/admin/logements/schema";

import { AdminFormSubmitButton } from "@/components/layout/admin/admin-form-submit-button";

import { AccommodationStatusDropdown } from "../accommodation-status-dropdown";
import { AccommodationEditorHeaderActionButton } from "./accommodation-editor-header-action-button";

type AccommodationEditorHeaderActionsProps = {
  status: AccommodationUpdateFormValues["status"];
  statusChanged: boolean;
  canSaveDraft: boolean;
  hasDraft: boolean;
  hasCurrentChanges: boolean;
  disabled: boolean;
  statusSaveDisabled: boolean;
  publishDisabled: boolean;
  isSavingDraft: boolean;
  isPublishing: boolean;
  isUpdatingStatus: boolean;
  onStatusChange: (status: AccommodationUpdateFormValues["status"]) => void;
  onSaveStatus: () => void;
  onSaveDraft: () => void;
  onPublishChanges: () => void;
};

export const AccommodationEditorHeaderActions = ({
  status,
  statusChanged,
  canSaveDraft,
  hasDraft,
  hasCurrentChanges,
  disabled,
  statusSaveDisabled,
  publishDisabled,
  isSavingDraft,
  isPublishing,
  isUpdatingStatus,
  onStatusChange,
  onSaveStatus,
  onSaveDraft,
  onPublishChanges,
}: AccommodationEditorHeaderActionsProps) => {
  const canPublishChanges = canSaveDraft && (hasDraft || hasCurrentChanges);

  return (
    <div className="flex shrink-0 items-center gap-2 lg:gap-3">
      <AccommodationStatusDropdown
        status={status}
        disabled={disabled}
        className="px-2.5 py-2 text-[11px] uppercase tracking-wide sm:px-3 lg:px-4 lg:py-2.5 lg:text-sm"
        onStatusChange={onStatusChange}
      />

      {canSaveDraft && statusChanged ? (
        <AccommodationEditorHeaderActionButton
          icon={Save}
          label="Enregistrer"
          pendingLabel="Enregistrement..."
          ariaLabel="Enregistrer le statut"
          pending={isUpdatingStatus}
          disabled={statusSaveDisabled}
          onClick={onSaveStatus}
        />
      ) : null}

      {canSaveDraft ? (
        <AccommodationEditorHeaderActionButton
          icon={FileClock}
          label="Sauvegarder en brouillon"
          pendingLabel="Sauvegarde..."
          pending={isSavingDraft}
          disabled={disabled}
          variant="outline"
          onClick={onSaveDraft}
        />
      ) : null}

      {canPublishChanges ? (
        <AccommodationEditorHeaderActionButton
          icon={Send}
          label="Publier les modifications"
          pendingLabel="Publication..."
          pending={isPublishing}
          disabled={publishDisabled}
          onClick={onPublishChanges}
        />
      ) : null}

      {!canSaveDraft ? (
        <AdminFormSubmitButton
          className="px-3 text-xs sm:px-4 sm:text-sm"
          label="Enregistrer"
          pendingLabel="Enregistrement..."
          disabled={disabled}
        />
      ) : null}
    </div>
  );
};
