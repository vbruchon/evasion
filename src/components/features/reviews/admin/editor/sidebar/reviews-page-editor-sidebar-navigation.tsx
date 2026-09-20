import { AdminEditorSubsectionNav } from "@/components/layout/admin/editor/admin-editor-subsection-nav";
import type { ReviewsPageEditorNavigation } from "@/hooks/reviews/admin/editor/use-reviews-page-editor-navigation";
import {
  reviewsPageCtaEditorSections,
  reviewsPageHeroEditorSections,
  reviewsPageReviewsEditorSections,
} from "@/lib/admin/reviews/editor/editor-sections";

type ReviewsPageEditorSidebarNavigationProps = {
  navigation: ReviewsPageEditorNavigation;
};

export const ReviewsPageEditorSidebarNavigation = ({
  navigation,
}: ReviewsPageEditorSidebarNavigationProps) => {
  switch (navigation.activeSection) {
    case "hero":
      return (
        <AdminEditorSubsectionNav
          sections={reviewsPageHeroEditorSections}
          activeSection={navigation.activeHeroSection}
          columns={2}
          ariaLabel="Sections du hero"
          onSectionChange={navigation.handleHeroSectionChange}
        />
      );

    case "reviews":
      return (
        <AdminEditorSubsectionNav
          sections={reviewsPageReviewsEditorSections}
          activeSection={navigation.activeReviewsSection}
          columns={2}
          ariaLabel="Sections des avis"
          onSectionChange={navigation.handleReviewsSectionChange}
        />
      );

    case "cta":
      return (
        <AdminEditorSubsectionNav
          sections={reviewsPageCtaEditorSections}
          activeSection={navigation.activeCtaSection}
          columns={2}
          ariaLabel="Sections de l’appel à l’action"
          onSectionChange={navigation.handleCtaSectionChange}
        />
      );

    default:
      return null;
  }
};
