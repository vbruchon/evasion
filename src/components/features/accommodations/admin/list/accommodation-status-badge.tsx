"use client";

import { useTransition } from "react";

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
}: AccommodationStatusBadgeProps) => {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (nextStatus: AccommodationStatus) => {
    if (nextStatus === status || isPending) {
      return;
    }

    startTransition(async () => {
      await updateAccommodationStatus(id, nextStatus);
    });
  };

  return (
    <AccommodationStatusDropdown
      status={status}
      disabled={disabled || isPending}
      pending={isPending}
      onStatusChange={handleStatusChange}
    />
  );
};
