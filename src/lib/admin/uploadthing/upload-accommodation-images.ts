import type { CreateAccommodationImageInput } from "~/app/admin/logements/nouveau/schema";

import { uploadFiles } from "@/lib/admin/uploadthing/client";

export const uploadAccommodationImages = async (
  files: File[],
  coverImageIndex: number,
): Promise<CreateAccommodationImageInput[]> => {
  if (files.length === 0) {
    return [];
  }

  const uploadedFiles = await uploadFiles("accommodationImages", {
    files,
  });

  const invalidUpload = uploadedFiles.some((file) => !file.key || !file.url);

  if (invalidUpload) {
    throw new Error("Une erreur est survenue pendant l’envoi des images.");
  }

  return uploadedFiles.map((file, index) => ({
    fileKey: file.key,
    url: file.url,
    isCover: index === coverImageIndex,
  }));
};
