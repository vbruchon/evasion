"use client";

import { GripVertical } from "lucide-react";

import { AccommodationAdminActions } from "./accommodation-admin-actions";
import { AccommodationAdminIdentity } from "./accommodation-admin-identity";
import { AccommodationStatusBadge } from "./accommodation-status-badge";

import { Button } from "@/components/ui/button";
import { formatDate, formatRelativeDate } from "@/lib/admin/format-date";
import { AccommodationWithImages } from "@/lib/accommodations/accommodation-types";
import { useAccommodationSortable } from "@/hooks/use-accommodation-sortable";

type AccommodationAdminMobileCardProps = {
  accommodation: AccommodationWithImages;
  isReordering: boolean;
};

export const AccommodationAdminMobileCard = ({
  accommodation,
  isReordering,
}: AccommodationAdminMobileCardProps) => {
  const { attributes, listeners, setNodeRef, style, isDragging } =
    useAccommodationSortable(accommodation.id, isReordering);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`border border-border/60 bg-card ${
        isReordering ? "cursor-grab touch-none active:cursor-grabbing" : ""
      } ${isDragging ? "relative z-10 shadow-md" : ""}`}
      {...(isReordering ? attributes : {})}
      {...(isReordering ? listeners : {})}
    >
      <div className="p-4">
        <AccommodationAdminIdentity accommodation={accommodation} />

        <div className="mt-5 flex items-center justify-between gap-4">
          <AccommodationStatusBadge
            id={accommodation.id}
            status={accommodation.status}
            disabled={isReordering}
          />

          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">
              Position {accommodation.position}
            </p>

            {isReordering ? (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                tabIndex={-1}
                aria-hidden="true"
                className="pointer-events-none"
              >
                <GripVertical />
              </Button>
            ) : null}
          </div>
        </div>

        <div className="mt-5 border-t border-border/60 pt-4 flex justify-between">
          <p className="text-sm text-foreground">
            {formatDate(accommodation.updatedAt)}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            {formatRelativeDate(accommodation.updatedAt)}
          </p>
        </div>
      </div>

      {!isReordering ? (
        <div className="border-t border-border/60 p-3">
          <AccommodationAdminActions
            id={accommodation.id}
            name={accommodation.name}
            slug={accommodation.slug}
            mobile
          />
        </div>
      ) : null}
    </div>
  );
};
