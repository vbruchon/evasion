import {
  PageCta,
  PageCtaBackground,
  PageCtaContent,
} from "@/components/layout/page-cta";
import { AdminEditorRegion } from "@/components/layout/admin/editor/admin-editor-region";
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
};

export const AboutPageCta = ({
  eyebrow,
  title,
  description,
  buttonLabel,
  imageUrl,
  activeEditorRegion,
  editorPreview = false,
}: AboutPageCtaProps) => (
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
  </PageCta>
);
