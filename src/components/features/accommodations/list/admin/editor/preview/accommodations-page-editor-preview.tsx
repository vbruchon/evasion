"use client";

import { useFormContext, useWatch } from "react-hook-form";

import { AccommodationsSection } from "@/components/features/accommodations/list/accommodations-section";
import type { AccommodationsPageEditorNavigation } from "@/hooks/accommodations-page/admin/editor/use-accommodations-page-editor-navigation";
import type { AccommodationsPageContentValues } from "@/lib/accommodations-page/accommodations-page.schema";
import type { AccommodationsPageAdminData } from "@/lib/admin/accommodations-page/queries/get-accommodations-page-admin-data";
import type { AdminEditorImage } from "@/lib/admin/images/admin-editor-image.types";

import { AccommodationsPageEditorPreviewCta } from "./accommodations-page-editor-preview-cta";
import { AccommodationsPageEditorPreviewHero } from "./accommodations-page-editor-preview-hero";

type AccommodationsPageEditorPreviewProps = {
  data: AccommodationsPageAdminData;
  navigation: AccommodationsPageEditorNavigation;
  heroImage: AdminEditorImage | null;
  ctaImage: AdminEditorImage | null;
};

export const AccommodationsPageEditorPreview = ({
  data,
  navigation,
  heroImage,
  ctaImage,
}: AccommodationsPageEditorPreviewProps) => {
  const { control } = useFormContext<AccommodationsPageContentValues>();

  const values = useWatch({
    control,
  });

  return (
    <div className="min-h-full bg-background text-foreground">
      <AccommodationsPageEditorPreviewHero
        eyebrow={values.heroEyebrow ?? ""}
        title={values.heroTitle ?? ""}
        description={values.heroDescription ?? ""}
        imageUrl={heroImage?.previewUrl ?? null}
        activeSection={navigation.activeSection}
        activeHeroSection={navigation.activeHeroSection}
        onSectionChange={navigation.handleSectionChange}
        onHeroSectionChange={navigation.handleHeroSectionChange}
      />

      <div className="[&_a]:pointer-events-none">
        <AccommodationsSection accommodations={data.accommodations} />
      </div>

      <AccommodationsPageEditorPreviewCta
        eyebrow={values.ctaEyebrow ?? ""}
        title={values.ctaTitle ?? ""}
        buttonLabel={values.ctaButtonLabel ?? ""}
        imageUrl={ctaImage?.previewUrl ?? null}
        activeSection={navigation.activeSection}
        activeCtaSection={navigation.activeCtaSection}
        onSectionChange={navigation.handleSectionChange}
        onCtaSectionChange={navigation.handleCtaSectionChange}
      />
    </div>
  );
};
