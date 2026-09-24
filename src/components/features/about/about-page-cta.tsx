import Image from "next/image";

import { SiteContainer } from "@/components/layout/site-container";
import { AboutPageLinkButton } from "@/components/features/about/about-page-link-button";
import { AdminEditorRegion } from "@/components/layout/admin/editor/admin-editor-region";
import type { AboutPageCtaEditorSection } from "@/lib/admin/about/editor/editor-sections";
import { ABOUT_PAGE_DEFAULT_CTA_IMAGE } from "@/lib/about/about-page-defaults";
import { cn } from "@/lib/utils";
import { SiteSection } from "@/components/layout/site-section";

type AboutPageCtaProps = {
  eyebrow: string;
  title: string;
  description: string;
  buttonLabel: string;
  imageUrl: string | null;
  activeEditorRegion?: AboutPageCtaEditorSection;
  editorPreview?: boolean;
};

const highlightBrandName = (title: string) =>
  title.split(/(évasion)/gi).map((part, index) =>
    part.toLocaleLowerCase("fr-FR") === "évasion" ? (
      <span key={index} className="text-primary italic">
        {part}
      </span>
    ) : (
      part
    ),
  );

export const AboutPageCta = ({
  eyebrow,
  title,
  description,
  buttonLabel,
  imageUrl,
  activeEditorRegion,
  editorPreview = false,
}: AboutPageCtaProps) => (
  <SiteSection
    bordered={false}
    className="relative flex min-h-125 items-center overflow-hidden bg-background py-20 sm:py-24 lg:py-28"
  >
    <AdminEditorRegion
      region="image"
      activeRegion={activeEditorRegion}
      className="absolute inset-0"
    >
      <Image
        src={imageUrl ?? ABOUT_PAGE_DEFAULT_CTA_IMAGE}
        alt=""
        fill
        unoptimized={imageUrl?.startsWith("blob:")}
        sizes="100vw"
        className="scale-105 object-cover blur-[5px]"
      />

      <div className="absolute inset-0 bg-black/70" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.14)_45%,rgba(0,0,0,0.62)_100%)]" />

      <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-background/65 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background/75 to-transparent" />
    </AdminEditorRegion>

    <SiteContainer variant="inset" className="relative z-10">
      <AdminEditorRegion
        region="content"
        activeRegion={activeEditorRegion}
        className={cn(
          "mx-auto max-w-4xl text-center",
          editorPreview && "[&_a]:pointer-events-none",
        )}
      >
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-primary">
          {eyebrow}
        </p>

        <div className="mx-auto mt-4 h-px w-10 bg-primary/75" />

        <h2 className="mx-auto mt-7 max-w-6xl font-heading text-4xl leading-snug tracking-[-0.04em] text-white md:text-5xl xl:whitespace-nowrap">
          {highlightBrandName(title)}
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/65 md:text-base">
          {description}
        </p>

        <AboutPageLinkButton href="/logements" className="mt-9">
          {buttonLabel}
        </AboutPageLinkButton>
      </AdminEditorRegion>
    </SiteContainer>
  </SiteSection>
);
