import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AboutPageLinkButtonProps = {
  href: string;
  children: string;
  className?: string;
};

export const AboutPageLinkButton = ({
  href,
  children,
  className,
}: AboutPageLinkButtonProps) => {
  return (
    <Link
      href={href}
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
};
