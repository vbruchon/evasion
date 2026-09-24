import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageHeroContentProps = {
  eyebrow: string;
  title: string;
  description: string;
  variant?: "wide" | "compact";
  children?: ReactNode;
};

export const PageHeroContent = ({
  eyebrow,
  title,
  description,
  variant = "wide",
  children,
}: PageHeroContentProps) => {
  const compact = variant === "compact";

  return (
    <>
      <p
        className={cn(
          "uppercase text-primary",
          compact
            ? "text-sm font-medium tracking-[0.28em]"
            : "text-xs tracking-[0.35em]",
        )}
      >
        {eyebrow}
      </p>

      <div
        className={cn(
          "mt-4 h-px bg-primary",
          compact ? "w-8 bg-primary/80" : "w-10",
        )}
      />

      <h1
        className={cn(
          "mt-6 font-heading text-[2.8rem] leading-[1.02] tracking-[-0.035em] text-foreground sm:text-5xl lg:text-[3.7rem]",
          compact ? "lg:w-120" : "lg:w-4xl",
        )}
      >
        {title}
      </h1>

      <p
        className={cn(
          compact
            ? "mt-6 max-w-xs text-sm leading-6 text-foreground/72"
            : "mt-8 max-w-lg text-base leading-7 text-muted-foreground",
        )}
      >
        {description}
      </p>

      {children}
    </>
  );
};
