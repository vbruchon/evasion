import { utapi } from "@/lib/admin/uploadthing/utapi";

export const deleteUploadThingFiles = async (fileKeys: string[]) => {
  if (fileKeys.length === 0) {
    return;
  }

  try {
    await utapi.deleteFiles(fileKeys);
  } catch {
    // Remote deletion must not block the main operation.
  }
};
