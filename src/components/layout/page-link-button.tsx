import type { ComponentProps } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PageLinkButtonProps = ComponentProps<typeof Link>;

export const PageLinkButton = ({
  children,
  className,
  ...props
}: PageLinkButtonProps) => (
  <Link
    {...props}
    className={cn(
      buttonVariants({
        variant: "default",
        size: "lg",
      }),
      "group/button gap-4 px-8",
      className,
    )}
  >
    {children}

    <ArrowRight
      className="size-4 transition-transform duration-300 group-hover/button:translate-x-1"
      strokeWidth={1.5}
    />
  </Link>
);
