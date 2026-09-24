import type { AboutPageEditorNavigation } from "@/hooks/about/admin/editor/use-about-page-editor-navigation";
import type { AdminEditorImage } from "@/lib/admin/images/admin-editor-image.types";
import type { AboutPageAdminData } from "@/lib/admin/about/queries/get-about-page-admin-data";

import { AboutPageCtaEditor } from "../section/about-page-cta-editor";
import { AboutPageHeroEditor } from "../section/about-page-hero-editor";
import { AboutPagePhilosophyEditor } from "../section/about-page-philosophy-editor";
import { AboutPageSpiritEditor } from "../section/about-page-spirit-editor";
import { AboutPageStatsEditor } from "../section/about-page-stats-editor";

type AboutPageEditorSidebarContentProps = {
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

export const AboutPageEditorSidebarContent = ({
  navigation,
  data,
  spiritImage,
  ctaImage,
  disabled,
  onSpiritImageSelected,
  onCtaImageSelected,
  onRemoveSpiritImage,
  onRemoveCtaImage,
}: AboutPageEditorSidebarContentProps) => {
  switch (navigation.activeSection) {
    case "hero":
      return <AboutPageHeroEditor />;

    case "spirit":
      return (
        <AboutPageSpiritEditor
          section={navigation.activeSpiritSection}
          image={spiritImage}
          disabled={disabled}
          onImageSelected={onSpiritImageSelected}
          onRemoveImage={onRemoveSpiritImage}
        />
      );

    case "philosophy":
      return (
        <AboutPagePhilosophyEditor
          section={navigation.activePhilosophySection}
        />
      );

    case "stats":
      return <AboutPageStatsEditor stats={data.stats} />;

    case "cta":
      return (
        <AboutPageCtaEditor
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
