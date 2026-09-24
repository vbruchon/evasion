"use client";

import { AboutPagePhilosophy } from "@/components/features/about/about-page-philosophy";
import { AdminEditorSection } from "@/components/layout/admin/editor/admin-editor-section";
import { useAdminEditorRegionClick } from "@/hooks/admin/editor/use-admin-editor-region-click";
import type {
  AboutPageEditorSection,
  AboutPagePhilosophyEditorSection,
} from "@/lib/admin/about/editor/editor-sections";
import { isAboutPagePhilosophyEditorSection } from "@/lib/admin/about/editor/editor-sections";

type AboutPageEditorPreviewPhilosophyProps = {
  eyebrow: string;
  title: string;
  description: string;

  firstTitle: string;
  firstDescription: string;

  secondTitle: string;
  secondDescription: string;

  thirdTitle: string;
  thirdDescription: string;

  fourthTitle: string;
  fourthDescription: string;

  activeSection: AboutPageEditorSection;
  activePhilosophySection: AboutPagePhilosophyEditorSection;

  onSectionChange: (section: AboutPageEditorSection) => void;
  onPhilosophySectionChange: (
    section: AboutPagePhilosophyEditorSection,
  ) => void;
};

export const AboutPageEditorPreviewPhilosophy = ({
  eyebrow,
  title,
  description,
  firstTitle,
  firstDescription,
  secondTitle,
  secondDescription,
  thirdTitle,
  thirdDescription,
  fourthTitle,
  fourthDescription,
  activeSection,
  activePhilosophySection,
  onSectionChange,
  onPhilosophySectionChange,
}: AboutPageEditorPreviewPhilosophyProps) => {
  const handleClick = useAdminEditorRegionClick({
    section: "philosophy",
    isRegion: isAboutPagePhilosophyEditorSection,
    onSectionChange,
    onRegionChange: onPhilosophySectionChange,
  });

  return (
    <AdminEditorSection
      label="Notre philosophie"
      active={activeSection === "philosophy"}
      interactiveChildren
      onSelect={() => onSectionChange("philosophy")}
    >
      <div onClick={handleClick}>
        <AboutPagePhilosophy
          eyebrow={eyebrow}
          title={title}
          description={description}
          firstTitle={firstTitle}
          firstDescription={firstDescription}
          secondTitle={secondTitle}
          secondDescription={secondDescription}
          thirdTitle={thirdTitle}
          thirdDescription={thirdDescription}
          fourthTitle={fourthTitle}
          fourthDescription={fourthDescription}
          activeEditorRegion={
            activeSection === "philosophy" ? activePhilosophySection : undefined
          }
        />
      </div>
    </AdminEditorSection>
  );
};
