"use client";

import type { ReviewsPageEditorNavigation } from "@/hooks/reviews/admin/editor/use-reviews-page-editor-navigation";
import type { ReviewsPageEditorImage } from "@/hooks/reviews/admin/editor/use-reviews-page-images";
import { getReviewsPageEditorSection } from "@/lib/admin/reviews/editor/editor-sections";
import type { ReviewsPageAdminData } from "@/lib/admin/reviews/queries/get-reviews-page-admin-data";

import { ReviewsPageEditorSidebarNavigation } from "./reviews-page-editor-sidebar-navigation";
import { ReviewsPageEditorSidebarContent } from "./reviews-page-editor-sidebar-content";

type ReviewsPageEditorSidebarProps = {
  navigation: ReviewsPageEditorNavigation;
  data: ReviewsPageAdminData;

  heroImage: ReviewsPageEditorImage | null;
  ctaImage: ReviewsPageEditorImage | null;
  disabled: boolean;

  onHeroImageSelected: (file: File) => void;
  onCtaImageSelected: (file: File) => void;
  onRemoveHeroImage: () => void;
  onRemoveCtaImage: () => void;
};

export const ReviewsPageEditorSidebar = ({
  navigation,
  data,
  heroImage,
  ctaImage,
  disabled,
  onHeroImageSelected,
  onCtaImageSelected,
  onRemoveHeroImage,
  onRemoveCtaImage,
}: ReviewsPageEditorSidebarProps) => {
  const currentSection = getReviewsPageEditorSection(navigation.activeSection);

  return (
    <aside className="flex h-full min-h-0 flex-col bg-background lg:border-l lg:border-border/60">
      <header className="shrink-0 border-b border-border/60 bg-card/20 px-5 py-5 sm:px-6 sm:py-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary">
          Édition
        </p>

        <h2 className="mt-2 font-heading text-2xl">{currentSection?.label}</h2>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {currentSection?.description}
        </p>
      </header>

      <ReviewsPageEditorSidebarNavigation navigation={navigation} />

      <div className="min-h-0 flex-1 overflow-y-auto">
        <ReviewsPageEditorSidebarContent
          navigation={navigation}
          data={data}
          heroImage={heroImage}
          ctaImage={ctaImage}
          disabled={disabled}
          onHeroImageSelected={onHeroImageSelected}
          onCtaImageSelected={onCtaImageSelected}
          onRemoveHeroImage={onRemoveHeroImage}
          onRemoveCtaImage={onRemoveCtaImage}
        />
      </div>
    </aside>
  );
};
