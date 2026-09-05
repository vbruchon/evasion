import { generateReactHelpers } from "@uploadthing/react";

import type { UploadRouter } from "@/lib/admin/uploadthing/router";

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<UploadRouter>();
