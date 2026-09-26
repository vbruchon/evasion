import { ArrowLeft, CircleCheck } from "lucide-react";
import Image from "next/image";

import { AdminEditorRegion } from "@/components/layout/admin/editor/admin-editor-region";
import { Button } from "@/components/ui/button";
import type { ContactPageSuccessEditorRegion } from "@/lib/admin/contact/editor/editor-sections";

type ContactRequestSuccessProps = {
  eyebrow: string;
  title: string;
  description: string;
  onReset: () => void;
  activeEditorRegion?: ContactPageSuccessEditorRegion;
};

export const ContactRequestSuccess = ({
  eyebrow,
  title,
  description,
  onReset,
  activeEditorRegion,
}: ContactRequestSuccessProps) => {
  return (
    <div className="relative">
      <Image
        src="/logo-icon.svg"
        alt=""
        width={320}
        height={180}
        aria-hidden
        className="pointer-events-none absolute right-6 top-[58%] hidden w-72 -translate-y-1/2 opacity-[0.025] lg:block xl:right-10 xl:w-80"
      />

      <div className="relative z-10 animate-in fade-in slide-in-from-bottom-3 duration-500">
        <div className="flex items-center gap-3">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/8">
            <CircleCheck className="size-5 text-primary" />
          </div>

          <AdminEditorRegion region="eyebrow" activeRegion={activeEditorRegion}>
            <p className="section-eyebrow text-primary/85">{eyebrow}</p>
          </AdminEditorRegion>
        </div>

        <AdminEditorRegion
          region="title"
          activeRegion={activeEditorRegion}
          className="mt-4"
        >
          <h2 className="max-w-lg font-heading text-4xl leading-[1.02] tracking-[-0.04em] sm:text-5xl">
            {title}
          </h2>
        </AdminEditorRegion>

        <AdminEditorRegion
          region="description"
          activeRegion={activeEditorRegion}
          className="mt-5"
        >
          <p className="max-w-md text-sm leading-7 text-muted-foreground md:text-base">
            {description}
          </p>
        </AdminEditorRegion>

        <div className="mt-8 h-px w-full max-w-sm bg-border/60" />

        <Button
          type="button"
          variant="ghost"
          size="lg"
          className="mt-5 px-0 text-primary hover:bg-transparent hover:text-primary/80"
          onClick={onReset}
        >
          <ArrowLeft data-icon="inline-start" />
          Envoyer un autre message
        </Button>
      </div>
    </div>
  );
};
