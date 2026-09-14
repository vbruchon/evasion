"use client";

import { useState } from "react";

import type { AccommodationReviewData } from "@/lib/accommodations/reviews/accommodation-review.types";
import type { AccommodationReviewsEditorSection } from "@/lib/admin/accommodation/editor-sections";

import { AccommodationReviewsCarousel } from "./accommodation-reviews-carousel";
import { AccommodationReviewsDialog } from "./accommodation-reviews-dialog";
import { AccommodationReviewsHeader } from "./accommodation-reviews-header";

type AccommodationReviewsProps = {
  reviews: AccommodationReviewData[];
  title: string;
  description: string;
  editorPreview?: boolean;
  activeEditorRegion?: AccommodationReviewsEditorSection;
};

export const AccommodationReviews = ({
  reviews,
  title,
  description,
  activeEditorRegion,
  editorPreview = false,
}: AccommodationReviewsProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((total, review) => total + review.rating, 0) /
        reviews.length
      : null;

  if (reviews.length === 0 && !editorPreview) {
    return null;
  }

  return (
    <>
      <section
        id="avis"
        className="scroll-mt-20 border-b border-border/60 px-6 py-16 md:px-12 lg:px-20 lg:py-20 xl:px-24"
      >
        <div className="mx-auto max-w-420">
          <AccommodationReviewsHeader
            title={title}
            description={description}
            reviewCount={reviews.length}
            averageRating={averageRating}
            editorPreview={editorPreview}
            activeEditorRegion={activeEditorRegion}
            onOpenReviews={() => setDialogOpen(true)}
          />

          <AccommodationReviewsCarousel
            reviews={reviews}
            editorPreview={editorPreview}
            activeEditorRegion={activeEditorRegion}
          />
        </div>
      </section>

      {!editorPreview && averageRating !== null ? (
        <AccommodationReviewsDialog
          title={title}
          reviews={reviews}
          averageRating={averageRating}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      ) : null}
    </>
  );
};
