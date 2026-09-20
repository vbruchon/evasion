"use client";

import { useState } from "react";

import type { AdminEditorMobileView } from "@/components/layout/admin/editor/admin-editor-mobile-navigation";
import type {
  ReviewsPageCtaEditorSection,
  ReviewsPageEditorSection,
  ReviewsPageHeroEditorSection,
  ReviewsPageReviewsEditorSection,
} from "@/lib/admin/reviews/editor/editor-sections";

export const useReviewsPageEditorNavigation = () => {
  const [activeSection, setActiveSection] =
    useState<ReviewsPageEditorSection>("hero");

  const [activeHeroSection, setActiveHeroSection] =
    useState<ReviewsPageHeroEditorSection>("content");

  const [activeReviewsSection, setActiveReviewsSection] =
    useState<ReviewsPageReviewsEditorSection>("recent");

  const [activeCtaSection, setActiveCtaSection] =
    useState<ReviewsPageCtaEditorSection>("content");

  const [mobileView, setMobileView] =
    useState<AdminEditorMobileView>("preview");

  const handleSectionChange = (section: ReviewsPageEditorSection) => {
    setActiveSection(section);
    setMobileView("editor");
  };

  const handleHeroSectionChange = (section: ReviewsPageHeroEditorSection) => {
    setActiveHeroSection(section);
  };

  const handleReviewsSectionChange = (
    section: ReviewsPageReviewsEditorSection,
  ) => {
    setActiveReviewsSection(section);
  };

  const handleCtaSectionChange = (section: ReviewsPageCtaEditorSection) => {
    setActiveCtaSection(section);
  };

  return {
    activeSection,
    activeHeroSection,
    activeReviewsSection,
    activeCtaSection,
    mobileView,

    setMobileView,

    handleSectionChange,
    handleHeroSectionChange,
    handleReviewsSectionChange,
    handleCtaSectionChange,
  };
};

export type ReviewsPageEditorNavigation = ReturnType<
  typeof useReviewsPageEditorNavigation
>;
