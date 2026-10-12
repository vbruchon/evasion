"use client";

import { Check, CircleAlert, Clock3, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

import type { AccommodationDraftAutosaveStatus } from "@/hooks/accommodations/admin/editor/use-accommodation-draft-autosave";
import { cn } from "@/lib/utils";

type AccommodationEditorAutosaveStatusProps = {
  status: AccommodationDraftAutosaveStatus;
};

type AutosaveStatusIndicatorProps = {
  status: Exclude<AccommodationDraftAutosaveStatus, "idle">;
};

const SAVING_DISPLAY_DELAY = 300;

const AutosaveStatusIndicator = ({ status }: AutosaveStatusIndicatorProps) => {
  const label =
    status === "pending"
      ? "En attente"
      : status === "saving"
        ? "Sauvegarde..."
        : status === "saved"
          ? "Enregistré"
          : "Échec";

  return (
    <span
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 border px-2 py-1 text-xs font-medium",
        status === "pending" &&
          "border-border/70 bg-muted/50 text-muted-foreground",
        status === "saving" && "border-primary/30 bg-primary/5 text-primary",
        status === "saved" &&
          "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
        status === "error" &&
          "border-destructive/30 bg-destructive/5 text-destructive",
      )}
    >
      {status === "pending" ? <Clock3 className="size-3.5" /> : null}

      {status === "saving" ? (
        <LoaderCircle className="size-3.5 animate-spin" />
      ) : null}

      {status === "saved" ? <Check className="size-3.5" /> : null}

      {status === "error" ? <CircleAlert className="size-3.5" /> : null}

      <span className="hidden xl:inline">{label}</span>
      <span className="sr-only xl:hidden">{label}</span>
    </span>
  );
};

const DelayedSavingStatus = () => {
  const [showSaving, setShowSaving] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setShowSaving(true);
    }, SAVING_DISPLAY_DELAY);

    return () => {
      window.clearTimeout(timeout);
    };
  }, []);

  return <AutosaveStatusIndicator status={showSaving ? "saving" : "pending"} />;
};

export const AccommodationEditorAutosaveStatus = ({
  status,
}: AccommodationEditorAutosaveStatusProps) => {
  if (status === "idle") {
    return null;
  }

  if (status === "saving") {
    return <DelayedSavingStatus />;
  }

  return <AutosaveStatusIndicator status={status} />;
};
