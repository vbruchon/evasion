"use client";

import { HomePageHero } from "@/components/features/home/hero/home-page-hero";
import { AdminEditorSection } from "@/components/layout/admin/editor/admin-editor-section";
import type { HomePageEditorSection } from "@/lib/admin/home/editor/editor-sections";
import { HOME_HERO_FALLBACK_IMAGES } from "@/lib/home/home-page-defaults";

type HomePageEditorPreviewHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  buttonLabel: string;
  images: readonly {
    src: string;
    alt: string;
  }[];
  totalAccommodations: number;
  activeSection: HomePageEditorSection;
  onSectionChange: (section: HomePageEditorSection) => void;
};

export const HomePageEditorPreviewHero = ({
  eyebrow,
  title,
  description,
  buttonLabel,
  images,
  totalAccommodations,
  activeSection,
  onSectionChange,
}: HomePageEditorPreviewHeroProps) => (
  <AdminEditorSection
    label="Hero"
    active={activeSection === "hero"}
    onSelect={() => onSectionChange("hero")}
  >
    <HomePageHero
      eyebrow={eyebrow}
      title={title}
      description={description}
      buttonLabel={buttonLabel}
      images={images.length > 0 ? images : HOME_HERO_FALLBACK_IMAGES}
      totalAccommodations={totalAccommodations}
      activeEditorRegion={activeSection === "hero" ? "content" : undefined}
    />
  </AdminEditorSection>
);
