"use client";

import { useState } from "react";

import type { AdminEditorMobileView } from "@/components/layout/admin/editor/admin-editor-mobile-navigation";
import type {
  AboutPageCtaEditorSection,
  AboutPageEditorSection,
  AboutPagePhilosophyEditorSection,
  AboutPageSpiritEditorSection,
} from "@/lib/admin/about/editor/editor-sections";

export const useAboutPageEditorNavigation = () => {
  const [activeSection, setActiveSection] =
    useState<AboutPageEditorSection>("hero");

  const [activeSpiritSection, setActiveSpiritSection] =
    useState<AboutPageSpiritEditorSection>("content");

  const [activePhilosophySection, setActivePhilosophySection] =
    useState<AboutPagePhilosophyEditorSection>("introduction");

  const [activeCtaSection, setActiveCtaSection] =
    useState<AboutPageCtaEditorSection>("content");

  const [mobileView, setMobileView] =
    useState<AdminEditorMobileView>("preview");

  const handleSectionChange = (section: AboutPageEditorSection) => {
    setActiveSection(section);
    setMobileView("editor");
  };

  const handleSpiritSectionChange = (section: AboutPageSpiritEditorSection) => {
    setActiveSpiritSection(section);
  };

  const handlePhilosophySectionChange = (
    section: AboutPagePhilosophyEditorSection,
  ) => {
    setActivePhilosophySection(section);
  };

  const handleCtaSectionChange = (section: AboutPageCtaEditorSection) => {
    setActiveCtaSection(section);
  };

  return {
    activeSection,
    activeSpiritSection,
    activePhilosophySection,
    activeCtaSection,
    mobileView,

    setMobileView,

    handleSectionChange,
    handleSpiritSectionChange,
    handlePhilosophySectionChange,
    handleCtaSectionChange,
  };
};

export type AboutPageEditorNavigation = ReturnType<
  typeof useAboutPageEditorNavigation
>;
