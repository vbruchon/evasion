import { utapi } from "@/lib/admin/uploadthing/utapi";

export const deleteUploadThingFiles = async (
  fileKeys: string[],
  errorMessage: string,
) => {
  if (fileKeys.length === 0) {
    return;
  }

  try {
    await utapi.deleteFiles(fileKeys);
  } catch (error) {
    console.error(errorMessage, error);
  }
};
