import type { FaqPageEditorNavigation } from "@/hooks/faq/admin/editor/use-faq-page-editor-navigation";
import type { AdminEditorImage } from "@/lib/admin/images/admin-editor-image.types";

import { FaqPageCtaEditor } from "../section/faq-page-cta-editor";
import { FaqPageHeroEditor } from "../section/faq-page-hero-editor";
import { FaqPageQuestionsEditor } from "../section/faq-page-questions-editor";

type FaqPageEditorSidebarContentProps = {
  navigation: FaqPageEditorNavigation;

  heroImage: AdminEditorImage | null;
  ctaImage: AdminEditorImage | null;
  disabled: boolean;

  onHeroImageSelected: (file: File) => void;
  onCtaImageSelected: (file: File) => void;
  onRemoveHeroImage: () => void;
  onRemoveCtaImage: () => void;
};

export const FaqPageEditorSidebarContent = ({
  navigation,
  heroImage,
  ctaImage,
  disabled,
  onHeroImageSelected,
  onCtaImageSelected,
  onRemoveHeroImage,
  onRemoveCtaImage,
}: FaqPageEditorSidebarContentProps) => {
  switch (navigation.activeSection) {
    case "hero":
      return (
        <FaqPageHeroEditor
          section={navigation.activeHeroSection}
          image={heroImage}
          disabled={disabled}
          onImageSelected={onHeroImageSelected}
          onRemoveImage={onRemoveHeroImage}
        />
      );

    case "questions":
      return (
        <FaqPageQuestionsEditor section={navigation.activeQuestionsSection} />
      );

    case "cta":
      return (
        <FaqPageCtaEditor
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
