import Image from "next/image";

import { AdminEditorRegion } from "@/components/layout/admin/editor/admin-editor-region";
import type { HomePageEscapeEditorSection } from "@/lib/admin/home/editor/editor-sections";

type HomePageEscapeVisualProps = {
  imageUrl: string;
  handwritten: string;
  activeEditorRegion?: HomePageEscapeEditorSection;
};

export const HomePageEscapeVisual = ({
  imageUrl,
  handwritten,
  activeEditorRegion,
}: HomePageEscapeVisualProps) => {
  return (
    <div className="absolute inset-0">
      <AdminEditorRegion
        region="image"
        activeRegion={activeEditorRegion}
        className="absolute inset-y-0 right-0 w-full lg:w-[62%]"
      >
        <Image
          src={imageUrl}
          alt=""
          fill
          unoptimized={imageUrl.startsWith("blob:")}
          sizes="(max-width: 1023px) 100vw, 62vw"
          className="object-cover"
        />
      </AdminEditorRegion>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-black/90 via-black/72 to-black/52 sm:from-black/85 sm:via-black/65 sm:to-black/30 lg:hidden"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 hidden bg-linear-to-r from-background from-36% via-background via-43% to-transparent to-60% lg:block"
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-background/45 to-transparent"
      />

      <AdminEditorRegion
        region="content"
        activeRegion={activeEditorRegion}
        className="absolute right-6 bottom-8 z-10"
      >
        <div
          aria-hidden="true"
          className="absolute -inset-x-10 -inset-y-3 rounded-full bg-black/65 blur-md"
        />

        <p className="relative rotate-[-4deg] font-handwriting text-xl text-primary drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] sm:text-2xl">
          {handwritten}
        </p>
      </AdminEditorRegion>
    </div>
  );
};
