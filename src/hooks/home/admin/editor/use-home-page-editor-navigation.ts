"use client";

import { useState } from "react";

import type { AdminEditorMobileView } from "@/components/layout/admin/editor/admin-editor-mobile-navigation";
import type {
  HomePageCtaEditorSection,
  HomePageEditorSection,
  HomePageEscapeEditorSection,
} from "@/lib/admin/home/editor/editor-sections";

export const useHomePageEditorNavigation = () => {
  const [activeSection, setActiveSection] =
    useState<HomePageEditorSection>("hero");

  const [activeEscapeSection, setActiveEscapeSection] =
    useState<HomePageEscapeEditorSection>("content");

  const [activeCtaSection, setActiveCtaSection] =
    useState<HomePageCtaEditorSection>("content");

  const [mobileView, setMobileView] =
    useState<AdminEditorMobileView>("preview");

  const handleSectionChange = (section: HomePageEditorSection) => {
    setActiveSection(section);
    setMobileView("editor");
  };

  const handleEscapeSectionChange = (section: HomePageEscapeEditorSection) => {
    setActiveEscapeSection(section);
  };

  const handleCtaSectionChange = (section: HomePageCtaEditorSection) => {
    setActiveCtaSection(section);
  };

  return {
    activeSection,
    activeEscapeSection,
    activeCtaSection,
    mobileView,

    setMobileView,

    handleSectionChange,
    handleEscapeSectionChange,
    handleCtaSectionChange,
  };
};

export type HomePageEditorNavigation = ReturnType<
  typeof useHomePageEditorNavigation
>;
