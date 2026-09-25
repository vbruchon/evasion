import { AdminEditorRegion } from "@/components/layout/admin/editor/admin-editor-region";
import {
  PageCta,
  PageCtaBackground,
  PageCtaContent,
} from "@/components/layout/page-cta";
import type { FaqPageCtaEditorSection } from "@/lib/admin/faq/editor/editor-sections";
import { FAQ_PAGE_DEFAULT_CTA_IMAGE } from "@/lib/faq/faq-page-defaults";

type FaqPageCtaProps = {
  eyebrow: string;
  title: string;
  description: string;
  buttonLabel: string;
  imageUrl: string | null;
  activeEditorRegion?: FaqPageCtaEditorSection;
  editorPreview?: boolean;
};

export const FaqPageCta = ({
  eyebrow,
  title,
  description,
  buttonLabel,
  imageUrl,
  activeEditorRegion,
  editorPreview = false,
}: FaqPageCtaProps) => (
  <PageCta
    background={
      <AdminEditorRegion
        region="image"
        activeRegion={activeEditorRegion}
        className="relative h-full"
      >
        <PageCtaBackground imageUrl={imageUrl ?? FAQ_PAGE_DEFAULT_CTA_IMAGE} />
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
        buttonHref="/contact"
      />
    </AdminEditorRegion>
  </PageCta>
);
