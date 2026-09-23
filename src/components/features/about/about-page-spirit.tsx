import Image from "next/image";

import { AboutPageContainer } from "@/components/features/about/about-page-container";
import { AboutPageSectionHeading } from "@/components/features/about/about-page-section-heading";
import { AdminEditorRegion } from "@/components/layout/admin/editor/admin-editor-region";
import type { AboutPageSpiritEditorSection } from "@/lib/admin/about/editor/editor-sections";
import { cn } from "@/lib/utils";

type AboutPageSpiritProps = {
  eyebrow: string;
  title: string;
  firstParagraph: string;
  secondParagraph: string;
  handwritten: string;
  imageUrl: string;
  activeEditorRegion?: AboutPageSpiritEditorSection;
  editorPreview?: boolean;
};

export const AboutPageSpirit = ({
  eyebrow,
  title,
  firstParagraph,
  secondParagraph,
  handwritten,
  imageUrl,
  activeEditorRegion,
  editorPreview = false,
}: AboutPageSpiritProps) => {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
      <AboutPageContainer className="relative">
        <AdminEditorRegion
          region="content"
          activeRegion={activeEditorRegion}
          className={cn(editorPreview && "-m-3 p-3")}
        >
          <AboutPageSectionHeading index="01" eyebrow={eyebrow} />
        </AdminEditorRegion>

        <div className="mt-12 grid gap-14 sm:mt-14 lg:mt-16 lg:grid-cols-12 lg:items-center lg:gap-x-20">
          <AdminEditorRegion
            region="content"
            activeRegion={activeEditorRegion}
            className={cn(
              "lg:col-span-5 lg:col-start-1 lg:ml-8",
              editorPreview && "-m-3 p-3",
            )}
          >
            <h2 className="max-w-[22ch] font-heading text-4xl leading-[1.06] tracking-[-0.035em] text-foreground sm:text-5xl lg:text-5xl">
              {title}
            </h2>

            <div className="mt-10 max-w-lg">
              <p className="text-base leading-8 text-muted-foreground">
                {firstParagraph}
              </p>

              <p className="mt-6 text-base leading-8 text-muted-foreground">
                {secondParagraph}
              </p>

              <div className="mt-10 flex items-center gap-4">
                <span className="h-px w-8 bg-primary/70" />

                <span className="text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground/90">
                  Une même intention
                </span>
              </div>
            </div>
          </AdminEditorRegion>

          <figure className="lg:col-span-6 lg:col-start-7">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -left-5 top-14 hidden h-28 w-px bg-primary/55 lg:block"
              />

              <AdminEditorRegion
                region="image"
                activeRegion={activeEditorRegion}
                className={cn(editorPreview && "-m-3 p-3")}
              >
                <div className="relative aspect-4/5 overflow-hidden bg-muted sm:aspect-16/11">
                  <Image
                    src={imageUrl}
                    alt="Intérieur d’un hébergement Évasion"
                    fill
                    unoptimized={imageUrl.startsWith("blob:")}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-linear-to-t from-background/30 via-transparent to-background/5"
                  />

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-primary/[0.035] mix-blend-color"
                  />
                </div>
              </AdminEditorRegion>

              <AdminEditorRegion
                region="content"
                activeRegion={activeEditorRegion}
                className={cn(
                  "relative -mt-3 ml-auto max-w-max sm:-mt-4 lg:-mr-6",
                  editorPreview && "-m-3 p-3",
                )}
              >
                <p className="-rotate-2 pr-3 font-handwritten text-2xl text-primary sm:pr-8 sm:text-3xl lg:text-4xl">
                  {handwritten}
                </p>
              </AdminEditorRegion>
            </div>
          </figure>
        </div>
      </AboutPageContainer>
    </section>
  );
};
