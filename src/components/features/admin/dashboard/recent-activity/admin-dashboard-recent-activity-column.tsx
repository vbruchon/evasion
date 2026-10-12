import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type AdminDashboardRecentActivityColumnProps = {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
  divider?: boolean;
  borderedOnMobile?: boolean;
};

export const AdminDashboardRecentActivityColumn = ({
  icon: Icon,
  title,
  children,
  divider = false,
  borderedOnMobile = false,
}: AdminDashboardRecentActivityColumnProps) => (
  <div
    className={cn(
      "relative px-5 py-4 sm:px-7",
      borderedOnMobile && "border-t border-border/50 xl:border-t-0",
    )}
  >
    {divider ? (
      <div
        aria-hidden="true"
        className="absolute bottom-4 right-0 top-4 hidden w-px bg-border/60 xl:block"
      />
    ) : null}

    <div className="flex items-center gap-4">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-primary/25 bg-primary/4">
        <Icon className="size-3.5 text-primary" />
      </div>

      <h3 className="font-heading text-xl tracking-tight">{title}</h3>
    </div>

    <div className="mt-4 sm:pl-13">{children}</div>
  </div>
);
