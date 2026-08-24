import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type AdminPageHeaderProps = {
  icon: LucideIcon;
  title: string;
  description?: string;
  actions?: ReactNode;
};

export const AdminPageHeader = ({
  icon: Icon,
  title,
  description,
  actions,
}: AdminPageHeaderProps) => {
  return (
    <header className="flex flex-col gap-6 border-b border-border/60 pb-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <div className="flex items-center gap-4">
          <Icon className="size-5 text-primary" />

          <h1 className="font-heading text-[1.75rem]">{title}</h1>
        </div>

        {description ? (
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>

      {actions ? (
        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
          {actions}
        </div>
      ) : null}
    </header>
  );
};
