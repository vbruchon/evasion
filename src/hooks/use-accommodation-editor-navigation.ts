"use client";

import { useState } from "react";

import type {
  AccommodationAvailabilityEditorSection,
  AccommodationEditorSection,
  AccommodationHeroEditorSection,
  AccommodationLocationEditorSection,
  AccommodationPresentationEditorSection,
  AccommodationReviewsEditorSection,
} from "@/lib/admin/accommodation/editor-sections";

export type AccommodationEditorMobileView = "preview" | "editor";

export const useAccommodationEditorNavigation = () => {
  const [activeSection, setActiveSection] =
    useState<AccommodationEditorSection>("hero");

  const [activeHeroSection, setActiveHeroSection] =
    useState<AccommodationHeroEditorSection>("general");

  const [activePresentationSection, setActivePresentationSection] =
    useState<AccommodationPresentationEditorSection>("content");

  const [activeLocationSection, setActiveLocationSection] =
    useState<AccommodationLocationEditorSection>("content");

  const [activeAvailabilitySection, setActiveAvailabilitySection] =
    useState<AccommodationAvailabilityEditorSection>("content");

  const [activeReviewsSection, setActiveReviewsSection] =
    useState<AccommodationReviewsEditorSection>("content");

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

  const handleLocationSectionChange = (
    section: AccommodationLocationEditorSection,
  ) => {
    setActiveLocationSection(section);
  };

  const handleAvailabilitySectionChange = (
    section: AccommodationAvailabilityEditorSection,
  ) => {
    setActiveAvailabilitySection(section);
  };

  const handleReviewsSectionChange = (
    section: AccommodationReviewsEditorSection,
  ) => {
    setActiveReviewsSection(section);
  };

  return {
    activeSection,
    activeHeroSection,
    activePresentationSection,
    activeLocationSection,
    activeAvailabilitySection,
    activeReviewsSection,
    mobileView,

    setMobileView,

    handleSectionChange,
    handleHeroSectionChange,
    handlePresentationSectionChange,
    handleLocationSectionChange,
    handleAvailabilitySectionChange,
    handleReviewsSectionChange,
  };
};
