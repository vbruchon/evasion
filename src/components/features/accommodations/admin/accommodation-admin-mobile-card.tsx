import type {
  Accommodation,
  AccommodationImage,
} from "@/generated/prisma/client";

import { AccommodationAdminActions } from "./accommodation-admin-actions";
import { AccommodationAdminIdentity } from "./accommodation-admin-identity";
import { AccommodationStatusBadge } from "./accommodation-status-badge";
import { formatDate, formatRelativeDate } from "@/lib/admin/format-date";

type AccommodationWithImages = Accommodation & {
  images: AccommodationImage[];
};

type AccommodationAdminMobileCardProps = {
  accommodation: AccommodationWithImages;
};

export const AccommodationAdminMobileCard = ({
  accommodation,
}: AccommodationAdminMobileCardProps) => {
  return (
    <div className="border border-border/60 bg-card">
      <div className="p-4">
        <AccommodationAdminIdentity accommodation={accommodation} />

        <div className="mt-5 flex items-center justify-between gap-4">
          <AccommodationStatusBadge status={accommodation.status} />

          <p className="text-sm text-muted-foreground">
            Position {accommodation.position}
          </p>
        </div>

        <div className="flex items-center justify-between mt-5 border-t border-border/60 pt-4">
          <p className="text-sm text-foreground">
            {formatDate(accommodation.updatedAt)}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            {formatRelativeDate(accommodation.updatedAt)}
          </p>
        </div>
      </div>

      <div className="border-t border-border/60 p-3">
        <AccommodationAdminActions
          name={accommodation.name}
          slug={accommodation.slug}
          status={accommodation.status}
          mobile
        />
      </div>
    </div>
  );
};
