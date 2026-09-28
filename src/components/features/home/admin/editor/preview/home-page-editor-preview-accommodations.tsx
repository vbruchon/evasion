"use client";

import { HomePageAccommodations } from "@/components/features/home/accommodations/home-page-accommodations";
import { AdminEditorSection } from "@/components/layout/admin/editor/admin-editor-section";
import type { AccommodationWithImagesAndHighlights } from "@/lib/accommodations/accommodation-types";
import type { HomePageEditorSection } from "@/lib/admin/home/editor/editor-sections";

type HomePageEditorPreviewAccommodationsProps = {
  eyebrow: string;
  title: string;
  description: string;
  accommodations: AccommodationWithImagesAndHighlights[];
  activeSection: HomePageEditorSection;
  onSectionChange: (section: HomePageEditorSection) => void;
};

export const HomePageEditorPreviewAccommodations = ({
  eyebrow,
  title,
  description,
  accommodations,
  activeSection,
  onSectionChange,
}: HomePageEditorPreviewAccommodationsProps) => (
  <AdminEditorSection
    label="Logements"
    active={activeSection === "accommodations"}
    onSelect={() => onSectionChange("accommodations")}
  >
    {accommodations.length > 0 ? (
      <HomePageAccommodations
        eyebrow={eyebrow}
        title={title}
        description={description}
        accommodations={accommodations}
        activeEditorRegion={
          activeSection === "accommodations" ? "content" : undefined
        }
      />
    ) : (
      <div className="flex min-h-64 items-center justify-center border-y border-border/40 px-6 text-sm text-muted-foreground">
        Aucun logement publié.
      </div>
    )}
  </AdminEditorSection>
);
