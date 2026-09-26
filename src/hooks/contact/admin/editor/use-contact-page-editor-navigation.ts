"use client";

import { useState } from "react";

import type { AdminEditorMobileView } from "@/components/layout/admin/editor/admin-editor-mobile-navigation";
import type {
  ContactPageEditorSection,
  ContactPageFormEditorRegion,
  ContactPageSuccessEditorRegion,
} from "@/lib/admin/contact/editor/editor-sections";

export const useContactPageEditorNavigation = () => {
  const [activeSection, setActiveSection] =
    useState<ContactPageEditorSection>("visual");

  const [activeFormRegion, setActiveFormRegion] =
    useState<ContactPageFormEditorRegion>("title");

  const [activeSuccessRegion, setActiveSuccessRegion] =
    useState<ContactPageSuccessEditorRegion>("eyebrow");

  const [mobileView, setMobileView] =
    useState<AdminEditorMobileView>("preview");

  const handleSectionChange = (section: ContactPageEditorSection) => {
    setActiveSection(section);
    setMobileView("editor");
  };

  const handleFormRegionChange = (region: ContactPageFormEditorRegion) => {
    setActiveFormRegion(region);
  };

  const handleSuccessRegionChange = (
    region: ContactPageSuccessEditorRegion,
  ) => {
    setActiveSuccessRegion(region);
  };

  return {
    activeSection,
    activeFormRegion,
    activeSuccessRegion,
    mobileView,

    setMobileView,

    handleSectionChange,
    handleFormRegionChange,
    handleSuccessRegionChange,
  };
};

export type ContactPageEditorNavigation = ReturnType<
  typeof useContactPageEditorNavigation
>;
