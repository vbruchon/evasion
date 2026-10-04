"use client";

import { motion } from "motion/react";
import { ArrowLeft, CircleCheck } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

type ContactRequestSuccessProps = {
  eyebrow: string;
  title: string;
  description: string;
  resetLabel: string;
  onReset: () => void;
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export const ContactRequestSuccess = ({
  eyebrow,
  title,
  description,
  resetLabel,
  onReset,
}: ContactRequestSuccessProps) => {
  return (
    <div className="relative">
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.96,
        }}
        animate={{
          opacity: 0.025,
          scale: 1,
        }}
        transition={{
          duration: 1.2,
          delay: 0.25,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="pointer-events-none absolute right-6 top-[58%] hidden w-72 -translate-y-1/2 lg:block xl:right-10 xl:w-80"
      >
        <Image
          src="/logo-icon.svg"
          alt=""
          width={320}
          height={180}
          aria-hidden
          className="h-auto w-full"
        />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.75,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.65,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex size-12 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/8"
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.6,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.45,
                delay: 0.28,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <CircleCheck className="size-5 text-primary" />
            </motion.div>
          </motion.div>

          <p className="section-eyebrow text-primary/85">{eyebrow}</p>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="mt-4 max-w-lg font-heading text-4xl leading-[1.02] tracking-[-0.04em] sm:text-5xl"
        >
          {title}
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="mt-5 max-w-md text-sm leading-7 text-muted-foreground md:text-base"
        >
          {description}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-8 h-px w-full max-w-sm origin-left bg-border/60"
        />

        <motion.div variants={itemVariants}>
          <Button
            type="button"
            variant="ghost"
            size="lg"
            className="mt-5 px-0 text-primary hover:bg-transparent hover:text-primary/80"
            onClick={onReset}
          >
            <ArrowLeft data-icon="inline-start" />
            {resetLabel}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};
