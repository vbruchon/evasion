"use client";

import type { KeyboardEvent, MouseEvent, ReactNode } from "react";

import { cn } from "@/lib/utils";

type AdminEditorSectionProps = {
  active: boolean;
  label: string;
  children: ReactNode;
  interactiveChildren?: boolean;
  onSelect: () => void;
};

export const AdminEditorSection = ({
  active,
  label,
  children,
  interactiveChildren = false,
  onSelect,
}: AdminEditorSectionProps) => {
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (interactiveChildren) {
      event.preventDefault();
    }

    onSelect();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    onSelect();
  };

  return (
    <section
      role="button"
      tabIndex={0}
      aria-label={`Modifier la section ${label}`}
      aria-pressed={active}
      className={cn(
        "group relative cursor-pointer transition focus-visible:outline-none",
        "after:pointer-events-none after:absolute after:inset-0 after:z-60 after:ring-1 after:ring-inset after:transition",
        "focus-visible:after:ring-2 focus-visible:after:ring-primary/70",
        active
          ? "after:ring-primary/50"
          : "after:ring-transparent hover:after:ring-primary/25",
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className={cn(!interactiveChildren && "pointer-events-none")}>
        {children}
      </div>

      <div className="pointer-events-none absolute right-3 top-3 z-30 lg:right-4 lg:top-4">
        <span className="border border-primary/50 bg-background/90 px-2.5 py-1.5 text-[10px] font-medium uppercase tracking-wide text-foreground backdrop-blur-sm lg:hidden">
          Modifier
        </span>

        <span className="hidden border border-primary/50 bg-background/90 px-3 py-2 text-xs font-medium uppercase tracking-wide text-foreground opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 lg:block">
          Cliquer pour modifier
        </span>
      </div>
    </section>
  );
};
