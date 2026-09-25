"use client";

import { FaqPageQuestions } from "@/components/features/faq/faq-page-questions";
import { AdminEditorSection } from "@/components/layout/admin/editor/admin-editor-section";
import { useAdminEditorRegionClick } from "@/hooks/admin/editor/use-admin-editor-region-click";
import {
  isFaqPageQuestionsEditorSection,
  type FaqPageEditorSection,
  type FaqPageQuestionsEditorSection,
} from "@/lib/admin/faq/editor/editor-sections";
import type { FaqPageContentValues } from "@/lib/faq/faq-page.schema";

type FaqPageEditorPreviewQuestionsProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: FaqPageContentValues["items"];

  activeSection: FaqPageEditorSection;
  activeQuestionsSection: FaqPageQuestionsEditorSection;

  onSectionChange: (section: FaqPageEditorSection) => void;
  onQuestionsSectionChange: (section: FaqPageQuestionsEditorSection) => void;
};

export const FaqPageEditorPreviewQuestions = ({
  eyebrow,
  title,
  description,
  items,
  activeSection,
  activeQuestionsSection,
  onSectionChange,
  onQuestionsSectionChange,
}: FaqPageEditorPreviewQuestionsProps) => {
  const handleClick = useAdminEditorRegionClick({
    section: "questions",
    isRegion: isFaqPageQuestionsEditorSection,
    onSectionChange,
    onRegionChange: onQuestionsSectionChange,
  });

  return (
    <AdminEditorSection
      label="Questions"
      active={activeSection === "questions"}
      interactiveChildren
      onSelect={() => onSectionChange("questions")}
    >
      <div onClick={handleClick}>
        <FaqPageQuestions
          eyebrow={eyebrow}
          title={title}
          description={description}
          items={items}
          activeEditorRegion={
            activeSection === "questions" ? activeQuestionsSection : undefined
          }
          editorPreview
        />
      </div>
    </AdminEditorSection>
  );
};
