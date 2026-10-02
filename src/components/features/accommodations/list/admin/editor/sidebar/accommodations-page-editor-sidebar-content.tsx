import type { AccommodationsPageEditorNavigation } from "@/hooks/accommodations-page/admin/editor/use-accommodations-page-editor-navigation";
import type { AdminEditorImage } from "@/lib/admin/images/admin-editor-image.types";

import { AccommodationsPageCtaEditor } from "../section/accommodations-page-cta-editor";
import { AccommodationsPageHeroEditor } from "../section/accommodations-page-hero-editor";

type AccommodationsPageEditorSidebarContentProps = {
  navigation: AccommodationsPageEditorNavigation;

  heroImage: AdminEditorImage | null;
  ctaImage: AdminEditorImage | null;
  disabled: boolean;

  onHeroImageSelected: (file: File) => void;
  onCtaImageSelected: (file: File) => void;
  onRemoveHeroImage: () => void;
  onRemoveCtaImage: () => void;
};

export const AccommodationsPageEditorSidebarContent = ({
  navigation,
  heroImage,
  ctaImage,
  disabled,
  onHeroImageSelected,
  onCtaImageSelected,
  onRemoveHeroImage,
  onRemoveCtaImage,
}: AccommodationsPageEditorSidebarContentProps) => {
  switch (navigation.activeSection) {
    case "hero":
      return (
        <AccommodationsPageHeroEditor
          section={navigation.activeHeroSection}
          image={heroImage}
          disabled={disabled}
          onImageSelected={onHeroImageSelected}
          onRemoveImage={onRemoveHeroImage}
        />
      );

    case "cta":
      return (
        <AccommodationsPageCtaEditor
          section={navigation.activeCtaSection}
          image={ctaImage}
          disabled={disabled}
          onImageSelected={onCtaImageSelected}
          onRemoveImage={onRemoveCtaImage}
        />
      );

    default:
      return null;
  }
};
