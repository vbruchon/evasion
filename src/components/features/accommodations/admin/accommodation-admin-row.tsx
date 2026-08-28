"use client";

import { GripVertical } from "lucide-react";

import { AccommodationAdminActions } from "./accommodation-admin-actions";
import { AccommodationAdminIdentity } from "./accommodation-admin-identity";
import { AccommodationDraftBadge } from "./accommodation-draft-badge";
import { AccommodationStatusBadge } from "./accommodation-status-badge";

import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { useAccommodationSortable } from "@/hooks/use-accommodation-sortable";
import { formatDate, formatRelativeDate } from "@/lib/admin/format-date";
import type { AccommodationWithImages } from "@/lib/accommodations/accommodation-types";

type AccommodationAdminRowProps = {
  accommodation: AccommodationWithImages;
  isReordering: boolean;
};

export const AccommodationAdminRow = ({
  accommodation,
  isReordering,
}: AccommodationAdminRowProps) => {
  const { attributes, listeners, setNodeRef, style, isDragging } =
    useAccommodationSortable(accommodation.id, isReordering);

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      className={`h-24 border-border/60 ${
        isReordering ? "cursor-grab touch-none active:cursor-grabbing" : ""
      } ${isDragging ? "relative z-10 bg-background shadow-md" : ""}`}
      {...(isReordering ? attributes : {})}
      {...(isReordering ? listeners : {})}
    >
      <TableCell className="flex items-center gap-4 pl-6">
        {isReordering ? (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            tabIndex={-1}
            className="pointer-events-none"
            aria-hidden="true"
          >
            <GripVertical />
          </Button>
        ) : null}

        <AccommodationAdminIdentity accommodation={accommodation} />
      </TableCell>

      <TableCell>
        <div className="flex flex-wrap items-center gap-2">
          <AccommodationStatusBadge
            id={accommodation.id}
            status={accommodation.status}
            disabled={isReordering}
          />

          {accommodation.draft ? <AccommodationDraftBadge /> : null}
        </div>
      </TableCell>

      <TableCell className="text-center">
        <span className="text-sm">{accommodation.position}</span>
      </TableCell>

      <TableCell>
        <p className="text-sm">{formatDate(accommodation.updatedAt)}</p>

        <p className="mt-1 text-xs text-muted-foreground">
          {formatRelativeDate(accommodation.updatedAt)}
        </p>
      </TableCell>

      <TableCell className="pr-6">
        {!isReordering ? (
          <AccommodationAdminActions
            id={accommodation.id}
            name={accommodation.name}
            slug={accommodation.slug}
            mobile
          />
        ) : null}
      </TableCell>
    </TableRow>
  );
};
