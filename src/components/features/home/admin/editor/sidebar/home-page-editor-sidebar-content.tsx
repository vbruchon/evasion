import type { HomePageEditorNavigation } from "@/hooks/home/admin/editor/use-home-page-editor-navigation";
import type { AdminEditorImage } from "@/lib/admin/images/admin-editor-image.types";

import { HomePageAccommodationsEditor } from "../section/home-page-accommodations-editor";
import { HomePageCtaEditor } from "../section/home-page-cta-editor";
import { HomePageEscapeEditor } from "../section/home-page-escape-editor";
import { HomePageHeroEditor } from "../section/home-page-hero-editor";
import { HomePageReviewsEditor } from "../section/home-page-reviews-editor";

type HomePageEditorSidebarContentProps = {
  navigation: HomePageEditorNavigation;

  escapeImage: AdminEditorImage | null;
  ctaImage: AdminEditorImage | null;
  disabled: boolean;

  onEscapeImageSelected: (file: File) => void;
  onCtaImageSelected: (file: File) => void;
  onRemoveEscapeImage: () => void;
  onRemoveCtaImage: () => void;
};

export const HomePageEditorSidebarContent = ({
  navigation,
  escapeImage,
  ctaImage,
  disabled,
  onEscapeImageSelected,
  onCtaImageSelected,
  onRemoveEscapeImage,
  onRemoveCtaImage,
}: HomePageEditorSidebarContentProps) => {
  switch (navigation.activeSection) {
    case "hero":
      return <HomePageHeroEditor />;

    case "accommodations":
      return <HomePageAccommodationsEditor />;

    case "escape":
      return (
        <HomePageEscapeEditor
          section={navigation.activeEscapeSection}
          image={escapeImage}
          disabled={disabled}
          onImageSelected={onEscapeImageSelected}
          onRemoveImage={onRemoveEscapeImage}
        />
      );

    case "reviews":
      return <HomePageReviewsEditor />;

    case "cta":
      return (
        <HomePageCtaEditor
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
