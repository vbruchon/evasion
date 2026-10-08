import * as motion from "motion/react-client";
import Image from "next/image";

import { AboutPageSectionHeading } from "@/components/features/about/about-page-section-heading";
import { AdminEditorRegion } from "@/components/layout/admin/editor/admin-editor-region";
import { SiteContainer } from "@/components/layout/site-container";
import { SiteSection } from "@/components/layout/site-section";
import { HandwrittenReveal } from "@/components/motion/handwritten-reveal";
import type { AboutPageSpiritEditorSection } from "@/lib/admin/about/editor/editor-sections";

type AboutPageSpiritProps = {
  eyebrow: string;
  title: string;
  firstParagraph: string;
  secondParagraph: string;
  handwritten: string;
  imageUrl: string;
  activeEditorRegion?: AboutPageSpiritEditorSection;
  animated?: boolean;
};

const revealTransition = {
  duration: 0.9,
  ease: [0.22, 1, 0.36, 1] as const,
};

export const AboutPageSpirit = ({
  eyebrow,
  title,
  firstParagraph,
  secondParagraph,
  handwritten,
  imageUrl,
  activeEditorRegion,
  animated = false,
}: AboutPageSpiritProps) => (
  <SiteSection
    bordered={false}
    className="relative overflow-hidden py-16 sm:py-20 lg:py-24"
  >
    <SiteContainer variant="inset" className="relative">
      <motion.div
        initial={animated ? { opacity: 0, y: 12 } : false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{
          once: true,
          amount: 0.5,
        }}
        transition={revealTransition}
      >
        <AdminEditorRegion region="content" activeRegion={activeEditorRegion}>
          <AboutPageSectionHeading index="01" eyebrow={eyebrow} />
        </AdminEditorRegion>
      </motion.div>

      <div className="mt-12 grid gap-14 sm:mt-14 lg:mt-16 xl:grid-cols-12 xl:items-center xl:gap-x-20">
        <motion.div
          initial={animated ? { opacity: 0, y: 16 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            ...revealTransition,
            delay: animated ? 0.08 : 0,
          }}
          className="xl:col-span-5 xl:col-start-1 xl:ml-8"
        >
          <AdminEditorRegion region="content" activeRegion={activeEditorRegion}>
            <h2 className="max-w-[22ch] font-heading text-4xl leading-[1.06] tracking-[-0.035em] text-foreground sm:text-5xl lg:text-5xl">
              {title}
            </h2>

            <div className="mt-10 max-w-lg">
              <p className="text-base leading-8 text-muted-foreground">
                {firstParagraph}
              </p>

              <p className="mt-6 text-base leading-8 text-muted-foreground">
                {secondParagraph}
              </p>

              <div className="mt-10 flex items-center gap-4">
                <span className="h-px w-8 bg-primary/70" />

                <span className="text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground/90">
                  Une même intention
                </span>
              </div>
            </div>
          </AdminEditorRegion>
        </motion.div>

        <motion.figure
          initial={animated ? { opacity: 0, x: 18 } : false}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 1,
            delay: animated ? 0.12 : 0,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="xl:col-span-6 xl:col-start-7"
        >
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -left-5 top-14 hidden h-28 w-px bg-primary/55 xl:block"
            />

            <AdminEditorRegion region="image" activeRegion={activeEditorRegion}>
              <div className="relative aspect-4/5 overflow-hidden bg-muted sm:aspect-16/11">
                <Image
                  src={imageUrl}
                  alt="Intérieur d’un hébergement Évasion"
                  fill
                  unoptimized={imageUrl.startsWith("blob:")}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-t from-background/30 via-transparent to-background/5"
                />

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-primary/[0.035] mix-blend-color"
                />
              </div>
            </AdminEditorRegion>

            <AdminEditorRegion
              region="content"
              activeRegion={activeEditorRegion}
              className="relative -mt-3 ml-auto max-w-max sm:-mt-4 xl:-mr-6"
            >
              <p className="-rotate-2 pr-3 font-handwritten text-2xl text-primary sm:pr-8 sm:text-3xl lg:text-4xl">
                <HandwrittenReveal
                  animated={animated}
                  trigger="inView"
                  delay={0.25}
                  duration={1.35}
                >
                  {handwritten}
                </HandwrittenReveal>
              </p>
            </AdminEditorRegion>
          </div>
        </motion.figure>
      </div>
    </SiteContainer>
  </SiteSection>
);
