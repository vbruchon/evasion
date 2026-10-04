"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

export const PublicPageLoader = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Chargement de la page"
      className="fixed inset-0 z-9999 flex items-center justify-center bg-background"
    >
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="flex w-full -translate-y-4 flex-col items-center px-8"
      >
        <div className="relative aspect-1735/495 w-[min(82vw,500px)]">
          <Image
            src="/logo-horizontal.svg"
            alt=""
            fill
            priority
            aria-hidden
            sizes="430px"
            className="object-contain grayscale opacity-[0.16]"
          />

          <motion.div
            initial={
              prefersReducedMotion ? { height: "100%" } : { height: "0%" }
            }
            animate={{
              height: "100%",
            }}
            transition={{
              duration: prefersReducedMotion ? 0 : 1.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-x-0 bottom-0 overflow-hidden"
          >
            <div className="absolute bottom-0 left-0 aspect-1735/495 w-full">
              <Image
                src="/logo-horizontal.svg"
                alt=""
                fill
                priority
                aria-hidden
                sizes="430px"
                className="object-contain"
              />
            </div>
          </motion.div>
        </div>

        {/* Indicateur */}
        <div className="mt-8 w-full max-w-52">
          <div className="relative h-px overflow-hidden bg-foreground/15">
            {!prefersReducedMotion ? (
              <motion.div
                aria-hidden
                initial={{ x: "-100%" }}
                animate={{ x: "300%" }}
                transition={{
                  duration: 1.65,
                  repeat: Infinity,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="absolute inset-y-0 left-0 w-1/3 bg-primary/80"
              />
            ) : (
              <div className="absolute inset-0 bg-primary/60" />
            )}
          </div>

          <motion.p
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    opacity: [0.45, 0.8, 0.45],
                  }
            }
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mt-4 text-center text-[10px] font-medium uppercase tracking-[0.24em] text-muted-foreground/80"
          >
            Chargement
          </motion.p>
        </div>

        <span className="sr-only">Chargement de la page…</span>
      </motion.div>
    </div>
  );
};
