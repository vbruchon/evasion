"use client";

import { useState } from "react";

import type { AdminEditorMobileView } from "@/components/layout/admin/editor/admin-editor-mobile-navigation";
import type {
  AccommodationsPageEditorRegion,
  AccommodationsPageEditorSection,
} from "@/lib/admin/accommodations-page/editor/editor-sections";

export const useAccommodationsPageEditorNavigation = () => {
  const [activeSection, setActiveSection] =
    useState<AccommodationsPageEditorSection>("hero");

  const [activeHeroSection, setActiveHeroSection] =
    useState<AccommodationsPageEditorRegion>("content");

  const [activeCtaSection, setActiveCtaSection] =
    useState<AccommodationsPageEditorRegion>("content");

  const [mobileView, setMobileView] =
    useState<AdminEditorMobileView>("preview");

  const handleSectionChange = (section: AccommodationsPageEditorSection) => {
    setActiveSection(section);
    setMobileView("editor");
  };

  const handleHeroSectionChange = (section: AccommodationsPageEditorRegion) => {
    setActiveHeroSection(section);
  };

  const handleCtaSectionChange = (section: AccommodationsPageEditorRegion) => {
    setActiveCtaSection(section);
  };

  return {
    activeSection,
    activeHeroSection,
    activeCtaSection,
    mobileView,

    setMobileView,

    handleSectionChange,
    handleHeroSectionChange,
    handleCtaSectionChange,
  };
};

export type AccommodationsPageEditorNavigation = ReturnType<
  typeof useAccommodationsPageEditorNavigation
>;
