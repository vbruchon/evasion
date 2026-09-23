"use client";

import { FormProvider } from "react-hook-form";

import { AdminEditorMobileNavigation } from "@/components/layout/admin/editor/admin-editor-mobile-navigation";
import { useAboutPageEditor } from "@/hooks/about/admin/editor/use-about-page-editor";
import { useAboutPageEditorNavigation } from "@/hooks/about/admin/editor/use-about-page-editor-navigation";
import type { AboutPageAdminData } from "@/lib/admin/about/queries/get-about-page-admin-data";
import { cn } from "@/lib/utils";

import { AboutPageEditorHeader } from "./about-page-editor-header";
import { AboutPageEditorPreview } from "./preview/about-page-editor-preview";
import { AboutPageEditorSidebar } from "./sidebar/about-page-editor-sidebar";

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
        <AboutPageEditorHeader
          hasCurrentChanges={hasCurrentChanges}
          disabled={disabled}
          isSaving={isSaving}
        />

        <AdminEditorMobileNavigation
          activeView={navigation.mobileView}
          onViewChange={navigation.setMobileView}
        />

        {form.formState.errors.root ? (
          <div className="shrink-0 border-b border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive sm:px-6">
            {form.formState.errors.root.message}
          </div>
        ) : null}

        <div className="min-h-0 flex-1 overflow-hidden lg:grid lg:grid-cols-[minmax(0,1fr)_420px]">
          <div
            className={cn(
              "h-full min-h-0 overflow-y-auto",
              navigation.mobileView !== "preview" && "hidden lg:block",
            )}
          >
            <AboutPageEditorPreview
              data={data}
              navigation={navigation}
              spiritImage={spiritImage}
              ctaImage={ctaImage}
            />
          </div>

          <div
            className={cn(
              "h-full min-h-0 overflow-hidden",
              navigation.mobileView !== "editor" && "hidden lg:block",
            )}
          >
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
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
