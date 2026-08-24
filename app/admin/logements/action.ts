"use server";

import type { AccommodationStatus } from "@/generated/prisma/client";

import { createAccommodationAdmin } from "@/lib/admin/accommodation/create-accommodation.action";
import { deleteAccommodationAdmin } from "@/lib/admin/accommodation/delete-accommodation.action";
import {
  reorderAccommodationsAdmin,
  type AccommodationPosition,
} from "@/lib/admin/accommodation/reorder-accommodations.action";
import type {
  AccommodationFormValues,
  AccommodationImageInput,
  AccommodationUpdateImageInput,
} from "./schema";
import { updateAccommodationAdmin } from "@/lib/admin/accommodation/update-accommodation.action";
import { updateAccommodationStatusAdmin } from "@/lib/admin/accommodation/update-accommodation-status.action";
import { requireAdmin } from "@/lib/admin/require-admin";

export const createAccommodation = async (
  values: AccommodationFormValues,
  images: AccommodationImageInput[] = [],
) => {
  await requireAdmin();

  return createAccommodationAdmin(values, images);
};

export const updateAccommodation = async (
  id: string,
  values: AccommodationFormValues,
  images: AccommodationUpdateImageInput[],
) => {
  await requireAdmin();

  return updateAccommodationAdmin(id, values, images);
};

export const deleteAccommodation = async (id: string) => {
  await requireAdmin();

  return deleteAccommodationAdmin(id);
};

export const reorderAccommodations = async (
  accommodations: AccommodationPosition[],
) => {
  await requireAdmin();

  return reorderAccommodationsAdmin(accommodations);
};

export const updateAccommodationStatus = async (
  id: string,
  status: AccommodationStatus,
) => {
  await requireAdmin();

  return updateAccommodationStatusAdmin(id, status);
};
