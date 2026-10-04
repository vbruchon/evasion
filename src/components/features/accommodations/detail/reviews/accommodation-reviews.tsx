"use client";

import { motion } from "motion/react";
import { useState } from "react";

import type { AccommodationReviewData } from "@/lib/accommodations/reviews/accommodation-review.types";
import type { AccommodationReviewsEditorSection } from "@/lib/admin/accommodation/editor/editor-sections";

import { AccommodationReviewsCarousel } from "./accommodation-reviews-carousel";
import { AccommodationReviewsDialog } from "./accommodation-reviews-dialog";
import { AccommodationReviewsHeader } from "./accommodation-reviews-header";
import { SiteContainer } from "@/components/layout/site-container";
import { SiteSection } from "@/components/layout/site-section";

type AccommodationReviewsProps = {
  reviews: AccommodationReviewData[];
  title: string;
  description: string;
  editorPreview?: boolean;
  activeEditorRegion?: AccommodationReviewsEditorSection;
  animated?: boolean;
};

export const AccommodationReviews = ({
  reviews,
  title,
  description,
  activeEditorRegion,
  editorPreview = false,
  animated = false,
}: AccommodationReviewsProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((total, review) => total + review.rating, 0) /
        reviews.length
      : null;

  const shouldAnimate = animated && !editorPreview;

  if (reviews.length === 0 && !editorPreview) {
    return null;
  }

  return (
    <>
      <SiteSection id="avis" gutters spacing="default">
        <SiteContainer>
          <motion.div
            initial={shouldAnimate ? { opacity: 0, y: 14 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
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
              animated={shouldAnimate}
            />
          </motion.div>
        </SiteContainer>
      </SiteSection>

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
