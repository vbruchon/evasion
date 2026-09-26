"use client";

import { useState } from "react";

import type { AdminEditorMobileView } from "@/components/layout/admin/editor/admin-editor-mobile-navigation";
import type {
  ContactPageEditorSection,
  ContactPageFormEditorRegion,
  ContactPageFormEditorSection,
} from "@/lib/admin/contact/editor/editor-sections";

export const useContactPageEditorNavigation = () => {
  const [activeSection, setActiveSection] =
    useState<ContactPageEditorSection>("visual");

  const [activeFormSection, setActiveFormSection] =
    useState<ContactPageFormEditorSection>("presentation");

  const [mobileView, setMobileView] =
    useState<AdminEditorMobileView>("preview");

  const handleSectionChange = (section: ContactPageEditorSection) => {
    setActiveSection(section);
    setMobileView("editor");
  };

  const handleFormSectionChange = (section: ContactPageFormEditorSection) => {
    setActiveFormSection(section);
    setActiveSection("form");
    setMobileView("editor");
  };

  const handleFormRegionChange = (region: ContactPageFormEditorRegion) => {
    setActiveFormSection(region);
  };

  return {
    activeSection,
    activeFormSection,
    activeFormRegion: activeFormSection,
    mobileView,

    setMobileView,

    handleSectionChange,
    handleFormSectionChange,
    handleFormRegionChange,
  };
};

export type ContactPageEditorNavigation = ReturnType<
  typeof useContactPageEditorNavigation
>;
