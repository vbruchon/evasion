import { ArrowRight } from "lucide-react";
import * as motion from "motion/react-client";
import Image from "next/image";
import Link from "next/link";

import { AdminEditorRegion } from "@/components/layout/admin/editor/admin-editor-region";
import { ACCOMMODATIONS_PAGE_DEFAULT_CTA_IMAGE } from "@/lib/accommodations-page/accommodations-page-defaults";
import type { AccommodationsPageEditorRegion } from "@/lib/admin/accommodations-page/editor/editor-sections";
import { cn } from "@/lib/utils";

type AccommodationsContactCtaProps = {
  eyebrow: string;
  title: string;
  buttonLabel: string;
  imageUrl: string | null;
  activeEditorRegion?: AccommodationsPageEditorRegion;
  editorPreview?: boolean;
  animated?: boolean;
};

const ctaContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
    },
  },
};

const ctaItemVariants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export const AccommodationsContactCta = ({
  eyebrow,
  title,
  buttonLabel,
  imageUrl,
  activeEditorRegion,
  editorPreview = false,
  animated = false,
}: AccommodationsContactCtaProps) => {
  const shouldAnimate = animated && !editorPreview;

  return (
    <section className="relative overflow-hidden border-y border-border/60">
      <AdminEditorRegion
        region="image"
        activeRegion={activeEditorRegion}
        className="absolute inset-0"
      >
        <Image
          src={imageUrl ?? ACCOMMODATIONS_PAGE_DEFAULT_CTA_IMAGE}
          alt=""
          fill
          unoptimized={imageUrl?.startsWith("blob:")}
          aria-hidden="true"
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-background/60" />

        <div className="absolute inset-0 bg-linear-to-r from-background/90 via-background/70 to-background/90" />
      </AdminEditorRegion>

      <AdminEditorRegion
        region="content"
        activeRegion={activeEditorRegion}
        className={cn(
          "relative mx-auto min-h-48 max-w-360 px-6 py-10 md:px-12 lg:px-16 xl:px-20",
          editorPreview && "[&_a]:pointer-events-none",
        )}
      >
        <motion.div
          variants={ctaContainerVariants}
          initial={shouldAnimate ? "hidden" : "visible"}
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.45,
          }}
          className="grid min-h-28 items-center gap-8 text-center lg:grid-cols-[1fr_auto] lg:text-left"
        >
          <motion.div variants={ctaItemVariants} className="lg:text-center">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-primary/80">
              {eyebrow}
            </p>

            <h2 className="mx-auto mt-3 max-w-2xl font-heading text-2xl leading-tight tracking-tight sm:text-3xl">
              {title}
            </h2>
          </motion.div>

          <motion.div variants={ctaItemVariants} className="mx-auto lg:mx-0">
            <Link
              href="/contact"
              className="group inline-flex h-12 min-w-52 items-center justify-center gap-3 border border-primary/55 px-7 text-sm text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
            >
              {buttonLabel}

              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </AdminEditorRegion>
    </section>
  );
};
