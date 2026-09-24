import type { ReviewsPageEditorNavigation } from "@/hooks/reviews/admin/editor/use-reviews-page-editor-navigation";
import type { AdminEditorImage } from "@/lib/admin/images/admin-editor-image.types";
import type { ReviewsPageAdminData } from "@/lib/admin/reviews/queries/get-reviews-page-admin-data";
import { ReviewsPageCtaEditor } from "../section/reviews-page-cta-editor";
import { ReviewsPageHeroEditor } from "../section/reviews-page-hero-editor";
import { ReviewsPageReviewsEditor } from "../section/reviews-page-reviews-editor";

type ReviewsPageEditorSidebarContentProps = {
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

export const ReviewsPageEditorSidebarContent = ({
  navigation,
  data,
  heroImage,
  ctaImage,
  disabled,
  onHeroImageSelected,
  onCtaImageSelected,
  onRemoveHeroImage,
  onRemoveCtaImage,
}: ReviewsPageEditorSidebarContentProps) => {
  switch (navigation.activeSection) {
    case "hero":
      return (
        <ReviewsPageHeroEditor
          section={navigation.activeHeroSection}
          image={heroImage}
          disabled={disabled}
          onImageSelected={onHeroImageSelected}
          onRemoveImage={onRemoveHeroImage}
        />
      );

    case "reviews":
      return (
        <ReviewsPageReviewsEditor
          section={navigation.activeReviewsSection}
          summary={data.summary}
          lastReviewsImportAt={data.lastReviewsImportAt}
        />
      );

    case "cta":
      return (
        <ReviewsPageCtaEditor
          section={navigation.activeCtaSection}
          image={ctaImage}
          disabled={disabled}
          onImageSelected={onCtaImageSelected}
          onRemoveImage={onRemoveCtaImage}
        />
      );

    default:
      return null;
  }
};
