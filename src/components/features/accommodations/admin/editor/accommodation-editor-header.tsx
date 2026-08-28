"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useFormContext, useWatch } from "react-hook-form";

import type { AccommodationUpdateFormValues } from "~/app/admin/logements/schema";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { AccommodationDraftAutosaveStatus } from "@/hooks/use-accommodation-draft-autosave";

import { AccommodationEditorHeaderActions } from "./accommodation-editor-header-actions";

type AccommodationEditorHeaderProps = {
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
  autosaveStatus: AccommodationDraftAutosaveStatus;
  onStatusChange: (status: AccommodationUpdateFormValues["status"]) => void;
  onSaveStatus: () => void;
  onSaveDraft: () => void;
  onPublishDraft: () => void;
};

export const AccommodationEditorHeader = ({
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
  autosaveStatus,
  onStatusChange,
  onSaveStatus,
  onSaveDraft,
  onPublishDraft,
}: AccommodationEditorHeaderProps) => {
  const { control } = useFormContext<AccommodationUpdateFormValues>();

  const name = useWatch({
    control,
    name: "name",
  });

  return (
    <header className="flex shrink-0 items-center justify-between gap-2 border-b border-border/60 px-2 py-3 sm:px-4 lg:gap-6 lg:px-6 lg:py-4">
      <div className="flex min-w-0 items-center gap-3">
        <Button
          nativeButton={false}
          variant="ghost"
          size="icon"
          className="shrink-0 sm:hidden"
          render={<Link href="/admin/logements" />}
          aria-label="Retour aux logements"
        >
          <ChevronLeft />
        </Button>

        <Button
          nativeButton={false}
          variant="ghost"
          className="hidden sm:inline-flex"
          render={<Link href="/admin/logements" />}
        >
          <ChevronLeft />
          Retour aux logements
        </Button>

        <span className="hidden text-muted-foreground lg:inline">/</span>

        <p className="hidden truncate font-medium lg:block">{name}</p>

        {hasDraft ? (
          <Badge
            variant="outline"
            className="hidden border-primary/40 text-primary xl:inline-flex"
          >
            Brouillon non publié
          </Badge>
        ) : null}

        {canSaveDraft && autosaveStatus !== "idle" ? (
          <span
            className={`hidden text-xs xl:inline ${
              autosaveStatus === "error"
                ? "text-destructive"
                : "text-muted-foreground"
            }`}
          >
            {autosaveStatus === "pending"
              ? "Modifications en attente..."
              : autosaveStatus === "saving"
                ? "Sauvegarde auto..."
                : autosaveStatus === "saved"
                  ? "Brouillon enregistré"
                  : "Échec de la sauvegarde auto"}
          </span>
        ) : null}
      </div>

      <AccommodationEditorHeaderActions
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
        onStatusChange={onStatusChange}
        onSaveStatus={onSaveStatus}
        onSaveDraft={onSaveDraft}
        onPublishDraft={onPublishDraft}
      />
    </header>
  );
};
