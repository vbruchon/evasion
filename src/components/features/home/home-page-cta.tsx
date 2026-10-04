import * as motion from "motion/react-client";

import { AdminEditorRegion } from "@/components/layout/admin/editor/admin-editor-region";
import {
  PageCta,
  PageCtaBackground,
  PageCtaContent,
} from "@/components/layout/page-cta";
import type { HomePageCtaEditorSection } from "@/lib/admin/home/editor/editor-sections";
import { HOME_PAGE_DEFAULT_CTA_IMAGE } from "@/lib/home/home-page-defaults";

type HomePageCtaProps = {
  eyebrow: string;
  title: string;
  description: string;
  buttonLabel: string;
  imageUrl: string | null;
  activeEditorRegion?: HomePageCtaEditorSection;
  editorPreview?: boolean;
  animated?: boolean;
};

export const HomePageCta = ({
  eyebrow,
  title,
  description,
  buttonLabel,
  imageUrl,
  activeEditorRegion,
  editorPreview = false,
  animated = false,
}: HomePageCtaProps) => {
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
            imageUrl={imageUrl ?? HOME_PAGE_DEFAULT_CTA_IMAGE}
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
