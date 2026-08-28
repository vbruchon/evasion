"use client";

import { FileClock, Send } from "lucide-react";
import Link from "next/link";
import { useFormContext, useWatch } from "react-hook-form";

import type { AccommodationUpdateFormValues } from "~/app/admin/logements/schema";

import { AdminFormSubmitButton } from "@/components/layout/admin/admin-form-submit-button";
import { Button } from "@/components/ui/button";

import { AccommodationStatusDropdown } from "../accommodation-status-dropdown";

type AccommodationEditorHeaderActionsProps = {
  slug: string;
  canSaveDraft: boolean;
  hasDraft: boolean;
  disabled: boolean;
  publishDisabled: boolean;
  isSavingDraft: boolean;
  isPublishing: boolean;
  onSaveDraft: () => void;
  onPublishDraft: () => void;
};

export const AccommodationEditorHeaderActions = ({
  slug,
  canSaveDraft,
  hasDraft,
  disabled,
  publishDisabled,
  isSavingDraft,
  isPublishing,
  onSaveDraft,
  onPublishDraft,
}: AccommodationEditorHeaderActionsProps) => {
  const { control, setValue } = useFormContext<AccommodationUpdateFormValues>();

  const status = useWatch({
    control,
    name: "status",
  });

  return (
    <div className="flex shrink-0 items-center gap-2 lg:gap-3">
      <AccommodationStatusDropdown
        status={status}
        disabled={disabled}
        className="px-2.5 py-2 text-[11px] uppercase tracking-wide sm:px-3 lg:px-4 lg:py-2.5 lg:text-sm"
        onStatusChange={(nextStatus) =>
          setValue("status", nextStatus, {
            shouldDirty: true,
            shouldValidate: true,
          })
        }
      />

      <Button
        nativeButton={false}
        variant="outline"
        className="hidden lg:inline-flex"
        render={<Link href={`/logements/${slug}`} target="_blank" />}
      >
        {hasDraft ? "Version publiée" : "Aperçu"}
      </Button>

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

      {hasDraft ? (
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
