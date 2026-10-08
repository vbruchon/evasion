"use client";

import { Eye, Settings2 } from "lucide-react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type AdminEditorMobileNavigationProps = {
  activeView: AdminEditorMobileView;
  onViewChange: (view: AdminEditorMobileView) => void;
};

export type AdminEditorMobileView = "preview" | "editor";

export const AdminEditorMobileNavigation = ({
  activeView,
  onViewChange,
}: AdminEditorMobileNavigationProps) => (
  <div className="relative z-40 grid shrink-0 grid-cols-2 border-b border-border/60 bg-background p-2 xl:hidden">
    <button
      type="button"
      aria-pressed={activeView === "preview"}
      className={cn(
        "relative flex h-11 items-center justify-center gap-2 text-sm font-medium transition-colors",
        activeView === "preview"
          ? "text-primary"
          : "text-muted-foreground hover:text-foreground",
      )}
      onClick={() => onViewChange("preview")}
    >
      <Eye className="size-4" />
      Aperçu
      {activeView === "preview" ? (
        <motion.span
          layoutId="admin-editor-mobile-view-indicator"
          aria-hidden="true"
          className="absolute inset-x-4 bottom-0 h-0.5 bg-primary"
          transition={{
            duration: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ) : null}
    </button>

    <button
      type="button"
      aria-pressed={activeView === "editor"}
      className={cn(
        "relative flex h-11 items-center justify-center gap-2 text-sm font-medium transition-colors",
        activeView === "editor"
          ? "text-primary"
          : "text-muted-foreground hover:text-foreground",
      )}
      onClick={() => onViewChange("editor")}
    >
      <Settings2 className="size-4" />
      Édition
      {activeView === "editor" ? (
        <motion.span
          layoutId="admin-editor-mobile-view-indicator"
          aria-hidden="true"
          className="absolute inset-x-4 bottom-0 h-0.5 bg-primary"
          transition={{
            duration: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ) : null}
    </button>
  </div>
);
