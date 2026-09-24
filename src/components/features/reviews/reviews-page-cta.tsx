import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AdminEditorRegion } from "@/components/layout/admin/editor/admin-editor-region";
import { buttonVariants } from "@/components/ui/button";
import type { ReviewsPageCtaEditorSection } from "@/lib/admin/reviews/editor/editor-sections";
import { REVIEWS_PAGE_DEFAULT_CTA_IMAGE } from "@/lib/reviews/reviews-page-defaults";
import { cn } from "@/lib/utils";
import { SiteSection } from "@/components/layout/site-section";

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
  <SiteSection className="relative flex min-h-100 items-center overflow-hidden bg-background px-6 py-24 md:min-h-135 md:px-12 lg:min-h-130 lg:px-20">
    <AdminEditorRegion
      region="image"
      activeRegion={activeEditorRegion}
      className="absolute inset-0"
    >
      <Image
        src={imageUrl ?? REVIEWS_PAGE_DEFAULT_CTA_IMAGE}
        alt=""
        fill
        unoptimized={imageUrl?.startsWith("blob:")}
        sizes="100vw"
        className="scale-105 object-cover blur-[7px]"
      />

      <div className="absolute inset-0 bg-black/68" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.12)_42%,rgba(0,0,0,0.58)_100%)]" />

      <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-background/65 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background/70 to-transparent" />
    </AdminEditorRegion>

    <AdminEditorRegion
      region="content"
      activeRegion={activeEditorRegion}
      className={cn(
        "relative z-10 mx-auto w-full max-w-4xl text-center",
        editorPreview && "[&_a]:pointer-events-none",
      )}
    >
      <p className="text-xs font-medium uppercase tracking-[0.28em] text-primary">
        {eyebrow}
      </p>

      <div className="mx-auto mt-4 h-px w-10 bg-primary/75" />

      <h2 className="mx-auto mt-7 max-w-3xl font-heading text-4xl leading-snug tracking-[-0.04em] text-white md:text-5xl">
        {highlightBrandName(title)}
      </h2>

      <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/65 md:text-base">
        {description}
      </p>

      <Link
        href="/logements"
        className={cn(
          buttonVariants({
            variant: "default",
            size: "lg",
          }),
          "mt-9 gap-4 px-8",
        )}
      >
        {buttonLabel}

        <ArrowRight
          className="size-4 transition-transform duration-300 group-hover/button:translate-x-1"
          strokeWidth={1.5}
        />
      </Link>

      <p className="mt-8 -rotate-2 font-handwritten text-2xl text-white/70">
        {handwrittenPrefix}{" "}
        <span className="text-primary/80">{handwrittenHighlight}</span>
      </p>
    </AdminEditorRegion>
  </SiteSection>
);
