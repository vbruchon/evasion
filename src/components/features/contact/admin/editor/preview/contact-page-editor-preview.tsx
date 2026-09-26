"use client";

import { ContactPageEditorPreviewForm } from "@/components/features/contact/admin/editor/preview/contact-page-editor-preview-form";
import { ContactPageEditorPreviewSuccess } from "@/components/features/contact/admin/editor/preview/contact-page-editor-preview-success";
import { ContactPageEditorPreviewVisual } from "@/components/features/contact/admin/editor/preview/contact-page-editor-preview-visual";
import type { ContactPageEditorNavigation } from "@/hooks/contact/admin/editor/use-contact-page-editor-navigation";
import type { ContactPageAccommodation } from "@/lib/contact/queries/get-contact-page-accommodations";

type ContactPageEditorPreviewProps = {
  navigation: ContactPageEditorNavigation;
  accommodations: ContactPageAccommodation[];
};

export const ContactPageEditorPreview = ({
  navigation,
  accommodations,
}: ContactPageEditorPreviewProps) => (
  <div className="h-full min-h-full bg-background text-foreground">
    <div className="grid min-h-full lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
      <ContactPageEditorPreviewVisual navigation={navigation} />

      {navigation.activeSection === "success" ? (
        <ContactPageEditorPreviewSuccess navigation={navigation} />
      ) : (
        <ContactPageEditorPreviewForm
          navigation={navigation}
          accommodations={accommodations}
        />
      )}
    </div>
  </div>
);
