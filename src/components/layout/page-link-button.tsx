import type { ComponentProps } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PageLinkButtonVariant = "button" | "text" | "text-line";

type PageLinkButtonProps = ComponentProps<typeof Link> & {
  variant?: PageLinkButtonVariant;
};

export const PageLinkButton = ({
  children,
  className,
  variant = "button",
  ...props
}: PageLinkButtonProps) => {
  const isButton = variant === "button";
  const hasLeadingLine = variant === "text-line";

  return (
    <Link
      {...props}
      className={cn(
        isButton
          ? [
              buttonVariants({
                variant: "default",
                size: "lg",
              }),
              "group/button gap-4 px-8",
            ]
          : "group/button inline-flex w-fit items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-primary",
        className,
      )}
    >
      {hasLeadingLine ? (
        <span aria-hidden="true" className="h-px w-8 shrink-0 bg-primary/70" />
      ) : null}

      {children}

      <ArrowRight
        aria-hidden="true"
        className="size-4 shrink-0 transition-transform duration-300 group-hover/button:translate-x-1"
        strokeWidth={1.5}
      />
    </Link>
  );
};
