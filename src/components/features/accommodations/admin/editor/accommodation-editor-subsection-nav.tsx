import { cn } from "@/lib/utils";

type AccommodationEditorSubsection = {
  id: string;
  label: string;
};

type AccommodationEditorSubsectionNavProps<T extends string> = {
  sections: readonly (AccommodationEditorSubsection & { id: T })[];
  activeSection: T;
  columns: 2 | 3 | 4;
  ariaLabel: string;
  onSectionChange: (section: T) => void;
};

export const AccommodationEditorSubsectionNav = <T extends string>({
  sections,
  activeSection,
  columns,
  ariaLabel,
  onSectionChange,
}: AccommodationEditorSubsectionNavProps<T>) => (
  <nav
    className={cn(
      "grid shrink-0 border-b border-border/60 bg-background px-5 sm:px-6",
      columns === 2
        ? "grid-cols-2"
        : columns === 3
          ? "grid-cols-3"
          : "grid-cols-4",
    )}
    aria-label={ariaLabel}
  >
    {sections.map((section) => {
      const active = activeSection === section.id;

      return (
        <button
          key={section.id}
          type="button"
          className={cn(
            "relative cursor-pointer px-2 py-3.5 text-xs font-medium transition-colors",
            active
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground",
          )}
          aria-current={active ? "page" : undefined}
          onClick={() => onSectionChange(section.id)}
        >
          {section.label}

          <span
            aria-hidden="true"
            className={cn(
              "absolute inset-x-2 bottom-0 h-px bg-primary transition-opacity",
              active ? "opacity-100" : "opacity-0",
            )}
          />
        </button>
      );
    })}
  </nav>
);
