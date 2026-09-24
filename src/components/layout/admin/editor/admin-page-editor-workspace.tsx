"use client";

import type { ReactNode } from "react";

import {
  AdminEditorMobileNavigation,
  type AdminEditorMobileView,
} from "@/components/layout/admin/editor/admin-editor-mobile-navigation";
import { cn } from "@/lib/utils";

type AdminPageEditorWorkspaceProps = {
  activeView: AdminEditorMobileView;
  onViewChange: (view: AdminEditorMobileView) => void;
  errorMessage?: string;
  preview: ReactNode;
  sidebar: ReactNode;
};

export const AdminPageEditorWorkspace = ({
  activeView,
  onViewChange,
  errorMessage,
  preview,
  sidebar,
}: AdminPageEditorWorkspaceProps) => (
  <>
    <AdminEditorMobileNavigation
      activeView={activeView}
      onViewChange={onViewChange}
    />

    {errorMessage ? (
      <div className="shrink-0 border-b border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive sm:px-6">
        {errorMessage}
      </div>
    ) : null}

    <div className="min-h-0 flex-1 overflow-hidden lg:grid lg:grid-cols-[minmax(0,1fr)_420px]">
      <div
        className={cn(
          "h-full min-h-0 overflow-y-auto",
          activeView !== "preview" && "hidden lg:block",
        )}
      >
        {preview}
      </div>

      <div
        className={cn(
          "h-full min-h-0 overflow-hidden",
          activeView !== "editor" && "hidden lg:block",
        )}
      >
        {sidebar}
      </div>
    </div>
  </>
);
