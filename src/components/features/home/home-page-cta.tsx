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
};

export const HomePageCta = ({
  eyebrow,
  title,
  description,
  buttonLabel,
  imageUrl,
  activeEditorRegion,
  editorPreview = false,
}: HomePageCtaProps) => (
  <PageCta
    background={
      <AdminEditorRegion
        region="image"
        activeRegion={activeEditorRegion}
        className="relative h-full"
      >
        <PageCtaBackground imageUrl={imageUrl ?? HOME_PAGE_DEFAULT_CTA_IMAGE} />
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
