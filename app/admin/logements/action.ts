"use server";

import type { AccommodationStatus } from "@/generated/prisma/client";

import { createAccommodationAdmin } from "@/lib/admin/accommodation/create-accommodation.action";
import { deleteAccommodationAdmin } from "@/lib/admin/accommodation/delete-accommodation.action";
import { publishAccommodationDraftAdmin } from "@/lib/admin/accommodation/publish-accommodation-draft.action";
import { reorderAccommodationsAdmin } from "@/lib/admin/accommodation/reorder-accommodations.action";
import { saveAccommodationDraftAdmin } from "@/lib/admin/accommodation/save-accommodation-draft.action";
import { updateAccommodationAdmin } from "@/lib/admin/accommodation/update-accommodation.action";
import { updateAccommodationStatusAdmin } from "@/lib/admin/accommodation/update-accommodation-status.action";
import { requireAdmin } from "@/lib/admin/require-admin";

import type {
  AccommodationCreateFormValues,
  AccommodationDraftContent,
  AccommodationImageInput,
  AccommodationUpdateFormValues,
  AccommodationUpdateImageInput,
} from "./schema";

export const createAccommodation = async (
  values: AccommodationCreateFormValues,
  images: AccommodationImageInput[],
) => {
  await requireAdmin();

  return createAccommodationAdmin(values, images);
};

export const updateAccommodation = async (
  accommodationId: string,
  values: AccommodationUpdateFormValues,
  images: AccommodationUpdateImageInput[],
) => {
  await requireAdmin();

  return updateAccommodationAdmin(accommodationId, values, images);
};

export const deleteAccommodation = async (accommodationId: string) => {
  await requireAdmin();

  return deleteAccommodationAdmin(accommodationId);
};

export const reorderAccommodations = async (
  accommodations: {
    id: string;
    position: number;
  }[],
) => {
  await requireAdmin();

  return reorderAccommodationsAdmin(accommodations);
};

export const updateAccommodationStatus = async (
  accommodationId: string,
  status: AccommodationStatus,
) => {
  await requireAdmin();

  return updateAccommodationStatusAdmin(accommodationId, status);
};

export const saveAccommodationDraft = async (
  accommodationId: string,
  values: AccommodationDraftContent["values"],
  images: AccommodationUpdateImageInput[],
) => {
  await requireAdmin();

  return saveAccommodationDraftAdmin(accommodationId, values, images);
};

export const publishAccommodationDraft = async (accommodationId: string) => {
  await requireAdmin();

  return publishAccommodationDraftAdmin(accommodationId);
};
