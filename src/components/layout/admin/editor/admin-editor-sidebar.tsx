"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type AdminEditorSidebarProps = {
  title?: string;
  description?: string;
  navigation: ReactNode;
  children: ReactNode;
};

const contentTransition = {
  duration: 0.18,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const AdminEditorSidebar = ({
  title,
  description,
  navigation,
  children,
}: AdminEditorSidebarProps) => {
  const transitionKey = title ?? "editor";

  return (
    <aside className="flex h-full min-h-0 flex-col bg-background lg:border-l lg:border-border/60">
      <header className="shrink-0 border-b border-border/60 bg-card/20 px-5 py-5 sm:px-6 sm:py-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
          Édition
        </p>

        <motion.div
          key={transitionKey}
          initial={{ opacity: 0.65, y: 2 }}
          animate={{ opacity: 1, y: 0 }}
          transition={contentTransition}
        >
          <h2 className="mt-2 font-heading text-2xl">{title}</h2>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </motion.div>
      </header>

      {navigation}

      <div className="min-h-0 flex-1 overflow-y-auto">
        <motion.div
          key={transitionKey}
          initial={{ opacity: 0.6, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          transition={contentTransition}
          className="min-h-full"
        >
          {children}
        </motion.div>
      </div>
    </aside>
  );
};
