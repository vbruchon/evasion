export const ADMIN_IMAGE_MAX_FILE_SIZE_MB = 8;

const ADMIN_IMAGE_MAX_FILE_SIZE = ADMIN_IMAGE_MAX_FILE_SIZE_MB * 1024 * 1024;

export const ADMIN_IMAGE_UPLOAD_MAX_FILE_SIZE = "8MB" as const;

export const ADMIN_IMAGE_ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
] as const;

export const ADMIN_IMAGE_ACCEPT = "image/jpeg,image/png,image/webp,image/avif";

export const ADMIN_IMAGE_FORMAT_LABEL = "JPG, PNG, WEBP ou AVIF";

const isAdminImageFile = (file: File) =>
  ADMIN_IMAGE_ACCEPTED_TYPES.includes(
    file.type as (typeof ADMIN_IMAGE_ACCEPTED_TYPES)[number],
  );

const isAdminImageFileSizeValid = (file: File) =>
  file.size <= ADMIN_IMAGE_MAX_FILE_SIZE;

export const getAdminImageFileValidationError = (file: File) => {
  if (!isAdminImageFile(file)) {
    return `Utilisez une image ${ADMIN_IMAGE_FORMAT_LABEL}.`;
  }

  if (!isAdminImageFileSizeValid(file)) {
    return `L’image ne doit pas dépasser ${ADMIN_IMAGE_MAX_FILE_SIZE_MB} Mo.`;
  }

  return null;
};

export const isValidAdminImageFile = (file: File) =>
  getAdminImageFileValidationError(file) === null;
