import * as motion from "motion/react-client";

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
      initial={animated ? hiddenState : false}
      animate={animated && trigger === "load" ? visibleState : undefined}
      whileInView={animated && trigger === "inView" ? visibleState : undefined}
      viewport={{
        once: true,
        amount: 0.8,
      }}
      transition={{
        clipPath: {
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1],
        },
        opacity: {
          duration: 0.25,
          delay,
        },
      }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.span>
  );
};
