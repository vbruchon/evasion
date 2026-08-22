"use client";

import type { AccommodationStatus } from "@/generated/prisma/client";
import { Check, ChevronDown } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updateAccommodationStatus } from "../../../../../app/admin/logements/action";

type AccommodationStatusBadgeProps = {
  id: string;
  status: AccommodationStatus;
};

const statusConfig = {
  PUBLISHED: {
    label: "Publié",
    className:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  },
  DRAFT: {
    label: "Brouillon",
    className:
      "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  },
  ARCHIVED: {
    label: "Archivé",
    className: "border-border bg-muted text-muted-foreground",
  },
} satisfies Record<
  AccommodationStatus,
  {
    label: string;
    className: string;
  }
>;

export const AccommodationStatusBadge = ({
  id,
  status,
}: AccommodationStatusBadgeProps) => {
  const currentStatus = statusConfig[status];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            type="button"
            className="cursor-pointer"
            aria-label="Modifier le statut du logement"
          />
        }
      >
        <Badge
          variant="outline"
          className={`${currentStatus.className} pointer-events-none gap-1.5 py-1 px-2`}
        >
          {currentStatus.label}
          <ChevronDown className="size-3.5 opacity-70" />
        </Badge>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        {Object.entries(statusConfig).map(([value, config]) => {
          const accommodationStatus = value as AccommodationStatus;
          const active = accommodationStatus === status;

          return (
            <DropdownMenuItem
              key={value}
              onClick={() => updateAccommodationStatus(id, accommodationStatus)}
            >
              {config.label}

              {active ? <Check className="ml-auto" /> : null}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
