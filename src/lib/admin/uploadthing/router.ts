import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

import { isAdminEmail } from "@/lib/admin";
import { auth } from "@/lib/auth";

const f = createUploadthing();

export const uploadRouter = {
  accommodationImages: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 15,
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
    .onUploadComplete(async ({ file }) => {
      return {
        fileKey: file.key,
        url: file.ufsUrl,
      };
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
