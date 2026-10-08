"use client";

import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

type HandwrittenRevealProps = {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  animated?: boolean;
  trigger?: "load" | "inView";
};

export const HandwrittenReveal = ({
  children,
  className,
  delay = 0,
  duration = 1.2,
  animated = true,
  trigger = "load",
}: HandwrittenRevealProps) => {
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = animated && !shouldReduceMotion;

  const hiddenState = {
    clipPath: "inset(-0.35em calc(100% + 0.35em) -0.35em -0.35em)",
    opacity: 0.7,
  };

  const visibleState = {
    clipPath: "inset(-0.35em -0.35em -0.35em -0.35em)",
    opacity: 1,
  };

  return (
    <motion.span
      initial={shouldAnimate ? hiddenState : false}
      animate={shouldAnimate && trigger === "load" ? visibleState : undefined}
      whileInView={
        shouldAnimate && trigger === "inView" ? visibleState : undefined
      }
      viewport={{
        once: true,
        amount: 0.8,
      }}
      transition={
        shouldAnimate
          ? {
              clipPath: {
                duration,
                delay,
                ease: [0.22, 1, 0.36, 1],
              },
              opacity: {
                duration: 0.25,
                delay,
              },
            }
          : undefined
      }
      className={cn("inline-block", className)}
    >
      {children}
    </motion.span>
  );
};
