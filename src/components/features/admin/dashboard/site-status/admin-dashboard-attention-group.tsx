"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

import { Accordion } from "@/components/ui/accordion";

type AdminDashboardAttentionGroupProps = {
  children: ReactNode;
  className?: string;
};

export const AdminDashboardAttentionGroup = ({
  children,
  className,
}: AdminDashboardAttentionGroupProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<string[]>([]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const container = containerRef.current;

      if (!container || container.contains(event.target as Node)) {
        return;
      }

      setValue([]);
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  return (
    <div ref={containerRef}>
      <Accordion value={value} onValueChange={setValue} className={className}>
        {children}
      </Accordion>
    </div>
  );
};
