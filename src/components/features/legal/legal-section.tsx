import type { ReactNode } from "react";

type LegalSectionProps = {
  title: string;
  children: ReactNode;
};

export const LegalSection = ({ title, children }: LegalSectionProps) => (
  <section>
    <h2 className="font-heading text-2xl tracking-tight">{title}</h2>

    <div className="mt-4 space-y-4 text-[0.95rem] leading-7 text-muted-foreground">
      {children}
    </div>
  </section>
);
