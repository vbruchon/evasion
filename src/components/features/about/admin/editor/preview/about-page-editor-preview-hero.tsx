"use client";

import { AboutPageHero } from "@/components/features/about/about-page-hero";
import { AdminEditorSection } from "@/components/layout/admin/editor/admin-editor-section";
import type { AboutPageEditorSection } from "@/lib/admin/about/editor/editor-sections";
import { ABOUT_HERO_FALLBACK_IMAGES } from "@/lib/about/about-page-defaults";
import type { AboutHeroImage } from "@/lib/about/about-page.types";

type AboutPageEditorPreviewHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  buttonLabel: string;
  images: AboutHeroImage[];
  activeSection: AboutPageEditorSection;
  onSectionChange: (section: AboutPageEditorSection) => void;
};

export const AboutPageEditorPreviewHero = ({
  eyebrow,
  title,
  description,
  buttonLabel,
  images,
  activeSection,
  onSectionChange,
}: AboutPageEditorPreviewHeroProps) => (
  <AdminEditorSection
    label="Hero"
    active={activeSection === "hero"}
    onSelect={() => onSectionChange("hero")}
  >
    <AboutPageHero
      eyebrow={eyebrow}
      title={title}
      description={description}
      buttonLabel={buttonLabel}
      images={images.length > 0 ? images : ABOUT_HERO_FALLBACK_IMAGES}
    />
  </AdminEditorSection>
);
