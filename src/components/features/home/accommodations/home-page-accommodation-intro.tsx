import { AdminEditorRegion } from "@/components/layout/admin/editor/admin-editor-region";
import { PageLinkButton } from "@/components/layout/page-link-button";

type HomePageAccommodationIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  activeEditorRegion?: "content";
};

export const HomePageAccommodationIntro = ({
  eyebrow,
  title,
  description,
  activeEditorRegion,
}: HomePageAccommodationIntroProps) => {
  return (
    <AdminEditorRegion
      region="content"
      activeRegion={activeEditorRegion}
      className="flex flex-col justify-center py-6 xl:py-0"
    >
      <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
        {eyebrow}
      </p>

      <span aria-hidden="true" className="mt-4 block h-px w-10 bg-primary/60" />

      <h2 className="mt-5 font-heading text-4xl font-normal leading-[1.08] sm:text-5xl lg:text-[3rem] xl:text-[3.35rem]">
        {title}
      </h2>

      <p className="mt-6 max-w-sm text-base leading-7 text-muted-foreground">
        {description}
      </p>

      <PageLinkButton href="/logements" variant="text" className="mt-8">
        Voir tous les logements
      </PageLinkButton>
    </AdminEditorRegion>
  );
};
