"use client";

import { Check, ChevronDown } from "lucide-react";

import { updateAccommodationStatus } from "~/app/admin/logements/action";

import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { AccommodationStatus } from "@/generated/prisma/client";
import {
  accommodationStatuses,
  getAccommodationStatus,
} from "@/lib/admin/accommodation/accommodation-statuses";

type AccommodationStatusBadgeProps = {
  id: string;
  status: AccommodationStatus;
  disabled?: boolean;
};

const statusClassNames: Record<AccommodationStatus, string> = {
  PUBLISHED:
    "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  DRAFT:
    "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  ARCHIVED: "border-border bg-muted text-muted-foreground",
};

export const AccommodationStatusBadge = ({
  id,
  status,
  disabled = false,
}: AccommodationStatusBadgeProps) => {
  const currentStatus = getAccommodationStatus(status);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        disabled={disabled}
        render={
          <button
            type="button"
            className={disabled ? "cursor-default" : "cursor-pointer"}
            aria-label="Modifier le statut du logement"
          />
        }
      >
        <Badge
          variant="outline"
          className={`${statusClassNames[status]} pointer-events-none gap-1.5 px-2 py-1`}
        >
          {currentStatus?.label}

          <ChevronDown className="size-3.5 opacity-70" />
        </Badge>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start">
        {accommodationStatuses.map((option) => {
          const active = option.value === status;

          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => updateAccommodationStatus(id, option.value)}
            >
              {option.label}

              {active ? <Check className="ml-auto" /> : null}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
