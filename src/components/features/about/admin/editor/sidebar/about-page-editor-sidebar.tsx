"use client";

import type { AboutPageEditorNavigation } from "@/hooks/about/admin/editor/use-about-page-editor-navigation";
import type { AdminEditorImage } from "@/lib/admin/images/admin-editor-image.types";
import { getAboutPageEditorSection } from "@/lib/admin/about/editor/editor-sections";
import type { AboutPageAdminData } from "@/lib/admin/about/queries/get-about-page-admin-data";

import { AboutPageEditorSidebarContent } from "./about-page-editor-sidebar-content";
import { AboutPageEditorSidebarNavigation } from "./about-page-editor-sidebar-navigation";

type AboutPageEditorSidebarProps = {
  navigation: AboutPageEditorNavigation;
  data: AboutPageAdminData;

  spiritImage: AdminEditorImage | null;
  ctaImage: AdminEditorImage | null;
  disabled: boolean;

  onSpiritImageSelected: (file: File) => void;
  onCtaImageSelected: (file: File) => void;
  onRemoveSpiritImage: () => void;
  onRemoveCtaImage: () => void;
};

export const AboutPageEditorSidebar = ({
  navigation,
  data,
  spiritImage,
  ctaImage,
  disabled,
  onSpiritImageSelected,
  onCtaImageSelected,
  onRemoveSpiritImage,
  onRemoveCtaImage,
}: AboutPageEditorSidebarProps) => {
  const currentSection = getAboutPageEditorSection(navigation.activeSection);

  return (
    <aside className="flex h-full min-h-0 flex-col bg-background lg:border-l lg:border-border/60">
      <header className="shrink-0 border-b border-border/60 bg-card/20 px-5 py-5 sm:px-6 sm:py-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
          Édition
        </p>

        <h2 className="mt-2 font-heading text-2xl">{currentSection?.label}</h2>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {currentSection?.description}
        </p>
      </header>

      <AboutPageEditorSidebarNavigation navigation={navigation} />

      <div className="min-h-0 flex-1 overflow-y-auto">
        <AboutPageEditorSidebarContent
          navigation={navigation}
          data={data}
          spiritImage={spiritImage}
          ctaImage={ctaImage}
          disabled={disabled}
          onSpiritImageSelected={onSpiritImageSelected}
          onCtaImageSelected={onCtaImageSelected}
          onRemoveSpiritImage={onRemoveSpiritImage}
          onRemoveCtaImage={onRemoveCtaImage}
        />
      </div>
    </aside>
  );
};
