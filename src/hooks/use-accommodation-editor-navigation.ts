"use client";

import { useState } from "react";

import type {
  AccommodationEditorSection,
  AccommodationHeroEditorSection,
  AccommodationPresentationEditorSection,
} from "@/lib/admin/accommodation/editor-sections";

export type AccommodationEditorMobileView = "preview" | "editor";

export const useAccommodationEditorNavigation = () => {
  const [activeSection, setActiveSection] =
    useState<AccommodationEditorSection>("hero");

  const [activeHeroSection, setActiveHeroSection] =
    useState<AccommodationHeroEditorSection>("general");

  const [activePresentationSection, setActivePresentationSection] =
    useState<AccommodationPresentationEditorSection>("content");

  const [mobileView, setMobileView] =
    useState<AccommodationEditorMobileView>("preview");

  const handleSectionChange = (section: AccommodationEditorSection) => {
    setActiveSection(section);
    setMobileView("editor");
  };

  const handleHeroSectionChange = (section: AccommodationHeroEditorSection) => {
    setActiveHeroSection(section);
  };

  const handlePresentationSectionChange = (
    section: AccommodationPresentationEditorSection,
  ) => {
    setActivePresentationSection(section);
  };

  return {
    activeSection,
    activeHeroSection,
    activePresentationSection,
    mobileView,

    setMobileView,

    handleSectionChange,
    handleHeroSectionChange,
    handlePresentationSectionChange,
  };
};
