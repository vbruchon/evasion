import * as motion from "motion/react-client";

import { AdminEditorRegion } from "@/components/layout/admin/editor/admin-editor-region";
import {
  PageCta,
  PageCtaBackground,
  PageCtaContent,
} from "@/components/layout/page-cta";
import type { ReviewsPageCtaEditorSection } from "@/lib/admin/reviews/editor/editor-sections";
import { REVIEWS_PAGE_DEFAULT_CTA_IMAGE } from "@/lib/reviews/reviews-page-defaults";
import { HandwrittenReveal } from "@/components/motion/handwritten-reveal";

type ReviewsPageCtaProps = {
  eyebrow: string;
  title: string;
  description: string;
  handwrittenPrefix: string;
  handwrittenHighlight: string;
  buttonLabel: string;
  imageUrl: string | null;
  activeEditorRegion?: ReviewsPageCtaEditorSection;
  editorPreview?: boolean;
  animated?: boolean;
};

export const ReviewsPageCta = ({
  eyebrow,
  title,
  description,
  handwrittenPrefix,
  handwrittenHighlight,
  buttonLabel,
  imageUrl,
  activeEditorRegion,
  editorPreview = false,
  animated = false,
}: ReviewsPageCtaProps) => {
  const shouldAnimate = animated && !editorPreview;

  return (
    <PageCta
      background={
        <AdminEditorRegion
          region="image"
          activeRegion={activeEditorRegion}
          className="relative h-full"
        >
          <PageCtaBackground
            imageUrl={imageUrl ?? REVIEWS_PAGE_DEFAULT_CTA_IMAGE}
          />
        </AdminEditorRegion>
      }
    >
      <motion.div
        initial={shouldAnimate ? { opacity: 0, y: 12 } : false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{
          once: true,
          amount: 0.45,
        }}
        transition={{
          duration: 0.95,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <AdminEditorRegion
          region="content"
          activeRegion={activeEditorRegion}
          className={editorPreview ? "[&_a]:pointer-events-none" : undefined}
        >
          <PageCtaContent
            eyebrow={eyebrow}
            title={title}
            description={description}
            buttonLabel={buttonLabel}
            buttonHref="/logements"
          >
            <p className="mt-8 -rotate-2 font-handwritten text-2xl text-white/70">
              <HandwrittenReveal
                animated={shouldAnimate}
                delay={0.85}
                duration={1.1}
              >
                {handwrittenPrefix}
              </HandwrittenReveal>{" "}
              <span className="text-primary/80">
                <HandwrittenReveal
                  trigger="inView"
                  animated={shouldAnimate}
                  delay={1.5}
                  duration={1.1}
                >
                  {handwrittenHighlight}
                </HandwrittenReveal>
              </span>
            </p>
          </PageCtaContent>
        </AdminEditorRegion>
      </motion.div>
    </PageCta>
  );
};
