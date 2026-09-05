"use client";

import type { AccommodationImageInput } from "~/app/admin/logements/schema";

import { uploadAccommodationImageFiles } from "@/lib/admin/uploadthing/upload-accommodation-image-files";

export const uploadAccommodationImages = async (
  files: File[],
  coverImageIndex: number,
): Promise<AccommodationImageInput[]> => {
  const uploadedFiles = await uploadAccommodationImageFiles(files);

  return uploadedFiles.map((file, index) => ({
    fileKey: file.fileKey,
    url: file.url,
    isCover: index === coverImageIndex,
  }));
};
