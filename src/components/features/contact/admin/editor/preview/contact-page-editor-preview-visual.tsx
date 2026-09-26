"use client";

import { useFormContext, useWatch } from "react-hook-form";

import { ContactPageVisual } from "@/components/features/contact/contact-page-visual";
import { AdminEditorSection } from "@/components/layout/admin/editor/admin-editor-section";
import type { ContactPageEditorNavigation } from "@/hooks/contact/admin/editor/use-contact-page-editor-navigation";
import type { ContactPageContentValues } from "@/lib/contact/contact-page.schema";

type ContactPageEditorPreviewVisualProps = {
  navigation: ContactPageEditorNavigation;
};

export const ContactPageEditorPreviewVisual = ({
  navigation,
}: ContactPageEditorPreviewVisualProps) => {
  const { control } = useFormContext<ContactPageContentValues>();

  const values = useWatch({
    control,
  });

  return (
    <AdminEditorSection
      active={navigation.activeSection === "visual"}
      label="Présentation"
      className="h-full"
      onSelect={() => navigation.handleSectionChange("visual")}
    >
      <ContactPageVisual
        eyebrow={values.eyebrow ?? ""}
        handwritten={values.handwritten ?? ""}
        title={values.title ?? ""}
        description={values.description ?? ""}
        variant="preview"
      />
    </AdminEditorSection>
  );
};
