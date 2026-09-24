"use client";

import { AdminEditorSidebar } from "@/components/layout/admin/editor/admin-editor-sidebar";
import type { ReviewsPageEditorNavigation } from "@/hooks/reviews/admin/editor/use-reviews-page-editor-navigation";
import type { ReviewsPageAdminData } from "@/lib/admin/reviews/queries/get-reviews-page-admin-data";
import type { AdminEditorImage } from "@/lib/admin/images/admin-editor-image.types";
import { getReviewsPageEditorSection } from "@/lib/admin/reviews/editor/editor-sections";

import { ReviewsPageEditorSidebarContent } from "./reviews-page-editor-sidebar-content";
import { ReviewsPageEditorSidebarNavigation } from "./reviews-page-editor-sidebar-navigation";

type ReviewsPageEditorSidebarProps = {
  navigation: ReviewsPageEditorNavigation;
  data: ReviewsPageAdminData;

  heroImage: AdminEditorImage | null;
  ctaImage: AdminEditorImage | null;
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
    <AdminEditorSidebar
      title={currentSection?.label}
      description={currentSection?.description}
      navigation={
        <ReviewsPageEditorSidebarNavigation navigation={navigation} />
      }
    >
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
    </AdminEditorSidebar>
  );
};
