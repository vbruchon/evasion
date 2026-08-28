"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useFormContext, useWatch } from "react-hook-form";

import type { AccommodationUpdateFormValues } from "~/app/admin/logements/schema";

import { AdminFormSubmitButton } from "@/components/layout/admin/admin-form-submit-button";
import { Button } from "@/components/ui/button";

import { AccommodationStatusDropdown } from "../accommodation-status-dropdown";

type AccommodationEditorHeaderProps = {
  slug: string;
};

export const AccommodationEditorHeader = ({
  slug,
}: AccommodationEditorHeaderProps) => {
  const {
    control,
    setValue,
    formState: { isSubmitting },
  } = useFormContext<AccommodationUpdateFormValues>();

  const [name, status] = useWatch({
    control,
    name: ["name", "status"],
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
      </div>

      <div className="flex shrink-0 items-center gap-2 lg:gap-3">
        <AccommodationStatusDropdown
          status={status}
          disabled={isSubmitting}
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
          Aperçu
        </Button>

        <AdminFormSubmitButton
          className="px-3 text-xs sm:px-4 sm:text-sm"
          label="Enregistrer"
          pendingLabel="..."
        />
      </div>
    </header>
  );
};
