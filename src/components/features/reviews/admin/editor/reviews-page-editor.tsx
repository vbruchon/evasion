"use client";

import { FormProvider } from "react-hook-form";

import { useReviewsPageEditor } from "@/hooks/reviews/admin/editor/use-reviews-page-editor";
import { useReviewsPageEditorNavigation } from "@/hooks/reviews/admin/editor/use-reviews-page-editor-navigation";
import type { ReviewsPageAdminData } from "@/lib/admin/reviews/queries/get-reviews-page-admin-data";

import { ReviewsPageEditorPreview } from "./preview/reviews-page-editor-preview";
import { ReviewsPageEditorSidebar } from "./sidebar/reviews-page-editor-sidebar";
import { AdminPageEditorHeader } from "@/components/layout/admin/editor/admin-page-editor-header";
import { AdminPageEditorWorkspace } from "@/components/layout/admin/editor/admin-page-editor-workspace";

type ReviewsPageEditorProps = {
  data: ReviewsPageAdminData;
};

export const ReviewsPageEditor = ({ data }: ReviewsPageEditorProps) => {
  const navigation = useReviewsPageEditorNavigation();

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
  } = useReviewsPageEditor(data);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit}
        className="flex min-h-0 flex-1 flex-col overflow-hidden"
      >
        <AdminPageEditorHeader
          title="Page Avis"
          publicHref="/avis"
          hasCurrentChanges={hasCurrentChanges}
          disabled={disabled}
          isSaving={isSaving}
        />

        <AdminPageEditorWorkspace
          activeView={navigation.mobileView}
          onViewChange={navigation.setMobileView}
          errorMessage={form.formState.errors.root?.message}
          preview={
            <ReviewsPageEditorPreview
              data={data}
              navigation={navigation}
              heroImage={heroImage}
              ctaImage={ctaImage}
            />
          }
          sidebar={
            <ReviewsPageEditorSidebar
              navigation={navigation}
              data={data}
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
