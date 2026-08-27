"use client";

import type { KeyboardEvent, ReactNode } from "react";

import { cn } from "@/lib/utils";

type AccommodationEditorSectionProps = {
  active: boolean;
  label: string;
  children: ReactNode;
  onSelect: () => void;
};

export const AccommodationEditorSection = ({
  active,
  label,
  children,
  onSelect,
}: AccommodationEditorSectionProps) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
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
        "group relative cursor-pointer ring-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        active ? "ring-primary" : "ring-transparent hover:ring-primary/40",
      )}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
    >
      <div className="pointer-events-none">{children}</div>

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
