"use client";

import { Eye, Settings2 } from "lucide-react";

import { cn } from "@/lib/utils";

export type AccommodationEditorMobileView = "preview" | "editor";

type AccommodationEditorMobileNavigationProps = {
  activeView: AccommodationEditorMobileView;
  onViewChange: (view: AccommodationEditorMobileView) => void;
};

export const AccommodationEditorMobileNavigation = ({
  activeView,
  onViewChange,
}: AccommodationEditorMobileNavigationProps) => (
  <div className="relative z-40 grid shrink-0 grid-cols-2 border-b border-border/60 bg-background p-2 lg:hidden">
    <button
      type="button"
      className={cn(
        "flex h-11 items-center justify-center gap-2 border-b-2 text-sm font-medium transition-colors",
        activeView === "preview"
          ? "border-primary text-primary"
          : "border-transparent text-muted-foreground hover:text-foreground",
      )}
      onClick={() => onViewChange("preview")}
    >
      <Eye className="size-4" />
      Aperçu
    </button>

    <button
      type="button"
      className={cn(
        "flex h-11 items-center justify-center gap-2 border-b-2 text-sm font-medium transition-colors",
        activeView === "editor"
          ? "border-primary text-primary"
          : "border-transparent text-muted-foreground hover:text-foreground",
      )}
      onClick={() => onViewChange("editor")}
    >
      <Settings2 className="size-4" />
      Édition
    </button>
  </div>
);
