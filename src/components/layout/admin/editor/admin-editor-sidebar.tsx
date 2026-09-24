import type { ReactNode } from "react";

type AdminEditorSidebarProps = {
  title?: string;
  description?: string;
  navigation: ReactNode;
  children: ReactNode;
};

export const AdminEditorSidebar = ({
  title,
  description,
  navigation,
  children,
}: AdminEditorSidebarProps) => (
  <aside className="flex h-full min-h-0 flex-col bg-background lg:border-l lg:border-border/60">
    <header className="shrink-0 border-b border-border/60 bg-card/20 px-5 py-5 sm:px-6 sm:py-6">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
        Édition
      </p>

      <h2 className="mt-2 font-heading text-2xl">{title}</h2>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </header>

    {navigation}

    <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
  </aside>
);
