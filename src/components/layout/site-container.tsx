import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SiteContainerProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "inset";
};

export const SiteContainer = ({
  children,
  className,
  variant = "default",
}: SiteContainerProps) => (
  <div
    className={cn(
      "mx-auto w-full",
      variant === "default" && "max-w-420",
      variant === "inset" && "max-w-[1720px] px-6 sm:px-12 lg:px-16 xl:px-20",
      className,
    )}
  >
    {children}
  </div>
);
