"use client";

import type { AboutPageEditorNavigation } from "@/hooks/about/admin/editor/use-about-page-editor-navigation";
import type { AdminEditorImage } from "@/lib/admin/images/admin-editor-image.types";
import { getAboutPageEditorSection } from "@/lib/admin/about/editor/editor-sections";
import type { AboutPageAdminData } from "@/lib/admin/about/queries/get-about-page-admin-data";

import { AboutPageEditorSidebarContent } from "./about-page-editor-sidebar-content";
import { AboutPageEditorSidebarNavigation } from "./about-page-editor-sidebar-navigation";
import { AdminEditorSidebar } from "@/components/layout/admin/editor/admin-editor-sidebar";

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
    <AdminEditorSidebar
      title={currentSection?.label}
      description={currentSection?.description}
      navigation={<AboutPageEditorSidebarNavigation navigation={navigation} />}
    >
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
    </AdminEditorSidebar>
  );
};
