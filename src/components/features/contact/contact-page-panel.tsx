import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ContactPagePanelProps = {
  children: ReactNode;
  variant: "page" | "modal";
};

export const ContactPagePanel = ({
  children,
  variant,
}: ContactPagePanelProps) => (
  <div
    className={cn(
      "relative min-w-0 bg-background",
      variant === "page" && "lg:h-svh lg:min-h-0 lg:overflow-y-auto",
      variant === "modal" && "h-full min-h-0 overflow-y-auto",
    )}
  >
    {variant === "page" ? (
      <div
        aria-hidden
        className="pointer-events-none sticky top-0 z-30 hidden h-24 -mb-24 bg-background lg:block"
      />
    ) : null}

    <div
      className={cn(
        "flex min-h-full",
        variant === "page" &&
          "px-6 pb-16 pt-28 sm:px-10 md:px-14 lg:px-14 lg:pb-4 xl:px-18",
        variant === "modal" && "px-6 py-10 sm:px-10 lg:px-12 xl:px-14",
      )}
    >
      <div className="mx-auto my-auto w-full min-w-0 max-w-3xl">{children}</div>
    </div>
  </div>
);
