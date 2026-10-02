"use client";

import { AdminEditorSidebar } from "@/components/layout/admin/editor/admin-editor-sidebar";
import type { AccommodationsPageEditorNavigation } from "@/hooks/accommodations-page/admin/editor/use-accommodations-page-editor-navigation";
import { getAccommodationsPageEditorSection } from "@/lib/admin/accommodations-page/editor/editor-sections";
import type { AdminEditorImage } from "@/lib/admin/images/admin-editor-image.types";

import { AccommodationsPageEditorSidebarContent } from "./accommodations-page-editor-sidebar-content";
import { AccommodationsPageEditorSidebarNavigation } from "./accommodations-page-editor-sidebar-navigation";

type AccommodationsPageEditorSidebarProps = {
  navigation: AccommodationsPageEditorNavigation;

  heroImage: AdminEditorImage | null;
  ctaImage: AdminEditorImage | null;
  disabled: boolean;

  onHeroImageSelected: (file: File) => void;
  onCtaImageSelected: (file: File) => void;
  onRemoveHeroImage: () => void;
  onRemoveCtaImage: () => void;
};

export const AccommodationsPageEditorSidebar = ({
  navigation,
  heroImage,
  ctaImage,
  disabled,
  onHeroImageSelected,
  onCtaImageSelected,
  onRemoveHeroImage,
  onRemoveCtaImage,
}: AccommodationsPageEditorSidebarProps) => {
  const currentSection = getAccommodationsPageEditorSection(
    navigation.activeSection,
  );

  return (
    <AdminEditorSidebar
      title={currentSection?.label}
      description={currentSection?.description}
      navigation={
        <AccommodationsPageEditorSidebarNavigation navigation={navigation} />
      }
    >
      <AccommodationsPageEditorSidebarContent
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
