import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type SiteSectionSpacing = "none" | "compact" | "default" | "large";

type SiteSectionProps = ComponentProps<"section"> & {
  bordered?: boolean;
  gutters?: boolean;
  spacing?: SiteSectionSpacing;
};

const spacingClasses: Record<SiteSectionSpacing, string> = {
  none: "",
  compact: "py-14 lg:py-16",
  default: "py-16 lg:py-20",
  large: "py-20 lg:py-28",
};

export const SiteSection = ({
  id,
  className,
  bordered = true,
  gutters = false,
  spacing = "none",
  ...props
}: SiteSectionProps) => (
  <section
    id={id}
    className={cn(
      bordered && "border-b border-border/60",
      gutters && "px-6 md:px-12 lg:px-20 xl:px-24",
      id && "scroll-mt-20",
      spacingClasses[spacing],
      className,
    )}
    {...props}
  />
);
