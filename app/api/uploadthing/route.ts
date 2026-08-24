import { createRouteHandler } from "uploadthing/next";

import { uploadRouter } from "@/lib/admin/uploadthing/router";

export const { GET, POST } = createRouteHandler({
  router: uploadRouter,
});
