import * as motion from "motion/react-client";

import { AdminEditorRegion } from "@/components/layout/admin/editor/admin-editor-region";
import {
  PageCta,
  PageCtaBackground,
  PageCtaContent,
} from "@/components/layout/page-cta";
import { ABOUT_PAGE_DEFAULT_CTA_IMAGE } from "@/lib/about/about-page-defaults";
import type { AboutPageCtaEditorSection } from "@/lib/admin/about/editor/editor-sections";

type AboutPageCtaProps = {
  eyebrow: string;
  title: string;
  description: string;
  buttonLabel: string;
  imageUrl: string | null;
  activeEditorRegion?: AboutPageCtaEditorSection;
  editorPreview?: boolean;
  animated?: boolean;
};

export const AboutPageCta = ({
  eyebrow,
  title,
  description,
  buttonLabel,
  imageUrl,
  activeEditorRegion,
  editorPreview = false,
  animated = false,
}: AboutPageCtaProps) => {
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
            imageUrl={imageUrl ?? ABOUT_PAGE_DEFAULT_CTA_IMAGE}
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
          />
        </AdminEditorRegion>
      </motion.div>
    </PageCta>
  );
};
