"use client";

import { FileClock, LoaderCircle, Save, Send } from "lucide-react";

import type { AccommodationUpdateFormValues } from "~/app/admin/logements/schema";

import { AdminFormSubmitButton } from "@/components/layout/admin/admin-form-submit-button";
import { Button } from "@/components/ui/button";

import { AccommodationStatusDropdown } from "../accommodation-status-dropdown";

type AccommodationEditorHeaderActionsProps = {
  status: AccommodationUpdateFormValues["status"];
  statusChanged: boolean;
  canSaveDraft: boolean;
  hasDraft: boolean;
  disabled: boolean;
  statusSaveDisabled: boolean;
  publishDisabled: boolean;
  isSavingDraft: boolean;
  isPublishing: boolean;
  isUpdatingStatus: boolean;
  onStatusChange: (status: AccommodationUpdateFormValues["status"]) => void;
  onSaveStatus: () => void;
  onSaveDraft: () => void;
  onPublishDraft: () => void;
};

export const AccommodationEditorHeaderActions = ({
  status,
  statusChanged,
  canSaveDraft,
  hasDraft,
  disabled,
  statusSaveDisabled,
  publishDisabled,
  isSavingDraft,
  isPublishing,
  isUpdatingStatus,
  onStatusChange,
  onSaveStatus,
  onSaveDraft,
  onPublishDraft,
}: AccommodationEditorHeaderActionsProps) => {
  return (
    <div className="flex shrink-0 items-center gap-2 lg:gap-3">
      <AccommodationStatusDropdown
        status={status}
        disabled={disabled}
        className="px-2.5 py-2 text-[11px] uppercase tracking-wide sm:px-3 lg:px-4 lg:py-2.5 lg:text-sm"
        onStatusChange={onStatusChange}
      />

      {canSaveDraft && statusChanged ? (
        <>
          <Button
            type="button"
            size="icon"
            className="sm:hidden"
            disabled={statusSaveDisabled}
            aria-label="Enregistrer le statut"
            onClick={onSaveStatus}
          >
            {isUpdatingStatus ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <Save />
            )}
          </Button>

          <Button
            type="button"
            className="hidden sm:inline-flex"
            disabled={statusSaveDisabled}
            onClick={onSaveStatus}
          >
            {isUpdatingStatus ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <Save />
            )}

            {isUpdatingStatus ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </>
      ) : null}

      {canSaveDraft ? (
        <>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="sm:hidden"
            disabled={disabled}
            aria-label="Sauvegarder en brouillon"
            onClick={onSaveDraft}
          >
            <FileClock />
          </Button>

          <Button
            type="button"
            variant="outline"
            className="hidden sm:inline-flex"
            disabled={disabled}
            onClick={onSaveDraft}
          >
            <FileClock />
            {isSavingDraft ? "Sauvegarde..." : "Sauvegarder en brouillon"}
          </Button>
        </>
      ) : null}

      {hasDraft && canSaveDraft ? (
        <>
          <Button
            type="button"
            size="icon"
            className="sm:hidden"
            disabled={publishDisabled}
            aria-label="Publier les modifications"
            onClick={onPublishDraft}
          >
            <Send />
          </Button>

          <Button
            type="button"
            className="hidden sm:inline-flex"
            disabled={publishDisabled}
            onClick={onPublishDraft}
          >
            <Send />
            {isPublishing ? "Publication..." : "Publier les modifications"}
          </Button>
        </>
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
