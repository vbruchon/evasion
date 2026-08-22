import type { AccommodationStatus } from "@/generated/prisma/client";

import { Badge } from "@/components/ui/badge";

type AccommodationStatusBadgeProps = {
  status: AccommodationStatus;
};

const statusConfig: Record<
  AccommodationStatus,
  {
    label: string;
    className: string;
  }
> = {
  PUBLISHED: {
    label: "Publié",
    className: "border-emerald-500/15 bg-emerald-500/8 text-emerald-400",
  },
  DRAFT: {
    label: "Brouillon",
    className: "border-amber-500/20 bg-amber-500/10 text-amber-400",
  },
  ARCHIVED: {
    label: "Archivé",
    className: "border-border bg-muted text-muted-foreground",
  },
};

export const AccommodationStatusBadge = ({
  status,
}: AccommodationStatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <Badge variant="outline" className={config.className}>
      <span className="mr-1.5 size-1.5 rounded-full bg-current" />
      {config.label}
    </Badge>
  );
};
