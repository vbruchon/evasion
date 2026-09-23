"use client";

import { AboutPageStats } from "@/components/features/about/about-page-stats";
import { AdminEditorSection } from "@/components/layout/admin/editor/admin-editor-section";
import type { AboutPageEditorSection } from "@/lib/admin/about/editor/editor-sections";

type AboutPageEditorPreviewStatsProps = {
  eyebrow: string;
  title: string;
  totalAccommodations: number;
  totalReviews: number;
  averageRating: number;
  activeSection: AboutPageEditorSection;
  onSectionChange: (section: AboutPageEditorSection) => void;
};

export const AboutPageEditorPreviewStats = ({
  eyebrow,
  title,
  totalAccommodations,
  totalReviews,
  averageRating,
  activeSection,
  onSectionChange,
}: AboutPageEditorPreviewStatsProps) => (
  <AdminEditorSection
    label="Quelques chiffres"
    active={activeSection === "stats"}
    onSelect={() => onSectionChange("stats")}
  >
    <AboutPageStats
      eyebrow={eyebrow}
      title={title}
      totalAccommodations={totalAccommodations}
      totalReviews={totalReviews}
      averageRating={averageRating}
    />
  </AdminEditorSection>
);
