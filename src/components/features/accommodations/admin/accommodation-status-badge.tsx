"use client";

import type { AccommodationStatus } from "@/generated/prisma/client";

import { updateAccommodationStatus } from "~/app/admin/logements/action";

import { AccommodationStatusDropdown } from "./accommodation-status-dropdown";

type AccommodationStatusBadgeProps = {
  id: string;
  status: AccommodationStatus;
  disabled?: boolean;
};

export const AccommodationStatusBadge = ({
  id,
  status,
  disabled = false,
}: AccommodationStatusBadgeProps) => (
  <AccommodationStatusDropdown
    status={status}
    disabled={disabled}
    onStatusChange={(nextStatus) => updateAccommodationStatus(id, nextStatus)}
  />
);
