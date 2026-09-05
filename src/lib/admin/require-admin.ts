import { headers } from "next/headers";

import { isAdminEmail } from "@/lib/admin";
import { auth } from "@/lib/auth";

export const requireAdmin = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !isAdminEmail(session.user.email)) {
    throw new Error("Unauthorized");
  }

  return session;
};
