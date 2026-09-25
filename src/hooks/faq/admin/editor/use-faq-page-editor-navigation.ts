"use client";

import { useState } from "react";

import type { AdminEditorMobileView } from "@/components/layout/admin/editor/admin-editor-mobile-navigation";
import type {
  FaqPageCtaEditorSection,
  FaqPageEditorSection,
  FaqPageHeroEditorSection,
  FaqPageQuestionsEditorSection,
} from "@/lib/admin/faq/editor/editor-sections";

export const useFaqPageEditorNavigation = () => {
  const [activeSection, setActiveSection] =
    useState<FaqPageEditorSection>("hero");

  const [activeHeroSection, setActiveHeroSection] =
    useState<FaqPageHeroEditorSection>("content");

  const [activeQuestionsSection, setActiveQuestionsSection] =
    useState<FaqPageQuestionsEditorSection>("content");

  const [activeCtaSection, setActiveCtaSection] =
    useState<FaqPageCtaEditorSection>("content");

  const [mobileView, setMobileView] =
    useState<AdminEditorMobileView>("preview");

  const handleSectionChange = (section: FaqPageEditorSection) => {
    setActiveSection(section);
    setMobileView("editor");
  };

  const handleHeroSectionChange = (section: FaqPageHeroEditorSection) => {
    setActiveHeroSection(section);
  };

  const handleQuestionsSectionChange = (
    section: FaqPageQuestionsEditorSection,
  ) => {
    setActiveQuestionsSection(section);
  };

  const handleCtaSectionChange = (section: FaqPageCtaEditorSection) => {
    setActiveCtaSection(section);
  };

  return {
    activeSection,
    activeHeroSection,
    activeQuestionsSection,
    activeCtaSection,
    mobileView,

    setMobileView,

    handleSectionChange,
    handleHeroSectionChange,
    handleQuestionsSectionChange,
    handleCtaSectionChange,
  };
};

export type FaqPageEditorNavigation = ReturnType<
  typeof useFaqPageEditorNavigation
>;
