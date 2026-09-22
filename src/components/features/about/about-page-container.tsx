import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type AboutPageContainerProps = {
  children: ReactNode;
  className?: string;
};

export const AboutPageContainer = ({
  children,
  className,
}: AboutPageContainerProps) => {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1720px] px-6 sm:px-12 lg:px-16 xl:px-20",
        className,
      )}
    >
      {children}
    </div>
  );
};
