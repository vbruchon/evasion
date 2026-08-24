"use client";

import { uploadFiles } from "@/lib/admin/uploadthing/client";

export type UploadedAccommodationImage = {
  url: string;
  fileKey: string;
};

export const uploadAccommodationImageFiles = async (
  files: File[],
): Promise<UploadedAccommodationImage[]> => {
  if (files.length === 0) {
    return [];
  }

  const uploadedFiles = await uploadFiles("accommodationImages", {
    files,
  });

  const invalidUpload = uploadedFiles.some((file) => !file.key || !file.ufsUrl);

  if (invalidUpload) {
    throw new Error("Une erreur est survenue pendant l’envoi des images.");
  }

  return uploadedFiles.map((file) => ({
    fileKey: file.key,
    url: file.ufsUrl,
  }));
};
