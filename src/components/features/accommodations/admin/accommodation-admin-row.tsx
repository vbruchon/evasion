import type {
  Accommodation,
  AccommodationImage,
} from "@/generated/prisma/client";

import { AccommodationAdminActions } from "./accommodation-admin-actions";
import { AccommodationAdminIdentity } from "./accommodation-admin-identity";
import { AccommodationStatusBadge } from "./accommodation-status-badge";

import { TableCell, TableRow } from "@/components/ui/table";
import { formatDate, formatRelativeDate } from "@/lib/admin/format-date";

type AccommodationWithImages = Accommodation & {
  images: AccommodationImage[];
};

type AccommodationAdminRowProps = {
  accommodation: AccommodationWithImages;
};

export const AccommodationAdminRow = ({
  accommodation,
}: AccommodationAdminRowProps) => {
  return (
    <TableRow className="h-24 border-border/60 hover:bg-muted/20">
      <TableCell className="py-3">
        <AccommodationAdminIdentity accommodation={accommodation} />
      </TableCell>

      <TableCell>
        <AccommodationStatusBadge
          id={accommodation.id}
          status={accommodation.status}
        />
      </TableCell>

      <TableCell className="text-center">
        <span className="text-sm text-muted-foreground">
          {accommodation.position}
        </span>
      </TableCell>

      <TableCell>
        <p className="text-sm text-foreground">
          {formatDate(accommodation.updatedAt)}
        </p>
        <p className="text-xs text-muted-foreground">
          {formatRelativeDate(accommodation.updatedAt)}
        </p>
      </TableCell>

      <TableCell>
        <AccommodationAdminActions
          name={accommodation.name}
          slug={accommodation.slug}
        />
      </TableCell>
    </TableRow>
  );
};
