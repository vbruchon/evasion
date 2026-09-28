"use client";

import { AdminEditorSidebar } from "@/components/layout/admin/editor/admin-editor-sidebar";
import type { HomePageEditorNavigation } from "@/hooks/home/admin/editor/use-home-page-editor-navigation";
import { getHomePageEditorSection } from "@/lib/admin/home/editor/editor-sections";
import type { AdminEditorImage } from "@/lib/admin/images/admin-editor-image.types";

import { HomePageEditorSidebarContent } from "./home-page-editor-sidebar-content";
import { HomePageEditorSidebarNavigation } from "./home-page-editor-sidebar-navigation";

type HomePageEditorSidebarProps = {
  navigation: HomePageEditorNavigation;

  escapeImage: AdminEditorImage | null;
  ctaImage: AdminEditorImage | null;
  disabled: boolean;

  onEscapeImageSelected: (file: File) => void;
  onCtaImageSelected: (file: File) => void;
  onRemoveEscapeImage: () => void;
  onRemoveCtaImage: () => void;
};

export const HomePageEditorSidebar = ({
  navigation,
  escapeImage,
  ctaImage,
  disabled,
  onEscapeImageSelected,
  onCtaImageSelected,
  onRemoveEscapeImage,
  onRemoveCtaImage,
}: HomePageEditorSidebarProps) => {
  const currentSection = getHomePageEditorSection(navigation.activeSection);

  return (
    <AdminEditorSidebar
      title={currentSection?.label}
      description={currentSection?.description}
      navigation={<HomePageEditorSidebarNavigation navigation={navigation} />}
    >
      <HomePageEditorSidebarContent
        navigation={navigation}
        escapeImage={escapeImage}
        ctaImage={ctaImage}
        disabled={disabled}
        onEscapeImageSelected={onEscapeImageSelected}
        onCtaImageSelected={onCtaImageSelected}
        onRemoveEscapeImage={onRemoveEscapeImage}
        onRemoveCtaImage={onRemoveCtaImage}
      />
    </AdminEditorSidebar>
  );
};
