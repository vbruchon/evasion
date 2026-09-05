import type { ReactNode } from "react";

type AdminFormSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
  compact?: boolean;
};

export const AdminFormSection = ({
  title,
  description,
  children,
  compact = false,
}: AdminFormSectionProps) => {
  return (
    <section className="border border-border/60 bg-card/35">
      <div
        className={
          compact
            ? "border-b border-border/60 px-6 py-4 md:px-8"
            : "border-b border-border/60 px-6 py-5 md:px-8"
        }
      >
        <h2 className="font-heading text-2xl">{title}</h2>

        {description ? (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>

      <div className={compact ? "px-6 py-5 md:px-8" : "p-6 md:p-8"}>
        {children}
      </div>
    </section>
  );
};
