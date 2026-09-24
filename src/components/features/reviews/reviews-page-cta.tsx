import {
  PageCta,
  PageCtaBackground,
  PageCtaContent,
} from "@/components/layout/page-cta";
import { AdminEditorRegion } from "@/components/layout/admin/editor/admin-editor-region";
import type { ReviewsPageCtaEditorSection } from "@/lib/admin/reviews/editor/editor-sections";
import { REVIEWS_PAGE_DEFAULT_CTA_IMAGE } from "@/lib/reviews/reviews-page-defaults";

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
}: ReviewsPageCtaProps) => (
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
          {handwrittenPrefix}{" "}
          <span className="text-primary/80">{handwrittenHighlight}</span>
        </p>
      </PageCtaContent>
    </AdminEditorRegion>
  </PageCta>
);
