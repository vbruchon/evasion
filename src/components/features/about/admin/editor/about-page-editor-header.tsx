"use client";

import Link from "next/link";

import { ChevronLeft, ExternalLink, Save } from "lucide-react";

import { Button } from "@/components/ui/button";

type AboutPageEditorHeaderProps = {
  hasCurrentChanges: boolean;
  disabled: boolean;
  isSaving: boolean;
};

export const AboutPageEditorHeader = ({
  hasCurrentChanges,
  disabled,
  isSaving,
}: AboutPageEditorHeaderProps) => (
  <header className="flex shrink-0 items-center justify-between gap-2 border-b border-border/60 px-2 py-3 sm:px-4 lg:gap-6 lg:px-6 lg:py-4">
    <div className="flex min-w-0 items-center gap-3">
      <Button
        nativeButton={false}
        variant="ghost"
        size="icon"
        className="shrink-0 sm:hidden"
        render={<Link href="/admin" />}
        aria-label="Retour à l’administration"
      >
        <ChevronLeft />
      </Button>

      <Button
        nativeButton={false}
        variant="ghost"
        className="hidden sm:inline-flex"
        render={<Link href="/admin" />}
      >
        <ChevronLeft />
        Administration
      </Button>

      <span className="hidden text-muted-foreground lg:inline">/</span>

      <p className="hidden truncate font-medium lg:block">Page À propos</p>

      {hasCurrentChanges ? (
        <span className="hidden text-xs text-muted-foreground xl:inline">
          Modifications non enregistrées
        </span>
      ) : null}
    </div>

    <div className="flex shrink-0 items-center gap-2">
      <Button
        nativeButton={false}
        variant="outline"
        size="icon"
        className="sm:hidden"
        render={<Link href="/a-propos" target="_blank" />}
        aria-label="Voir la page publique"
      >
        <ExternalLink />
      </Button>

      <Button
        nativeButton={false}
        variant="outline"
        className="hidden sm:inline-flex"
        render={<Link href="/a-propos" target="_blank" />}
      >
        <ExternalLink />
        Voir la page
      </Button>

      <Button
        type="submit"
        disabled={disabled}
        size="sm"
        className="sm:h-10 sm:px-6"
      >
        <Save />

        {isSaving ? "Enregistrement..." : "Enregistrer"}
      </Button>
    </div>
  </header>
);
