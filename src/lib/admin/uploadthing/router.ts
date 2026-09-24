import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

import { isAdminEmail } from "@/lib/admin/is-admin-email";
import { auth } from "@/lib/auth";
import { ADMIN_IMAGE_UPLOAD_MAX_FILE_SIZE } from "../images/image-upload";

const f = createUploadthing();

const createAdminImageUploader = (maxFileCount: number) =>
  f({
    image: {
      maxFileSize: ADMIN_IMAGE_UPLOAD_MAX_FILE_SIZE,
      maxFileCount,
    },
  })
    .middleware(async ({ req }) => {
      const session = await auth.api.getSession({
        headers: req.headers,
      });

      if (!session || !isAdminEmail(session.user.email)) {
        throw new UploadThingError("Unauthorized");
      }

      return {
        userId: session.user.id,
      };
    })
    .onUploadComplete(({ file }) => ({
      fileKey: file.key,
      url: file.ufsUrl,
    }));

export const uploadRouter = {
  accommodationImages: createAdminImageUploader(15),
  reviewsPageImages: createAdminImageUploader(2),
  aboutPageImages: createAdminImageUploader(2),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
