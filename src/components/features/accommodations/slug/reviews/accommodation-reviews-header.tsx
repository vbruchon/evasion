import { Star } from "lucide-react";

import { AccommodationEditorRegion } from "@/components/features/accommodations/admin/editor/accommodation-editor-region";
import { Button } from "@/components/ui/button";
import type { AccommodationReviewsEditorSection } from "@/lib/admin/accommodation/editor-sections";

type AccommodationReviewsHeaderProps = {
  title: string;
  description: string;
  reviewCount: number;
  averageRating: number | null;
  editorPreview: boolean;
  activeEditorRegion?: AccommodationReviewsEditorSection;
  onOpenReviews: () => void;
};

export const AccommodationReviewsHeader = ({
  title,
  description,
  reviewCount,
  averageRating,
  editorPreview,
  activeEditorRegion,
  onOpenReviews,
}: AccommodationReviewsHeaderProps) => (
  <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
    <AccommodationEditorRegion
      region="content"
      activeRegion={activeEditorRegion}
      className="-m-3 p-3"
    >
      <div>
        <p className="section-eyebrow text-primary/85">Avis voyageurs</p>

        <h2 className="mt-4 max-w-3xl font-heading text-4xl leading-[1.03] tracking-[-0.035em] md:text-5xl xl:text-[3.4rem]">
          {title}
        </h2>

        <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">
          {description}
        </p>
      </div>
    </AccommodationEditorRegion>

    {averageRating !== null ? (
      <div className="flex shrink-0 flex-col items-start gap-5 sm:flex-row sm:items-end">
        <div className="flex items-center gap-4 border-l border-primary/25 pl-5">
          <Star
            className="size-4 text-primary"
            fill="currentColor"
            strokeWidth={1.5}
          />

          <div>
            <p className="font-heading text-4xl leading-none tracking-tighter">
              {averageRating.toFixed(1).replace(".", ",")}
            </p>

            <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              {reviewCount} avis
            </p>
          </div>
        </div>

        {!editorPreview ? (
          <Button type="button" variant="link" onClick={onOpenReviews}>
            Voir les {reviewCount} avis
          </Button>
        ) : null}
      </div>
    ) : null}
  </div>
);
