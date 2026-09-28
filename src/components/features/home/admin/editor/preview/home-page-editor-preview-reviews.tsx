"use client";

import { HomePageReviews } from "@/components/features/home/reviews/home-page-reviews";
import { AdminEditorSection } from "@/components/layout/admin/editor/admin-editor-section";
import type { HomePageEditorSection } from "@/lib/admin/home/editor/editor-sections";
import type { ReviewWithAccommodation } from "@/lib/reviews/review.types";

type HomePageEditorPreviewReviewsProps = {
  eyebrow: string;
  averageRating: number;
  totalReviews: number;
  reviews: ReviewWithAccommodation[];
  activeSection: HomePageEditorSection;
  onSectionChange: (section: HomePageEditorSection) => void;
};

export const HomePageEditorPreviewReviews = ({
  eyebrow,
  averageRating,
  totalReviews,
  reviews,
  activeSection,
  onSectionChange,
}: HomePageEditorPreviewReviewsProps) => (
  <AdminEditorSection
    label="Avis"
    active={activeSection === "reviews"}
    onSelect={() => onSectionChange("reviews")}
  >
    {totalReviews > 0 && reviews.length > 0 ? (
      <HomePageReviews
        eyebrow={eyebrow}
        averageRating={averageRating}
        totalReviews={totalReviews}
        reviews={reviews}
        activeEditorRegion={activeSection === "reviews" ? "content" : undefined}
      />
    ) : (
      <div className="flex min-h-64 items-center justify-center border-y border-border/40 px-6 text-sm text-muted-foreground">
        Aucun avis disponible.
      </div>
    )}
  </AdminEditorSection>
);
