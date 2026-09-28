"use client";

import { FormProvider } from "react-hook-form";

import { AdminPageEditorHeader } from "@/components/layout/admin/editor/admin-page-editor-header";
import { AdminPageEditorWorkspace } from "@/components/layout/admin/editor/admin-page-editor-workspace";
import { useHomePageEditor } from "@/hooks/home/admin/editor/use-home-page-editor";
import { useHomePageEditorNavigation } from "@/hooks/home/admin/editor/use-home-page-editor-navigation";
import type { HomePageAdminData } from "@/lib/admin/home/queries/get-home-page-admin-data";

import { HomePageEditorPreview } from "./preview/home-page-editor-preview";
import { HomePageEditorSidebar } from "./sidebar/home-page-editor-sidebar";

type HomePageEditorProps = {
  data: HomePageAdminData;
};

export const HomePageEditor = ({ data }: HomePageEditorProps) => {
  const navigation = useHomePageEditorNavigation();

  const {
    form,

    escapeImage,
    ctaImage,

    setEscapeImageFile,
    setCtaImageFile,
    removeEscapeImage,
    removeCtaImage,

    hasCurrentChanges,
    disabled,

    handleSubmit,
    isSaving,
  } = useHomePageEditor(data);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit}
        className="flex min-h-0 flex-1 flex-col overflow-hidden"
      >
        <AdminPageEditorHeader
          title="Page d’accueil"
          publicHref="/"
          hasCurrentChanges={hasCurrentChanges}
          disabled={disabled}
          isSaving={isSaving}
        />

        <AdminPageEditorWorkspace
          activeView={navigation.mobileView}
          onViewChange={navigation.setMobileView}
          errorMessage={form.formState.errors.root?.message}
          preview={
            <HomePageEditorPreview
              data={data}
              navigation={navigation}
              escapeImage={escapeImage}
              ctaImage={ctaImage}
            />
          }
          sidebar={
            <HomePageEditorSidebar
              navigation={navigation}
              escapeImage={escapeImage}
              ctaImage={ctaImage}
              disabled={disabled}
              onEscapeImageSelected={setEscapeImageFile}
              onCtaImageSelected={setCtaImageFile}
              onRemoveEscapeImage={removeEscapeImage}
              onRemoveCtaImage={removeCtaImage}
            />
          }
        />
      </form>
    </FormProvider>
  );
};
