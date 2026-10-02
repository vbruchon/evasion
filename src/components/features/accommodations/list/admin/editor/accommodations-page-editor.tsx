"use client";

import { FormProvider } from "react-hook-form";

import { AdminPageEditorHeader } from "@/components/layout/admin/editor/admin-page-editor-header";
import { AdminPageEditorWorkspace } from "@/components/layout/admin/editor/admin-page-editor-workspace";
import { useAccommodationsPageEditor } from "@/hooks/accommodations-page/admin/editor/use-accommodations-page-editor";
import { useAccommodationsPageEditorNavigation } from "@/hooks/accommodations-page/admin/editor/use-accommodations-page-editor-navigation";
import type { AccommodationsPageAdminData } from "@/lib/admin/accommodations-page/queries/get-accommodations-page-admin-data";

import { AccommodationsPageEditorPreview } from "./preview/accommodations-page-editor-preview";
import { AccommodationsPageEditorSidebar } from "./sidebar/accommodations-page-editor-sidebar";

type AccommodationsPageEditorProps = {
  data: AccommodationsPageAdminData;
};

export const AccommodationsPageEditor = ({
  data,
}: AccommodationsPageEditorProps) => {
  const navigation = useAccommodationsPageEditorNavigation();

  const {
    form,

    heroImage,
    ctaImage,

    setHeroImageFile,
    setCtaImageFile,
    removeHeroImage,
    removeCtaImage,

    hasCurrentChanges,
    disabled,

    handleSubmit,
    isSaving,
  } = useAccommodationsPageEditor(data);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit}
        className="flex min-h-0 flex-1 flex-col overflow-hidden"
      >
        <AdminPageEditorHeader
          title="Page Nos logements"
          publicHref="/logements"
          hasCurrentChanges={hasCurrentChanges}
          disabled={disabled}
          isSaving={isSaving}
        />

        <AdminPageEditorWorkspace
          activeView={navigation.mobileView}
          onViewChange={navigation.setMobileView}
          errorMessage={form.formState.errors.root?.message}
          preview={
            <AccommodationsPageEditorPreview
              data={data}
              navigation={navigation}
              heroImage={heroImage}
              ctaImage={ctaImage}
            />
          }
          sidebar={
            <AccommodationsPageEditorSidebar
              navigation={navigation}
              heroImage={heroImage}
              ctaImage={ctaImage}
              disabled={disabled}
              onHeroImageSelected={setHeroImageFile}
              onCtaImageSelected={setCtaImageFile}
              onRemoveHeroImage={removeHeroImage}
              onRemoveCtaImage={removeCtaImage}
            />
          }
        />
      </form>
    </FormProvider>
  );
};
