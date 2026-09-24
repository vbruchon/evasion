"use client";

import { FormProvider } from "react-hook-form";

import { useAboutPageEditor } from "@/hooks/about/admin/editor/use-about-page-editor";
import { useAboutPageEditorNavigation } from "@/hooks/about/admin/editor/use-about-page-editor-navigation";
import type { AboutPageAdminData } from "@/lib/admin/about/queries/get-about-page-admin-data";

import { AdminPageEditorHeader } from "@/components/layout/admin/editor/admin-page-editor-header";
import { AboutPageEditorPreview } from "./preview/about-page-editor-preview";
import { AboutPageEditorSidebar } from "./sidebar/about-page-editor-sidebar";
import { AdminPageEditorWorkspace } from "@/components/layout/admin/editor/admin-page-editor-workspace";

type AboutPageEditorProps = {
  data: AboutPageAdminData;
};

export const AboutPageEditor = ({ data }: AboutPageEditorProps) => {
  const navigation = useAboutPageEditorNavigation();

  const {
    form,

    spiritImage,
    ctaImage,

    setSpiritImageFile,
    setCtaImageFile,
    removeSpiritImage,
    removeCtaImage,

    hasCurrentChanges,
    disabled,

    handleSubmit,
    isSaving,
  } = useAboutPageEditor(data);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit}
        className="flex min-h-0 flex-1 flex-col overflow-hidden"
      >
        <AdminPageEditorHeader
          title="Page À propos"
          publicHref="/a-propos"
          hasCurrentChanges={hasCurrentChanges}
          disabled={disabled}
          isSaving={isSaving}
        />

        <AdminPageEditorWorkspace
          activeView={navigation.mobileView}
          onViewChange={navigation.setMobileView}
          errorMessage={form.formState.errors.root?.message}
          preview={
            <AboutPageEditorPreview
              data={data}
              navigation={navigation}
              spiritImage={spiritImage}
              ctaImage={ctaImage}
            />
          }
          sidebar={
            <AboutPageEditorSidebar
              navigation={navigation}
              data={data}
              spiritImage={spiritImage}
              ctaImage={ctaImage}
              disabled={disabled}
              onSpiritImageSelected={setSpiritImageFile}
              onCtaImageSelected={setCtaImageFile}
              onRemoveSpiritImage={removeSpiritImage}
              onRemoveCtaImage={removeCtaImage}
            />
          }
        />
      </form>
    </FormProvider>
  );
};
