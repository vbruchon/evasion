"use client";

import { AdminEditorSidebar } from "@/components/layout/admin/editor/admin-editor-sidebar";
import type { FaqPageEditorNavigation } from "@/hooks/faq/admin/editor/use-faq-page-editor-navigation";
import { getFaqPageEditorSection } from "@/lib/admin/faq/editor/editor-sections";
import type { AdminEditorImage } from "@/lib/admin/images/admin-editor-image.types";

import { FaqPageEditorSidebarContent } from "./faq-page-editor-sidebar-content";
import { FaqPageEditorSidebarNavigation } from "./faq-page-editor-sidebar-navigation";

type FaqPageEditorSidebarProps = {
  navigation: FaqPageEditorNavigation;

  heroImage: AdminEditorImage | null;
  ctaImage: AdminEditorImage | null;
  disabled: boolean;

  onHeroImageSelected: (file: File) => void;
  onCtaImageSelected: (file: File) => void;
  onRemoveHeroImage: () => void;
  onRemoveCtaImage: () => void;
};

export const FaqPageEditorSidebar = ({
  navigation,
  heroImage,
  ctaImage,
  disabled,
  onHeroImageSelected,
  onCtaImageSelected,
  onRemoveHeroImage,
  onRemoveCtaImage,
}: FaqPageEditorSidebarProps) => {
  const currentSection = getFaqPageEditorSection(navigation.activeSection);

  return (
    <AdminEditorSidebar
      title={currentSection?.label}
      description={currentSection?.description}
      navigation={<FaqPageEditorSidebarNavigation navigation={navigation} />}
    >
      <FaqPageEditorSidebarContent
        navigation={navigation}
        heroImage={heroImage}
        ctaImage={ctaImage}
        disabled={disabled}
        onHeroImageSelected={onHeroImageSelected}
        onCtaImageSelected={onCtaImageSelected}
        onRemoveHeroImage={onRemoveHeroImage}
        onRemoveCtaImage={onRemoveCtaImage}
      />
    </AdminEditorSidebar>
  );
};
