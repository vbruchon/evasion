"use client";

import { FormProvider } from "react-hook-form";

import { AdminPageEditorHeader } from "@/components/layout/admin/editor/admin-page-editor-header";
import { AdminPageEditorWorkspace } from "@/components/layout/admin/editor/admin-page-editor-workspace";
import { useFaqPageEditor } from "@/hooks/faq/admin/editor/use-faq-page-editor";
import { useFaqPageEditorNavigation } from "@/hooks/faq/admin/editor/use-faq-page-editor-navigation";
import type { FaqPageAdminData } from "@/lib/admin/faq/queries/get-faq-page-admin-data";

import { FaqPageEditorPreview } from "./preview/faq-page-editor-preview";
import { FaqPageEditorSidebar } from "./sidebar/faq-page-editor-sidebar";

type FaqPageEditorProps = {
  data: FaqPageAdminData;
};

export const FaqPageEditor = ({ data }: FaqPageEditorProps) => {
  const navigation = useFaqPageEditorNavigation();

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
  } = useFaqPageEditor(data);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit}
        className="flex min-h-0 flex-1 flex-col overflow-hidden"
      >
        <AdminPageEditorHeader
          title="Page FAQ"
          publicHref="/faq"
          hasCurrentChanges={hasCurrentChanges}
          disabled={disabled}
          isSaving={isSaving}
        />

        <AdminPageEditorWorkspace
          activeView={navigation.mobileView}
          onViewChange={navigation.setMobileView}
          errorMessage={form.formState.errors.root?.message}
          preview={
            <FaqPageEditorPreview
              navigation={navigation}
              heroImage={heroImage}
              ctaImage={ctaImage}
            />
          }
          sidebar={
            <FaqPageEditorSidebar
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
