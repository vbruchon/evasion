"use client";

import { FormProvider } from "react-hook-form";

import { AdminEditorMobileNavigation } from "@/components/layout/admin/editor/admin-editor-mobile-navigation";
import { useReviewsPageEditor } from "@/hooks/reviews/admin/editor/use-reviews-page-editor";
import { useReviewsPageEditorNavigation } from "@/hooks/reviews/admin/editor/use-reviews-page-editor-navigation";
import type { ReviewsPageAdminData } from "@/lib/admin/reviews/queries/get-reviews-page-admin-data";
import { cn } from "@/lib/utils";

import { ReviewsPageEditorHeader } from "./reviews-page-editor-header";
import { ReviewsPageEditorPreview } from "./preview/reviews-page-editor-preview";
import { ReviewsPageEditorSidebar } from "./sidebar/reviews-page-editor-sidebar";

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
        <ReviewsPageEditorHeader
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
            <ReviewsPageEditorPreview
              data={data}
              navigation={navigation}
              heroImage={heroImage}
              ctaImage={ctaImage}
            />
          </div>

          <div
            className={cn(
              "h-full min-h-0 overflow-hidden",
              navigation.mobileView !== "editor" && "hidden lg:block",
            )}
          >
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
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
